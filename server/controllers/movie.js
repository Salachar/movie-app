const query = require('../pg');

const MOVIES_TABLE = 'movies';

async function getMovies (req, res) {
  const statement = `
    SELECT * FROM ${MOVIES_TABLE}
    WHERE watched = false
  `;

  try {
    const response = await query(statement);
    res.json({
      status: 'success',
      data: response.rows,
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
    const response = await query(statement);
    res.json({
      status: 'success',
      data: response.rows,
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

  const statement = `INSERT INTO
    ${MOVIES_TABLE}(imdb_id, title, type, year, poster)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [imdb_id, title, type, year, poster];

  try {
    const response = await query(statement, values);
    res.json({
      status: 'success',
      data: response.rows[0],
    });
  } catch (err) {
    console.log(err.stack);
    res.json({
      status: 'fail',
      data: {},
    });
  }
}

async function patchMovie (req, res) {
  console.log('patchMovie');

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
    WHERE
      id = $6
    RETURNING
      *
  `;
  const values = [upvotes, downvotes, rank, rating, watched, id];

  try {
    const response = await query(statement, values);
    res.json({
      status: 'success',
      data: response.rows[0],
    });
  } catch (err) {
    console.log(err.stack);
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
    const response = await query(statement, values);
    res.json({
      status: 'success',
      data: response.rows[0],
    });
  } catch (err) {
    console.log(err.stack);
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
