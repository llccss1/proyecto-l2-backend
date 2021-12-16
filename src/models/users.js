const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model("Users", usersSchema);