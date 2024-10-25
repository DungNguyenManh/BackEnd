const express = require('express');
const bookRouter = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
    getAllBooks,
    searchBooks,
    addBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Chỉ cho phép tải lên các tệp hình ảnh (jpeg, jpg, png, gif)'));
        }
    }
});

bookRouter.get('/', getAllBooks);
bookRouter.get('/search', searchBooks);
bookRouter.get('/categories', (req, res) => {
    const categories = ['Hành động', 'Tình cảm', 'Hài', 'Kinh dị', 'Bí ẩn', 'Giả tưởng', 'Truyền cảm hứng', 'Tiểu sử', 'Truyện ngắn', 'Dạy nấu ăn', 'Bài luận', 'Lịch sử'];
    res.json(categories);
});

bookRouter.post('/add', authenticateToken, authorizeRole('admin'), upload.single('bookImage'), addBook);

bookRouter.patch('/update/:id', authenticateToken, authorizeRole('admin'), updateBook);

bookRouter.delete('/delete', authenticateToken, authorizeRole('admin'), deleteBook);

module.exports = bookRouter;
