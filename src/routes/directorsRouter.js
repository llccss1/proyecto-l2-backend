const express = require("express");
const router = express.Router();
const directorsController = require("../controllers/directorsController");

router.get("/fav/", directorsController.getFavouritesDirectors);
router.get("/search/:textSearch", directorsController.getSearchDirectors);
router.get("/", directorsController.getDirectors);
router.get("/:id", directorsController.getDirectorById);
router.post("/", directorsController.addDirector);
router.put("/:id", directorsController.updateDirector);
router.delete("/:id", directorsController.deleteDirector);
router.get("/movies/:id", directorsController.getMoviesFromDirector);

module.exports = router;