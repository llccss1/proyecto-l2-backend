const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema(
    {
        movieName: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            require: true,
        },
        director: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Directors",
            required: true,
        },
        movieGenre: {
            type: String,
            required: true,
            enum: ["Action","Suspense","Comedy","Thriller","Fantasy","None"]
        },
        sinopsis: {
            type: String,
        },
        poster: {
            type: String,
            required: true,
        },
        cast: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Actors",
            required: true,
        }
    }
);

module.exports = mongoose.model("Movies", moviesSchema);