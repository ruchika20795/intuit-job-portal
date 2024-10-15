import React, { useContext, useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../context/ThemeContext";

function Header({ user, onLogout }) {
const { theme, toggleTheme } = useContext(ThemeContext);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleLogout = () => {
    onLogout();
    setShowLogoutConfirm(false);
  };

  return (
    <header className={`header ${theme}`} role='banner'>
      <h1 className='header-title'>Job Portal</h1>

      <div
        className='header-actions'
        role='navigation'
        aria-label='Header actions'
      >
        {/* Theme Toggle Icon Button */}
        <button
          onClick={toggleTheme}
          className='icon-button theme-toggle'
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
        </button>

        {/* Logout Icon Button */}
        {user && (
          <button
            onClick={confirmLogout}
            className='icon-button logout-button'
            aria-label='Logout'
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className='logout-modal' role='dialog' aria-modal='true'>
          <p>Are you sure you want to logout?</p>
          <div className='action-container'>
            <button onClick={handleLogout}>Yes</button>
            <button onClick={cancelLogout}>Cancel</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
