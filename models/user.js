const mongoose = require('mongoose');
const privatePaths = require('mongoose-private-paths');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        private: true
    },
    gameNumber: {
        type: Number,
        default: 0
    },
    win: {
        type: Number,
        default: 0
    },
    loss: {
        type: Number,
        default: 0
    },    
    gender: {
        type: String,
        default: ''
    },
    createdDate: {
        type: String,
        default: Date.now
    }
});

userSchema.plugin(privatePaths);

module.exports = mongoose.model('User', userSchema);