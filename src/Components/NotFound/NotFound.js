import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

/**
 * NotFound component displays a 404 error page when a resource is not found
 * @returns {JSX.Element} The rendered NotFound component
 */
export const NotFound = () => {
    // Return the JSX for the 404 error page with a container, error code, message, description, and a link to return to the home page
    return (
        <div className="not-found-container">
            {/* Error code displayed prominently */}
            <h1 className="error-code">404</h1>
            
            {/* Error message explaining what happened */}
            <h2 className="error-message">Page Not Found</h2>
            
            {/* Detailed explanation of the error */}
            <p className="error-description">
                The page you are looking for doesn't exist or has been moved.
            </p>
            
            {/* Link to return to the home page */}
            <Link to="/" className="home-link">
                Return to Home
            </Link>
        </div>
    );
};
