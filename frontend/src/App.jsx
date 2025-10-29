import React, { useState, useEffect } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';

const API_BASE = 'https://proj-5lax.onrender.com/api';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_BASE}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
      } else {
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };

  if (user) {
    return <Profile user={user} token={token} onLogout={() => {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }} onUpdate={fetchProfile} />;
  }

  if (currentView === 'login') {
    return <Login onSwitch={() => setCurrentView('register')} onLogin={(userData, authToken) => {
      localStorage.setItem('token', authToken);
      setToken(authToken);
      setUser(userData);
    }} />;
  }

  return <Register onSwitch={() => setCurrentView('login')} onRegister={(userData, authToken) => {
    localStorage.setItem('token', authToken);
    setToken(authToken);
    setUser(userData);
  }} />;
}

export default App;