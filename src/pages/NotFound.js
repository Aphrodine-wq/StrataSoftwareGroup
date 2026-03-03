import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <span className="not-found-code" aria-hidden="true">
          404
        </span>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary not-found-link">
          Back to Home
          <span className="btn-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
