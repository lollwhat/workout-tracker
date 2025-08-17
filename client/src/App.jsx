import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateWorkout from './pages/CreateWorkout';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
        <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
        <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
        <Link to="/create-workout">Create Workout</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-workout" element={<CreateWorkout />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App
