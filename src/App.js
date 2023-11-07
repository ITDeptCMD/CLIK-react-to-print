import './index.css';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Monitoring from './pages/Monitoring.js';
import Pelunasan from './pages/Pelunasan.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monitoring-enquiry" element={<Monitoring />} />
        <Route path="/pelunasan" element={<Pelunasan />} />
      </Routes>
    </Router>
  )
}

export default App
