import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

function AdminDashboard() {
  const [wasteType, setWasteType] = useState("food");
  const [wasteData, setWasteData] = useState([]);
  const [forecast, setForecast] = useState(null);
  const [menuGrid, setMenuGrid] = useState([]);
  const [openRows, setOpenRows] = useState({});

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/waste_summary?waste_type=${wasteType}`).then(res => setWasteData(res.data));
    axios.get(`http://127.0.0.1:8000/weekly_forecast`).then(res => setForecast(res.data));
    axios.get(`http://127.0.0.1:8000/weekly_menu_grid`).then(res => setMenuGrid(res.data));
  }, [wasteType]);

  const groupDishes = (dishes) => {
    const grouped = {};
    dishes.forEach(dish => {
      if (!grouped[dish.Food_Item]) {
        grouped[dish.Food_Item] = 0;
      }
      grouped[dish.Food_Item] += dish.Recommended_Quantity;
    });
    return grouped;
  };

  return (
    <div className="dashboard-container">
      <h1>Smartbite Admin Dashboard 🍽️</h1>

      {/* Waste Summary */}
      <section className="card-section">
        <h2>Waste Summary</h2>
        <select value={wasteType} onChange={(e) => setWasteType(e.target.value)}>
          <option value="food">Food Waste</option>
          <option value="raw">Raw Materials Waste</option>
        </select>
        <div className="grid-3">
          {wasteData.map((item, idx) => (
            <div className="card" key={idx}>
              <strong>{item.Food_Item || item.Raw_Material}</strong>
              <p>Waste: {item.Waste_Percentage}%</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Recommendations Split */}
      {forecast && (
        <section className="grid-2 ai-section">
          <div className="card">
            <h2>Top 3 Nationalities</h2>
            {forecast.top_nationalities.map((nat, i) => (
              <p key={i}>{nat.Nationality} - {nat.Count}</p>
            ))}
          </div>
          <div className="card">
            <h2>Raw Materials Needed</h2>
            <div className="raw-materials-list">
              {forecast.raw_materials_required.map((mat, i) => (
                <p key={i}>{mat.Raw_Material}: {mat.Required_kg} kg</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modern Weekly Menu */}
      <section className="weekly-menu-section">
        <h2>📅 Recommended Menu (Next Week)</h2>
        <div className="weekly-grid">
          {menuGrid.map((day, idx) => (
            <div className="day-card" key={idx}>
              <div className="day-header" onClick={() => setOpenRows(prev => ({ ...prev, [day.Day]: !prev[day.Day] }))}>
                <h4>{day.Day}</h4>
                <span className={`arrow ${openRows[day.Day] ? "rotate" : ""}`}>▶</span>
              </div>

              {openRows[day.Day] && (
                <div className="meal-columns">
                  {day.Meals.map((meal, i) => {
                    const grouped = groupDishes(meal.Dishes);
                    return (
                      <div className="meal-block" key={i}>
                        <h5>{meal.Meal_Time}</h5>
                        {Object.keys(grouped).map((item, j) => (
                          <div className="meal-item" key={j}>
                            <span>{item}</span>
                            <span className="pill">{grouped[item]}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
