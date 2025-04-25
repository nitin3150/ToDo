import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  console.log(currentUser)

  const handleLogout = () => {
    logout(); // from context
    navigate('/user/login'); // redirect handled here
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
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/register" className="auth-link">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;