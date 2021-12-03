const mongoose = require("mongoose");

const directorsSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            require: true,
        },
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
    }
);

module.exports = mongoose.model("Directors", directorsSchema);