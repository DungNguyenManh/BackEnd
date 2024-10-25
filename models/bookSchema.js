const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: String,
    category_name: [{ type: String, required: true }],
    number_of_books: { type: Number, required: true },
    image: { type: String },
    content: { type: String }
}, {
    collection: 'BOOK'
});

module.exports = mongoose.model('Book', bookSchema);
