const express = require("express");
const router = express.Router();
const { index, show, destroy } = require("../controllers/controller");

// INDEX
router.get("/", index);

// SHOW
router.get("/:id", show);

// DELETE
router.delete("/:id", destroy);

module.exports = router;
