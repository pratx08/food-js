# SmartBite Project - Backend & Frontend Setup

## 📦 Backend (FastAPI)

```bash
cd food-backend-main
pip install uvicorn
python -m venv venv
source venv/Scripts/activate
pip install "fastapi[all]"
pip install pandas
pip install sklearn
uvicorn main:app --reload

Note: Run the backend project before running the js project,
