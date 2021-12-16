const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/validate", usersController.validateUser);

module.exports = router;