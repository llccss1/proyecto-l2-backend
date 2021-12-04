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
        descripcion: {
            type: String,
        },
        picture: {
            type: String,
        },
    }
);

module.exports = mongoose.model("Directors", directorsSchema);