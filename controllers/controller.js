const connection = require("../connection");
// INDEX
function index(req, res) {
  const sql = "SELECT * FROM db_movie.movies;";
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "DB QUERY FAILED" });
    console.log(results);
    res.json(results);
  });
}

module.exports = { index };
