const express = require("express");
const moviesRouter = require("./moviesRouter");
const actorsRouter = require("./actorsRouter");
const directorsRouter = require("./directorsRouter");

const router = express.Router();

router.use("/movies", moviesRouter);
router.use("/actors", actorsRouter);
router.use("/directors", directorsRouter);

module.exports = router;