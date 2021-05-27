const query = require('../pg');

const MOVIES_TABLE = 'movies';

async function getMovies (req, res) {
    const statement = `
        SELECT * FROM ${MOVIES_TABLE}
        WHERE watched = false
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

    try {
        const statement = `INSERT INTO
            ${MOVIES_TABLE}(imdb_id, title, type, year, poster)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [imdb_id, title, type, year, poster];

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
    getMovies,
    getWatchedMovies,
    postMovie,
    patchMovie,
    deleteMovie,
};
