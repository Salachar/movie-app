export function postMovie (movie = {}) {
  return new Promise((resolve, reject) => {
    if (!Object.keys(movie).length) {
      console.error('addMovie rejecting empty object');
      reject();
      return;
    }

    const url = `/movie`;
    const options = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie) // body data type must match "Content-Type" header
    };

    fetch(url, options).then(response => response.json()).then((data) => {
      resolve(data);
    });
  })
}

export function patchMovie (movie = {}) {
  return new Promise((resolve, reject) => {
    const url = `/movie`;
    const options = {
      method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie) // body data type must match "Content-Type" header
    };

    fetch(url, options).then(response => response.json()).then((data) => {
      resolve(data);
    });
  })
}

export function deleteMovie (movie = {}) {
  return new Promise((resolve, reject) => {
    const url = `/movie/${movie.id}`;
    const options = {
      method: 'DELETE',
    };

    fetch(url, options).then(response => response.json()).then((data) => {
      resolve(data);
    });
  })
}
