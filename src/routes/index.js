const express = require("express");
const moviesRouter = require("./moviesRouter");
const actorsRouter = require("./actorsRouter");
const directorsRouter = require("./directorsRouter");
const usersRouter = require("./usersRouter");

const router = express.Router();

router.use("/movies", moviesRouter);
router.use("/actors", actorsRouter);
router.use("/directors", directorsRouter);
router.use("/users", usersRouter);

module.exports = router;