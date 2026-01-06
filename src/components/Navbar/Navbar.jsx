import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiBell, FiSearch, FiMenu, FiX } from "react-icons/fi";
import "./Navbar.scss";

const navLinks = [
  { path: "/home", label: "Home" },
  { path: "/browse", label: "Browse" },
  { path: "/tv-shows", label: "TV Shows" },
  { path: "/movies", label: "Movies" },
  { path: "/my-list", label: "My List" },
];

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    if (authUser?.avatar?.url) {
      setUserAvatar(authUser.avatar.url);
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="navbar">
        <div className="navbar__left">
          <button className="navbar__mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <Link to="/home" className="navbar__logo">
            <svg className="navbar__logo-icon" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd" />
            </svg>
            <span className="navbar__logo-text">Cineverse</span>
          </Link>
          <nav className="navbar__nav">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`navbar__nav-link ${location.pathname === link.path ? "navbar__nav-link--active" : ""}`}>{link.label}</Link>
            ))}
          </nav>
        </div>

        <div className="navbar__right">
          <div className="navbar__search">
            <FiSearch className="navbar__search-icon" />
            <input type="text" className="navbar__search-input" placeholder="Search" />
          </div>
          <button className="navbar__icon-btn"><FiBell /></button>
          <Link to="/profile" className="navbar__avatar">
            <div className="navbar__avatar-img" style={{ backgroundImage: `url(${userAvatar})` }}></div>
          </Link>
        </div>
      </header>

      <div className={`navbar__mobile-menu ${isMobileMenuOpen ? "navbar__mobile-menu--open" : ""}`}>
        <div className="navbar__mobile-nav">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={`navbar__mobile-link ${location.pathname === link.path ? "navbar__mobile-link--active" : ""}`}>{link.label}</Link>
          ))}
        </div>
      </div>

      {isMobileMenuOpen && <div className="navbar__overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
    </>
  );
};

export default Navbar;












