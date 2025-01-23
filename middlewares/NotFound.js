function notFound(req, res) {
  res.status(404).json({ error: "NOT-FOUND", message: " Film not found" });
}

module.exports = notFound;
