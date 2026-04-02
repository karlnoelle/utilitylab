import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <p>Page Not Found</p>
        <p className="description">Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/" className="home-link">
          Return to Home
        </Link>
      </div>
    </div>
  );
};
