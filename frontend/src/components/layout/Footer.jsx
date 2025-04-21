import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p>&copy; {year} TaskMaster App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;