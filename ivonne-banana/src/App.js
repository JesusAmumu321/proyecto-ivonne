import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div 
              className="min-h-screen flex flex-col items-center justify-center p-8"
              style={{backgroundColor: '#98BE91'}}
            >
              <h1 
                className="text-4xl font-bold font-poppins mb-8"
                style={{color: '#5B7257'}}
              >
                Ivonne Banana
              </h1>
              <nav className="space-y-4">
                <Link 
                  to="/profile" 
                  className="block text-white px-8 py-4 rounded-lg font-montserrat text-xl hover:opacity-80 transition-opacity"
                  style={{backgroundColor: '#5B7257'}}
                >
                  Ver Perfil
                </Link>
              </nav>
            </div>
          } />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
