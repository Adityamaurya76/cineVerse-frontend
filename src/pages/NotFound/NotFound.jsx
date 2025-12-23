import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      {/* Background */}
      <div className="not-found__bg">
        <div className="not-found__bg-pattern"></div>
        <div className="not-found__bg-gradient"></div>
      </div>

      <div className="not-found__container">
        {/* Header */}
        <header className="not-found__header">
          <Link to="/" className="not-found__logo">
            <svg
              className="not-found__logo-icon"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
            <span className="not-found__logo-text">Cineverse</span>
          </Link>
        </header>

        {/* Main Content */}
        <main className="not-found__main">
          <div className="not-found__content">
            <h1 className="not-found__title">Page Not Found</h1>
            <p className="not-found__description">
              Oops! It seems the page you're looking for has taken an unexpected
              turn. Let's find your way back to the action.
            </p>
            <div className="not-found__actions">
              <Link to="/home" className="btn btn--lg btn--primary">
                Return Home
              </Link>
              <Link to="/browse" className="btn btn--lg btn--secondary">
                Browse Content
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="not-found__footer">
          <p className="not-found__copyright">
            © {new Date().getFullYear()} Cineverse. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default NotFound;











