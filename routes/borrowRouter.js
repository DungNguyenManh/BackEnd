const express = require('express');
const borrowRequestRouter = express.Router();
const {
    createBorrowRequest,
    getAllBorrowRequests,
    approveBorrowRequest,
    deleteBorrowRequest
} = require('../controllers/borrowController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

borrowRequestRouter.post('/', authenticateToken, createBorrowRequest);
borrowRequestRouter.get('/', authenticateToken, authorizeRole('admin'), getAllBorrowRequests);
borrowRequestRouter.patch('/:id', authenticateToken, authorizeRole('admin'), approveBorrowRequest);
borrowRequestRouter.delete('/:id', authenticateToken, authorizeRole('admin'), deleteBorrowRequest);

module.exports = borrowRequestRouter;
