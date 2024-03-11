import { useState, useEffect } from 'react';

import moviesAPI from '../../API/movie-api';
import MoviesList from '../../components/MoviesList';

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        const films = await moviesAPI.fetchFilmsTrending();
        setFilms(films.results);
      } catch (error) {
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>

      {loading && <p>Loading...</p>}

      {!!films.length && <MoviesList films={films} />}

      {error && <p>{error}</p>}
    </div>
  );
};

export default HomePage;
