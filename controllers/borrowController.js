// controllers/borrowController.js
const BorrowRequest = require('../models/borrowSchema');

const createBorrowRequest = async (req, res) => {
    const borrowRequest = new BorrowRequest({
        userId: req.body.userId,
        bookId: req.body.bookId,
        borrowDate: req.body.borrowDate,
        returnDate: req.body.returnDate
    });
    try {
        const newRequest = await borrowRequest.save();
        res.status(201).json(newRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllBorrowRequests = async (req, res) => {
    try {
        const requests = await BorrowRequest.find().populate('userId').populate('bookId');
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const approveBorrowRequest = async (req, res) => {
    try {
        const request = await BorrowRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        if (req.body.status !== null) {
            if (req.body.status === 'rejected') {
                await BorrowRequest.findByIdAndDelete(req.params.id);
                return res.json({ message: 'Request rejected and deleted' });
            } else {
                request.status = req.body.status;
                const updatedRequest = await request.save();
                return res.json(updatedRequest);
            }
        }

        res.status(400).json({ message: 'Status is required' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createBorrowRequest,
    getAllBorrowRequests,
    approveBorrowRequest
};
