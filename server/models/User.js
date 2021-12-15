const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    Avatar: {
        type: String,
        default: 'download.jfif',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('users', UserSchema);