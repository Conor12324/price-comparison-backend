import React from 'react';

function Navigation({ currentPage, setCurrentPage }) {
  return (
    <nav className="navigation">
      <button 
        className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
        onClick={() => setCurrentPage('home')}
      >
        🏠 Home
      </button>
      <button 
        className={`nav-button ${currentPage === 'compare' ? 'active' : ''}`}
        onClick={() => setCurrentPage('compare')}
      >
        📊 Compare Prices
      </button>
      <button 
        className={`nav-button ${currentPage === 'ads' ? 'active' : ''}`}
        onClick={() => setCurrentPage('ads')}
      >
        📢 Advertise with Us
      </button>
    </nav>
  );
}

export default Navigation;
