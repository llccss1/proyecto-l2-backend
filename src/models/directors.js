const mongoose = require("mongoose");

const directorsSchema = mongoose.Schema(
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
        descripcion: {
            type: String,
        },
        picture: {
            type: String,
        },
        favourite: {
            type: Boolean,
        }
    }
);

module.exports = mongoose.model("Directors", directorsSchema);