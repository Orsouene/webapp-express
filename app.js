// Importo express
const express = require("express");
// Connessione al database
const connection = require("./connection");
// creao una istanza
const app = express();
// PORT
const port = process.env.PORT || 3000;
// importo il router
const movieRouter = require("./routers/router");
app.get("/", (req, res) => {
  res.send("welcome to my home page");
});

app.use("/movies", movieRouter);

// fallback
app.all("*", (req, res) => {
  res.status(404).json({ message: "req non valida" });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
