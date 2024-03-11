import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MoviesList = ({ films }) => {
  const location = useLocation();

  return (
    <ul>
      {films.map(film => (
        <li key={film.id}>
          <Link to={`/movies/${film.id}`} state={{ from: location }}>
            {film.original_title || film.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
