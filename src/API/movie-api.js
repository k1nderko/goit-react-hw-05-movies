const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '020b5c65bb738eda3d675ffce0df7887';

async function fetchFilmsTrending() {
  const response = await fetch(
    `${BASE_URL}trending/all/day?api_key=${API_KEY}`
  );
  return await response.json();
}

async function fetchFilmsByQuery(query) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
  );
  return await response.json();
}

async function fetchFilmById(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  return await response.json();
}

async function fetchFilmCast(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
  return await response.json();
}

async function fetchFilmReviews(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
  return await response.json();
}

const api = {
  fetchFilmsTrending,
  fetchFilmsByQuery,
  fetchFilmById,
  fetchFilmCast,
  fetchFilmReviews,
};

export default api;
