import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Home';
import MovieDetailsPage from './pages/MovieDetails';
import FavoritesPage from './pages/Favorites';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navContainer">
            <div className="logo">
              <Link to="/">Movie Browser</Link>
            </div>
            <div className="navLinks">
              <Link to="/" className="navLink">Home</Link>
              <Link to="/favorites" className="navLink">Favorites</Link>
            </div>
          </div>
        </nav>

        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footerContainer">
            <p>© 2025 Movie Browser App</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
