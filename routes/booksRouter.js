const express = require('express');
const bookRouter = express.Router();
const {
    getAllBooks,
    searchBooks,
    addBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

bookRouter.get('/', getAllBooks);

bookRouter.get('/search', searchBooks);

bookRouter.post('/add', authenticateToken, authorizeRole('admin'), addBook);

bookRouter.patch('/:id', authenticateToken, authorizeRole('admin'), updateBook);

bookRouter.delete('/:id', authenticateToken, authorizeRole('admin'), deleteBook);

module.exports = bookRouter;
