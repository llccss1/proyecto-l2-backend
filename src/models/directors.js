const mongoose = require("mongoose");

const directorsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true,
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