const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get("/fav/", moviesController.getFavouritesMovies);
router.get("/search/:searchText", moviesController.getSearchMovies);
router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMovieById);
router.post("/", moviesController.addMovie);
router.put("/:id", moviesController.updateMovie);
router.delete("/:id", moviesController.deleteMovie);


module.exports = router;