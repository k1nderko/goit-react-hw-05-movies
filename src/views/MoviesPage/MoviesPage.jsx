import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import MoviePageForm from '../../components/MoviePageForm';
import moviesAPI from '../../API/movie-api';
import MoviesList from '../../components/MoviesList';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const query = searchQuery.get('query');

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchMovies = async () => {
      try {
        const movies = await moviesAPI.fetchFilmsByQuery(query);
        setMovies(movies.results);
      } catch (error) {
        setError('Something went wrong. Please try again later.');
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div>
      <MoviePageForm onSubmit={setSearchQuery} />

      {movies.length > 0 && <MoviesList films={movies} />}

      {movies.length === 0 && query && (
        <p>We don't have any movies for this query.</p>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default MoviesPage;
