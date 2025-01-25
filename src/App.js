import React from 'react'; // Add React import here
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MovieGrid from './components/MovieGrid';
import About from './components/About';
import Cart from './components/Cart';
import MovieDetails from './components/MovieDetails';
import Search from './components/Search';

const GOOGLE_CLIENT_ID = "125451938520-h9db511gflinvr64f2fnha39jei9aviq.apps.googleusercontent.com";

function App() {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    setUser(credentialResponse);
  };

  const handleSearch = async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ffce749b6ded9d27d4bbcaf46a09422e&query=${query}`
    );
    const data = await response.json();
    setMovies(data.results);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Header />
        {!user ? (
          <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')} />
        ) : (
          <div>
            <p>Welcome, User!</p>
            <button onClick={() => setUser(null)}>Logout</button>
          </div>
        )}
        <Search onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<MovieGrid movies={movies} />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
