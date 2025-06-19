const { response } = require("express");
const connection = require("../connection");
// INDEX
// INDEX
function index(req, res) {
  const limit = 4;
  const { page = 1 } = req.query; // Assicurati che la pagina abbia un valore di default
  const offset = limit * (page - 1);

  const sqlCount = "SELECT COUNT(*) AS `count` FROM `movies`";
  connection.query(sqlCount, (err, results) => {
    if (err) return res.status(500).json({ error: "DB QUERY FAILED" });

    const count = results[0].count;
    const totalPages = Math.ceil(count / limit); // calcoliamo il numero totale di pagine

    // Assicurati che la pagina richiesta non superi il totale delle pagine disponibili
    if (page > totalPages) {
      return res.status(400).json({ error: "Page exceeds available pages" });
    }

    const sql = "SELECT * FROM `movies` LIMIT ? OFFSET ?";
    connection.query(sql, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: "Error in server" });

      const response = {
        count,
        numPages: totalPages, // Aggiungi il numero totale di pagine
        items: results,
      };
      res.json(response);
    });
  });
}

// SHOW
function show(req, res) {
  const id = parseInt(req.params.id);

  // PROVA PER IL errorHandler :
  // consol.log(id);

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

// Function Store
function storeReview(req, res) {
  // //  recupero l'id
  // const { id } = req.params;
  const id = parseInt(req.params.id);
  // recuper oi lbody
  const { name, text, vote } = req.body;
  // il mio query
  const sql =
    "INSERT INTO reviews (name, text,vote, movie_id) VALUES (?, ?, ?, ?)";
  // console.log("Query SQL:", sql);
  // console.log("Dati:", [name, vote, text, id]);

  // eseguo la query
  connection.query(sql, [name, text, vote, id], (err, results) => {
    if (err) {
      console.error("Errore della query:", err);
      return res.status(500).json({ error: "DB QUERY FAILED" });
    }
    console.log(results);
    res.status(201).json({ message: "Review add", id: results.insertId });
  });
}
// DELETE
function destroy(req, res) {
  const id = parseInt(req.params.id);
  const sql = "DELETE FROM movies WHERE (`id` = '?')";
  //   ESEGUO LA QUERY
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ err: "no film to delete" });
    console.log(results);
    res.sendStatus(204);
  });
}

module.exports = { index, show, storeReview, destroy };
