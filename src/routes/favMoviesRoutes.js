const express = require('express');
const favMovie = require('../controllers/favMoviesController');

const router = express.Router();

router.post("/favMovies/:userID/:movieID", favMovie.addFavMovie);
router.get("/favMovies/:userID", favMovie.getFavMovies);
router.delete("/favMovies/:userID/:movieID", favMovie.removeFavMovie);

module.exports = router;
