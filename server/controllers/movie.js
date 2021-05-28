const query = require('../pg');
const axios = require('axios');

const OMDB_API_KEY = 46835371;
const OMDB_API_PARAMS = `type=movie&r=json`;
const OMDB_BASE_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&${OMDB_API_PARAMS}`;

const MOVIES_TABLE = 'movies';


async function hydrateMovie (req, res) {
    const { id, imdb_id } = req.body;

    let full_movie_response = {};
    try {
        const url = `${OMDB_BASE_URL}&i=${imdb_id}`;
        const response = await axios.get(url);
        full_movie_response = response.data || {};
    } catch (err) {
        console.log(err);
        full_movie_response = {};
    }

    try {
        const {
            Rated: rated,
            Released: released,
            Runtime: runtime,
            Genre: genre,
            Plot: plot,
            Actors: actors,
            Director: director,
            imdbRating: imdb_rating,
        } = full_movie_response;

        const hydrated = Boolean(Object.keys(full_movie_response).length) ? true : false;

        let rotten_tomatoes_rating = null;
        (full_movie_response.Ratings || []).forEach((rating) => {
            console.log(rating);
            if (rating.Source.indexOf('Rotten') !== -1) {
                rotten_tomatoes_rating = rating.Value;
            }
        });

        const statement = `
            UPDATE ${MOVIES_TABLE}
            SET
                rated = $1,
                released = $2,
                runtime = $3,
                genre = $4,
                plot = $5,
                actors = $6,
                director = $7,
                imdb_rating = $8,
                rotten_tomatoes_rating = $9,
                hydrated = $10,
                updated_at = now()
            WHERE id = $11
            RETURNING *
        `;
        const values = [
            rated,
            released,
            runtime,
            genre,
            plot,
            actors,
            director,
            imdb_rating,
            rotten_tomatoes_rating,
            hydrated,
            id,
        ];

        const results = await query(statement, values);
        res.json({
            status: 'success',
            data: results.rows[0],
        });
    } catch (err) {
        console.log(err);
        res.json({
            status: 'fail',
            data: {},
        });
    }
}






async function getMovies (req, res) {
    const statement = `
        SELECT * FROM ${MOVIES_TABLE}
        WHERE watched = false
        ORDER BY id ASC
    `;

    try {
        const results = await query(statement);
        res.json({
            status: 'success',
            data: results.rows,
        });
    } catch (err) {
        res.json({
            status: 'fail',
            data: [],
        });
    }
}

async function getWatchedMovies (req, res) {
    const statement = `
        SELECT * FROM ${MOVIES_TABLE}
        WHERE watched = true
        ORDER BY id ASC
    `;

    try {
        const results = await query(statement);
        res.json({
            status: 'success',
            data: results.rows,
        });
    } catch (err) {
        res.json({
            status: 'fail',
            data: [],
        });
    }
}

async function postMovie (req, res) {
    const {
        imdb_id,
        title,
        type = 'movie',
        year,
        poster,
    } = req.body;

    try {
        const exists_statement = `
            SELECT * FROM ${MOVIES_TABLE}
            WHERE imdb_id = $1
        `;
        const exists_values = [imdb_id];

        const results = await query(exists_statement, exists_values);
        if (results.rows[0]) {
            res.json({
                status: 'fail',
                data: {},
            });
            return;
        }
    } catch (err) {} // It's okay for this to quietly fail

    let full_movie_response = {};
    try {
        const url = `${OMDB_BASE_URL}&i=${imdb_id}`;
        const response = await axios.get(url);
        full_movie_response = response.data || {};
    } catch (err) {
        console.log(err);
        full_movie_response = {};
    }

    try {
        const {
            Rated: rated,
            Released: released,
            Runtime: runtime,
            Genre: genre,
            Plot: plot,
            Actors: actors,
            Director: director,
            imdbRating: imdb_rating,
        } = full_movie_response;

        const hydrated = Boolean(Object.keys(full_movie_response).length) ? true : false;

        let rotten_tomatoes_rating = null;
        (full_movie_response.Ratings || []).forEach((rating) => {
            console.log(rating);
            if (rating.Source.indexOf('Rotten') !== -1) {
                rotten_tomatoes_rating = rating.Value;
            }
        });

        const statement = `INSERT INTO
            ${MOVIES_TABLE}(
                imdb_id,
                title,
                type,
                year,
                poster,
                rated,
                released,
                runtime,
                genre,
                plot,
                imdb_rating,
                rotten_tomatoes_rating,
                actors,
                director,
                hydrated
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            RETURNING *
        `;
        const values = [
            imdb_id,
            title,
            type,
            year,
            poster,
            rated,
            released,
            runtime,
            genre,
            plot,
            imdb_rating,
            rotten_tomatoes_rating,
            actors,
            director,
            hydrated,
        ];

        const results = await query(statement, values);
        res.json({
            status: 'success',
            data: results.rows[0],
        });
    } catch (err) {
        console.log(err);
        res.json({
            status: 'fail',
            data: {},
        });
    }
}

async function patchMovie (req, res) {
    const {
        id,
        upvotes,
        downvotes,
        rank,
        rating,
        watched,
    } = req.body;

    const statement = `
        UPDATE ${MOVIES_TABLE}
        SET
            upvotes = $1,
            downvotes = $2,
            rank = $3,
            rating = $4,
            watched = $5,
            updated_at = now()
        WHERE id = $6
        RETURNING *
    `;
    const values = [upvotes, downvotes, rank, rating, watched, id];

    try {
        const results = await query(statement, values);
        res.json({
            status: 'success',
            data: results.rows[0],
        });
    } catch (err) {
        res.json({
            status: 'fail',
            data: {},
        });
    }
}

async function deleteMovie (req, res) {
    const { id } = req.params;
    const statement = `DELETE FROM ${MOVIES_TABLE} WHERE id = $1 RETURNING *`;
    const values = [id];

    try {
        const results = await query(statement, values);
        res.json({
            status: 'success',
            data: results.rows[0],
        });
    } catch (err) {
        res.json({
            status: 'fail',
            data: {},
        });
    }
}

module.exports = {
    hydrateMovie,
    getMovies,
    getWatchedMovies,
    postMovie,
    patchMovie,
    deleteMovie,
};
