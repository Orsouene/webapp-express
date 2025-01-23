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
function show(req, res) {
  id = parseInt(req.params.id);

  //   Preparao la mia query dei film
  const filmSql = "SELECT * FROM movies WHERE id = ?";
  //   Preparo la mia query dei reviews
  const reviewsSql = `SELECT reviews.*
FROM reviews
JOIN movies ON movies.id=reviews.movie_id
WHERE movies.id=?`;
  //   ESEGUO LA MIA QUERY

  connection.query(filmSql, [id], (err, filmResults) => {
    if (err) return res.status(500).json({ error: "invalid query " });
    if (filmResults.length === 0)
      return res
        .status(404)
        .json({ error: "There is no film with this => ID <= " });
    // Recupero il mio film
    const film = filmResults[0];
    // eseguo lq secondq query con il reviews
    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) return res.status(500).json({ error: "invalid query " });
      //    agguingo il review al film
      film.reviews = reviewsResults;
      console.log(film);
      res.json(film);
    });
  });
}

module.exports = { index, show };
