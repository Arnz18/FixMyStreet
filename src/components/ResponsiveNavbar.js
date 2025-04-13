import React, { useState, useContext } from 'react';
import { ThemeContext } from './themecontext';
import LoginModal from './LoginModal';
import { useAuth } from './authcontext';

const ResponsiveNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentUser, logout } = useAuth() || {};
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    setIsMenuOpen(false); // Close the mobile menu if open
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false); // Close the mobile menu if open
  };

  return (
    <>
      <nav className="navbar responsive-navbar">
        <div className="logo">
          <img src="/api/placeholder/50/50" alt="FixMyStreet Logo" />
          <h1>FixMyStreet</h1>
        </div>
        
        <button 
          className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu} 
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
          <a href="#how-it-works" onClick={() => setIsMenuOpen(false)}>How It Works</a>
          <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Impact</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          <button 
            className="theme-toggle-inline" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {currentUser ? (
            <div className="user-menu">
              <span className="user-greeting">Hello, {currentUser.name}</span>
              <button className="btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className="btn-login" onClick={handleLoginClick}>Login</button>
          )}
          
          <button className="btn-primary">Report Issue</button>
        </div>
      </nav>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default ResponsiveNavbar;