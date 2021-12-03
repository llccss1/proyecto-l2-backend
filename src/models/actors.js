const mongoose = require("mongoose");

const actorsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true,
        },
        gender: {
            type: String,
            require: true,
            enum: ["M","F","X"]
        },
        description: {
            type: String,
        },
        picture: {
            type: String,
        }
    }
);

module.exports = mongoose.model("Actors", actorsSchema);