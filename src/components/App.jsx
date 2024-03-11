import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import AppBar from './AppBar';
const HomePage = lazy(() => import('../views/HomePage'));
const MoviesPage = lazy(() => import('../views/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../views/MovieDetailsPage'));
const Cast = lazy(() => import('../views/Cast'));
const Reviews = lazy(() => import('../views/Reviews'));

export const App = () => {
  return (
    <>
      <AppBar />

      <Suspense fallback={<>...</>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
