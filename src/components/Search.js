import React, { useState, useEffect } from 'react';  // Add React import here

function Search({ onSearch }) {
  const [query, setQuery] = useState(() => {
    return localStorage.getItem('searchQuery') || '';
  });

  useEffect(() => {
    localStorage.setItem('searchQuery', query);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
