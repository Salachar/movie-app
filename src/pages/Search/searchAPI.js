const OMDB_API_KEY = 46835371;
const OMDB_API_PARAMS = `type=movie&r=json`;
const OMDB_BASE_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&${OMDB_API_PARAMS}`;

export function fetchSuggestions (search_text = '') {
  return new Promise((resolve) => {
    const url = `${OMDB_BASE_URL}&s=${search_text}`;
    fetch(url).then(response => response.json()).then((data) => {
      let results = (data.Search || []).map((result) => {
        return {
          imdb_id: result.imdbID,
          title: result.Title,
          type: result.Type,
          year: result.Year,
          poster: (result.Poster !== 'N/A') ? result.Poster : '',
        };
      });

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
