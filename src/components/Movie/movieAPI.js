export function hydrateMovie (movie = {}) {
    return new Promise((resolve, reject) => {
        if (!Object.keys(movie).length) {
            console.error('hydrateMovie rejecting empty object');
            reject();
            return;
        }

        const url = `/movie/hydrate`;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie)
        };

        fetch(url, options).then(response => response.json()).then((data) => {
            resolve(data);
        });
    });
}

export function postMovie (movie = {}) {
    return new Promise((resolve, reject) => {
        if (!Object.keys(movie).length) {
            console.error('addMovie rejecting empty object');
            reject();
            return;
        }

        const url = `/movie`;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie)
        };

        fetch(url, options).then(response => response.json()).then((data) => {
            resolve(data);
        });
    });
}

export function patchMovie (movie = {}) {
    return new Promise((resolve, reject) => {
        const url = `/movie`;
        const options = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie)
        };

        fetch(url, options).then(response => response.json()).then((data) => {
            resolve(data);
        });
    });
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
    });
}
