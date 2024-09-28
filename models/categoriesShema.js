const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true }
}, {
    collection: 'CATEGORIES'
});

module.exports = mongoose.model('Category', categoriesSchema);