const express = require("express");
const routers = express.Router();
const { index } = require("../controllers/controller");

routers.get("/", index);

module.exports = routers;
