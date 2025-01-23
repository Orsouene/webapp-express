const express = require("express");
const router = express.Router();
const { index, show } = require("../controllers/controller");

// INDEX
router.get("/", index);

// SHOW
router.get("/:id", show);

module.exports = router;
