const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const CategoriesModel = require('./categoriesShema');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: String,
    tentheloai: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    soluongsach: { type: Number, required: true }
}, {
    collection: 'BOOK'
});

module.exports = mongoose.model('Book', bookSchema); 
