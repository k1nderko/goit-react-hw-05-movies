import { useEffect, useState } from 'react';
import {
  useParams,
  useNavigate,
  Outlet,
  NavLink,
  useLocation,
} from 'react-router-dom';

import moviesAPI from '../../API/movie-api';
import styles from './MovieDetailsPage.module.css';
import { defaultImg } from '../../constants/common';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  const onGoBack = () => {
    navigate(location?.state?.from ?? '/');
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movie = await moviesAPI.fetchFilmById(movieId);
        setMovie(movie);
      } catch (error) {
        setError('Something went wrong. Please try again later.');
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <div>
      <button type="button" onClick={onGoBack}>
        Go back
      </button>

      <h1>MovieDetailsPage</h1>

      {movie && (
        <>
          <div className={styles.box}>
            <div className={styles.img}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : defaultImg
                }
                width={250}
                alt="poster"
              />
            </div>
            <div>
              <h2>{movie.title}</h2>
              <p>User score: {movie.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>
                {movie.genres.map(genre => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
              </p>
            </div>
          </div>
          <hr />
          <h3>Additional information</h3>

          <ul>
            <li>
              <NavLink
                to="cast"
                state={{
                  from: location?.state?.from ?? '/',
                }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to="reviews"
                state={{
                  from: location?.state?.from ?? '/',
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          <hr />
          <Outlet />
        </>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default MovieDetailsPage;
