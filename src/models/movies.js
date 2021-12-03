const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema(
    {
        movieName: {
            type: String,
            require: true,
        },
        year: {
            type: Number,
            require: true,
        },
        director: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Directors",
            require: true,
        },
        movieGenre: {
            type: String,
            require: true,
            enum: ["Action","Suspense","Comedy","Thriller","Fantasy","None"]
        },
        sinopsis: {
            type: String,
        },
        poster: {
            type: String,
            require: true,
        },
        cast: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Actors",
            require: true,
        }
    }
);

module.exports = mongoose.model("Movies", moviesSchema);