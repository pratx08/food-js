import { useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

function StudentDashboard() {
  const [studentId, setStudentId] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  const fetchRecommendation = () => {
    axios.get(`http://127.0.0.1:8000/student_recommendation?student_id=${studentId}`)
      .then(res => setRecommendation(res.data))
      .catch(() => alert('Error fetching recommendation!'));
  };

  return (
    <div className="dashboard-container">
      <h1>Smartbite Student Dashboard 🎓</h1>

      <div className="card-section">
        <h2>Get Today's Food Suggestion</h2>
        <input 
          type="number" 
          placeholder="Enter your Student ID" 
          value={studentId} 
          onChange={(e) => setStudentId(e.target.value)} 
        />
        <button onClick={fetchRecommendation}>Get Suggestion</button>
      </div>

      {recommendation && (
        <>
          <section className="card-section">
            <h2>Recommended Dishes 🍽️</h2>
            <div className="grid-3">
              {recommendation.recommended_dishes.map((dish, i) => (
                <div className="card" key={i}>
                  <strong>{dish.Food_Item}</strong>
                  <p>Calories: {dish.Calories}</p>
                  <p>Protein: {dish.Protein}g | Carbs: {dish.Carbs}g | Fats: {dish.Fats}g</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card-section">
            <h2>Total Nutrition After Meal 🥗</h2>
            <p>Calories: {recommendation.nutrition_after_meal.Calories}</p>
            <p>Protein: {recommendation.nutrition_after_meal.Protein}g</p>
            <p>Carbs: {recommendation.nutrition_after_meal.Carbs}g</p>
            <p>Fats: {recommendation.nutrition_after_meal.Fats}g</p>
          </section>
        </>
      )}
    </div>
  );
}

export default StudentDashboard;
