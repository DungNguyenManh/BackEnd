const express = require('express');
const borrowRequestRouter = express.Router();
const {
    createBorrowRequest,
    getAllBorrowRequests,
    approveBorrowRequest
} = require('../controllers/borrowController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

borrowRequestRouter.post('/', authenticateToken, createBorrowRequest);
borrowRequestRouter.get('/', authenticateToken, authorizeRole('admin'), getAllBorrowRequests);
borrowRequestRouter.patch('/:id', authenticateToken, authorizeRole('admin'), approveBorrowRequest);

module.exports = borrowRequestRouter;
