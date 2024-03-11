import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import moviesAPI from '../../API/movie-api';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { results } = await moviesAPI.fetchFilmReviews(movieId);
        setReviews(results);
      } catch (error) {
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h1>Reviews</h1>

      {loading && <p>Loading...</p>}

      {reviews?.length > 0 && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}

      {reviews?.length === 0 && (
        <p>We don't have any reviews for this movie.</p>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default Reviews;
