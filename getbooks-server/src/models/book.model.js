const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const { Schema } = mongoose;

const BookSchema = new Schema({
    title: String,
    author: String,
    price: Number,
    slug: String,
    user: { type: ObjectId, ref: 'User' },
    category: { type: ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Book', BookSchema);
