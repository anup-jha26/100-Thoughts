const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    day: { type: String, required: true },
    date: { type: String, required: true },
    text: { type: String, required: true }
});

module.exports = mongoose.model('Thought', thoughtSchema);