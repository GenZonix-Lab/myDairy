import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Dairy from './Dairy';
import Login from './Login';
import Profile from './Profile';

function App() {
  return (
    <Authenticator.Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/dairy" element={<Dairy/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Router>
    </Authenticator.Provider>
  )
}

export default App
