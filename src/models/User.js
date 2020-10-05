/**
 * Mongoose model template
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true,
        default: Date.now
    },
    lastUpdated: {
        type: Number,
        required: true,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
