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
// import not-found middleware
const notFound = require("./middlewares/NotFound");
// import error-handler middleware
const errorHandler = require("./middlewares/errorHandler");
//Global Middleware:
app.use(cors());
// body parser  il body di qualunque richiesta va parsato come application/json
app.use(express.json());
// prendo l'im dalal cartella public
app.use(express.static("public"));
// DEFAULT ROOT
app.get("/", (req, res) => {
  res.send("welcome to my home page");
});

// ROUTER API DEL FILMS
app.use("/movies", movieRouter);

// fallback
// app.all("*", (req, res) => {
//   res.status(404).json({ message: "req non valida" });
// });
// ROUTER API DEL ERROR HANDLER
app.use(errorHandler);
// ROUTER API DEL NOT-FOUND
app.use(notFound);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
