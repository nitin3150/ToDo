import React from 'react';
import './Card.css';

const Card = ({ children, className = '', ...props }) => {
  const cardClass = `card ${className}`.trim();

  return (
    <div className={cardClass} {...props}>
      {children}
    </div>
  );
};

export default Card;