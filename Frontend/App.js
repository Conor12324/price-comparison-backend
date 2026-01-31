import React from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PriceComparison from './pages/PriceComparison';
import Home from './pages/Home';
import AdSpaces from './pages/AdSpaces';

function App() {
  const [currentPage, setCurrentPage] = React.useState('home');

  return (
    <div className="App">
      <Header />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'compare' && <PriceComparison />}
        {currentPage === 'ads' && <AdSpaces />}
      </main>
      <footer className="footer">
        <p>&copy; 2026 Price Comparison Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
