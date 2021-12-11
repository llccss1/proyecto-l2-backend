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
            enum: ["M","F","X"]
        },
        description: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
        },
        favourite: {
            type: Boolean,
        }
    }
);

module.exports = mongoose.model("Actors", actorsSchema);