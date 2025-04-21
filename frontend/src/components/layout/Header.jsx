import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Header.css';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="app-logo">
          TaskMaster
        </Link>
        
        {isAuthenticated ? (
          <div className="user-menu">
            <span className="username">Hi, {currentUser?.username}</span>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/register" className="auth-link">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;