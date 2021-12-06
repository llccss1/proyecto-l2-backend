const express = require("express");
const router = express.Router();
const actorsController = require("../controllers/actorsController");

router.get("/", actorsController.getActors);
router.get("/:id", actorsController.getActorById);
router.post("/", actorsController.addActor);
router.put("/:id", actorsController.updateActor);
router.delete("/:id", actorsController.deleteActor);

router.get("/movies/:id", actorsController.getMoviesFromActor);

module.exports = router;