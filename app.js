// Importo express
const express = require("express");
// creao una istanza
const app = express();
// PORT
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("welcome to my home page");
});

// fallback
app.all("*", (req, res) => {
  res.status(404).json({ message: "req non valida" });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
