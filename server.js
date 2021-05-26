require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

const movie = require('./server/controllers/movie');

app.use(express.static(path.join(__dirname, 'build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('/movies', movie.getMovies);
app.get('/movies/watched', movie.getWatchedMovies);
app.post('/movie', movie.postMovie);
app.patch('/movie', movie.patchMovie);
app.delete('/movie/:id', movie.deleteMovie);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
