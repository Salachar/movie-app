const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

function query(text, params) {
  return new Promise((resolve, reject) => {
    client.query(text, params)
      .then(res => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = query;
