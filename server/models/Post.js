const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    name: {
        type: String,
    },
    desc: {
        type: String,
    },
    photo: {
        type: String,
    },
    categories: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
}, { timestamps: true });

module.exports = mongoose.model('post', PostSchema);