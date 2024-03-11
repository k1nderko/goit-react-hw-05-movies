import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moviesAPI from '../../API/movie-api';
import { defaultImg } from '../../constants/common';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const { cast } = await moviesAPI.fetchFilmCast(movieId);
        setCast(cast);
      } catch (error) {
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h1>Cast</h1>

      {loading && <p>Loading...</p>}

      {cast?.length > 0 && (
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : defaultImg
                }
                alt={actor.name}
                width="100"
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}

      {cast?.length === 0 && <p>We don't have any cast for this movie.</p>}

      {error && <p>{error}</p>}
    </div>
  );
};

export default Cast;
