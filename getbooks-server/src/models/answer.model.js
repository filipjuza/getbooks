const mongoose = require('mongoose');

const { Schema } = mongoose;

const AnswerSchema = new Schema({
    createdAt: Number,
    content: String,
    votes: Number,
    question: { type: Schema.Types.ObjectId, ref: 'Question' }
});

module.exports = mongoose.model('Answer', AnswerSchema);
