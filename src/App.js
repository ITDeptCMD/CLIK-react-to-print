import './index.css';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Monitoring from './pages/Monitoring.js';
import NewEnquiry from './pages/NewEnquiry';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monitoring-enquiry" element={<Monitoring />} />
        <Route path="/new-enquiry" element={<NewEnquiry />} />
      </Routes>
    </Router>
  )
}

export default App
