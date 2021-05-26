export function fetchMovies () {
  return new Promise((resolve) => {
    const url = `movies/watched`;
    fetch(url).then(response => response.json()).then((data) => {
      resolve(data);
    });
  });
}
