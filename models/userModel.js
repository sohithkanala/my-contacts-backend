const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter the User name."]
        },
        email: {
            type: String,
            required: [true, "Please enter the User email address."],
            unique: [true, "Email address already taken."]
        },
        password: {
            type: String,
            required: [true, "Enter your password"],
        }
    },
    {
        timestamp: true
    }
);

module.exports = mongoose.model("User", userSchema);