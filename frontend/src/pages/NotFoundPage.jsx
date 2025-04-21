import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

const NotFoundPage = () => {
  return (
    <div className="page-container">
      <Card className="not-found-card">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="not-found-link">
          Go to Home
        </Link>
      </Card>
    </div>
  );
};

export default NotFoundPage;