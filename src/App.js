// App.js
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MovieGrid from './components/MovieGrid';
import About from './components/About';
import Cart from './components/Cart';
import MovieDetails from './components/MovieDetails';
import Search from './components/Search';

function App() {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ffce749b6ded9d27d4bbcaf46a09422e&query=${query}`
    );
    const data = await response.json();
    setMovies(data.results);
  };

  return (
    <Router>
      <Header />
      <Search onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<MovieGrid movies={movies} />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
