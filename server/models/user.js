const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true // Allows null values but enforces uniqueness for non-null values
    },
    password: {
        type: String,
        required: function() {
            return !this.githubId; // Password not required if user signs up with GitHub
        }
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;