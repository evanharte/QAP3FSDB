const Pool = require("pg").Pool;
const pool = new Pool({
  user: "evanharte",
  host: "localhost",
  database: "Playlist",
  password: "12345",
  port: 5432,
});

console.log("connected to PostgreSQL...");

module.exports = pool;
