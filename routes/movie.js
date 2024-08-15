const express = require("express");
const router = express.Router();

const { retrieveAllMovies } = require("../controller/movies");

router.get("/movies", retrieveAllMovies);

module.exports = router;
