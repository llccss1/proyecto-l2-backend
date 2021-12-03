const express = require("express");
const router = express.Router();
const directorsController = require("../controllers/directorsController");

router.get("/", directorsController.getDirectors);

module.exports = router;