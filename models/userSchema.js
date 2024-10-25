const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'admin'], required: true },
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Invalid email format. Only Gmail addresses are allowed.']
    },
    borrowedBooks: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
            borrowDate: Date,
            returnDate: Date,
            status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
        }
    ]
}, {
    collection: 'USER'
});

module.exports = mongoose.model('User', userSchema);