const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema(
    {
        movieName: {
            type: String,
            require: true,
        },
        sinopsis: {
            type: String,
        },
        poster: {
            type: String,
            require: true,
        },
        cast: {
            type: [String],
            require: true,
        }
    }
);

module.exports = mongoose.model("Movies", moviesSchema);