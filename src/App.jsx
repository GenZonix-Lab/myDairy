import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dairy from './Dairy';
import Login from './Login';
import Profile from './Profile';

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        {/* Future routes can be added here */}
        <Route path="/dairy" element={<Dairy/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
