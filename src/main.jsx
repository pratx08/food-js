import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminDashboard from './components/AdminDashboard'
import StudentDashboard from './components/StudentDashboard'

// Change this flag to switch between admin/student
const isAdmin = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {isAdmin ? <AdminDashboard /> : <StudentDashboard />}
  </>
)
