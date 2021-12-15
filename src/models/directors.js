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
        description: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
        },
        favourite: {
            type: Boolean,
        },
        urlImdb: {
            type: String,
        }
    }
);

module.exports = mongoose.model("Directors", directorsSchema);