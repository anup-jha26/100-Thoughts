const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thoughtSchema = new Schema({
    date: { type: String, required: true },
    day: { type: String, required: true },
    text: { type: String, required: true }
});

module.exports = mongoose.model('Thought', thoughtSchema);