const OMDB_API_KEY = 46835371;
const OMDB_API_PARAMS = `type=movie&plot=short&r=json`;
const OMDB_BASE_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&${OMDB_API_PARAMS}`;

export function fetchSuggestions (search_text = '') {
  return new Promise((resolve) => {
    const url = `${OMDB_BASE_URL}&s=${search_text}`;
    fetch(url).then(response => response.json()).then((data) => {
      const results = data.Search || [];
      resolve(results);
    });
  });
}

export function fetchMovie (search_text = '') {
  return new Promise((resolve) => {
    const url = `${OMDB_BASE_URL}&t=${search_text}`;
    fetch(url).then(response => response.json()).then((data) => {
      resolve(data);
    });
  });
}
