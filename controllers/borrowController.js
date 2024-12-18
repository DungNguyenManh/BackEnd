const BorrowRequest = require('../models/borrowSchema');

const createBorrowRequest = async (req, res) => {
    const borrowRequest = new BorrowRequest({
        username: req.body.username, 
        title: req.body.title,        
        borrowDate: req.body.borrowDate,
        returnDate: req.body.returnDate,
        status: 'pending'
    });
    try {
        const newRequest = await borrowRequest.save(); 
        res.status(201).json({
            status: 200,
            message: 'Create successful loan request',
            data: newRequest
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: 'Create loan request failed',
            error: err.message
        });
    }
};

const getAllBorrowRequests = async (req, res) => {
    try {
        const requests = await BorrowRequest.find(); 
        
        res.status(200).json({
            status: 200,
            message: 'View successful loan request',
            data: requests 
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'View loan request failed',
            error: err.message
        });
    }
};

const approveBorrowRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const request = await BorrowRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({
                status: 'error',
                message: 'No request to borrow books found'
            });
        }

        request.status = 'approved';
        const updatedRequest = await request.save();
        
        return res.json({
            status: 200,
            message: 'The book loan request has been approved successfully',
            data: updatedRequest
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

const deleteBorrowRequest = async (req, res) => {
    try {
        const request = await BorrowRequest.findByIdAndDelete(req.params.id);
        if (!request) {
            return res.status(404).json({
                status: 'error',
                message: 'Book loan request could not be found',
                data: []
            });
        }

        return res.json({
            status: 200,
            message: 'Deleted successfully',
            data: []
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: err.message,
            data: []
        });
    }
};


module.exports = {
    createBorrowRequest,
    getAllBorrowRequests,
    approveBorrowRequest,
    deleteBorrowRequest
};
