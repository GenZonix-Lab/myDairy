import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Dairy from './Dairy';
import Login from './Login';

function App() {
  return (
    <Authenticator.Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Dairy/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </Authenticator.Provider>
  )
}

export default App
