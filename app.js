// Importo express
const express = require("express");
// Connessione al database
const connection = require("./connection");
// importato CORS sul app.js
var cors = require("cors");
// creao una istanza
const app = express();
// PORT
const port = process.env.PORT || 3000;
// importo il router
const movieRouter = require("./routers/router");

//Global Middleware:
app.use(cors());
// body parser  il body di qualunque richiesta va parsato come application/json
app.use(express.json());
// prendo l'im dalal cartella public
app.use(express.static("public"));
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
