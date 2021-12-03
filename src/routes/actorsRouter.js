const express = require("express");
const router = express.Router();
const actorsController = require("../controllers/actorsController");

router.get("/", actorsController.getActors);

module.exports = router;