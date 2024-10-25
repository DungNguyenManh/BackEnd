const mongoose = require('mongoose');

const borrowRequestSchema = new mongoose.Schema({
    username: { type: String, required: true },  
    title: { type: String, required: true },    
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    status: { type: String, enum: ['chua giai quyet', 'duyet', 'bi loai bo'], default: 'chua giai quyet' }
});

module.exports = mongoose.model('BorrowRequest', borrowRequestSchema);
