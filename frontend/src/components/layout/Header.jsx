import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // from context
    setTimeout(() => {
      navigate('/user/login');
    }, 0); 
  };
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="app-logo">
          TaskMaster
        </Link>
        
        {isAuthenticated ? (
          <div className="user-menu">
            <span className="username">Hi, {currentUser?.username}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/user/login" className="auth-link">Login</Link>
            <Link to="/user" className="auth-link">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;