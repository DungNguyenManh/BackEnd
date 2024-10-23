const mongoose = require('mongoose');

const borrowRequestSchema = new mongoose.Schema({
    username: { type: String, required: true },  // Dùng chuỗi trực tiếp cho username
    title: { type: String, required: true },     // Dùng chuỗi trực tiếp cho title
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    status: { type: String, enum: ['chua giai quyet', 'duyet', 'bi loai bo'], default: 'chua giai quyet' }
});

module.exports = mongoose.model('BorrowRequest', borrowRequestSchema);
