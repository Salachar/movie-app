const express = require("express");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// app.options('*', cors(corsOptions));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
