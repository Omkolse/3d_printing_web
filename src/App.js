import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import { isAdmin, isCustomer } from './utils/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Auto-redirect to appropriate dashboard
      if (isAdmin()) setCurrentView('admin');
      else if (isCustomer()) setCurrentView('customer');
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    
    // Redirect based on role
    if (isAdmin()) {
      setCurrentView('admin');
    } else {
      setCurrentView('customer');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        {currentView === 'login' ? (
          <Login 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setCurrentView('register')}
          />
        ) : (
          <Register 
            onRegister={handleLogin}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>3D Printing Service</h1>
        <div className="user-info">
          <span>Welcome, {isAdmin() ? 'Admin' : 'Customer'}</span>
          <button onClick={handleLogout} className="btn btn-outline">Logout</button>
        </div>
      </header>

      <main>
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'customer' && <CustomerDashboard />}
      </main>
    </div>
  );
}

export default App;