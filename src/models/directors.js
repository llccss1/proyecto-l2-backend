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
        gender: {
            type: String,
            required: true,
            enum: ["M","F","X"]
        },
        descripcion: {
            type: String,
        },
        picture: {
            type: String,
        },
    }
);

module.exports = mongoose.model("Directors", directorsSchema);