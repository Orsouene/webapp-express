const express = require("express");
const router = express.Router();
const {
  index,
  show,
  storeReview,
  destroy,
} = require("../controllers/controller");

// INDEX
router.get("/", index);

// SHOW
router.get("/:id", show);
// Store - create reviews
router.post("/:id/reviews", storeReview);
// DELETE
router.delete("/:id", destroy);

module.exports = router;
