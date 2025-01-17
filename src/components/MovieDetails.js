import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams();
  return (
    <div>
      <h1>Movie {id}</h1>
      <p>Details coming soon...</p>
    </div>
  );
}

export default MovieDetails;
