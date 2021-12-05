const express = require("express");
const router = express.Router();
const directorsController = require("../controllers/directorsController");

router.get("/", directorsController.getDirectors);
router.get("/:id", directorsController.getDirectorById);
router.post("/", directorsController.addDirector);
router.put("/:id", directorsController.updateDirector);
router.delete("/:id", directorsController.deleteDirector);

module.exports = router;