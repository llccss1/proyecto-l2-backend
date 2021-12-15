const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema(
    {
        movieTitle: {
            type: String,
            required: true,
        },
        yearOfRelease: {
            type: Number,
            require: true,
        },
        director: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Directors",            
        },
        movieGenre: {
            type: String,
            required: true,
            enum: ["Action","Suspense","Comedy","Thriller","Fantasy","None"]
        },
        sinopsis: {
            type: String,
            required: true,
        },
        poster: {
            type: String,            
        },
        cast: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Actors",            
            required: true,
        },
        favourite: {
            type: Boolean,
        },        
        urlImdb: {
            type: String,
        },
        urlYts: {
            type: String,
        }
        
    }
);

module.exports = mongoose.model("Movies", moviesSchema);