const mongoose = require("mongoose");

const actorsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        birthDate: {
            type: Date,            
        },
        gender: {
            type: String,
            required: true,
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