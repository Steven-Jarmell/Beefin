import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Landing from './LandingPage';
import Login from './LoginPage';
import Register from './RegisterPage';

function App() {

  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
      </Router>
    </div>
  )
}

export default App
