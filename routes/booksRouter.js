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

// Kiểm tra và tạo thư mục 'uploads' nếu chưa có
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Cấu hình kiểm tra file tải lên
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Giới hạn 2MB
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

// Routes
bookRouter.get('/', getAllBooks);
bookRouter.get('/search', searchBooks);
bookRouter.get('/categories', async (req, res) => {
    const categories = ['Hành động', 'Tình cảm', 'Hài', 'Kinh dị', 'Bí ẩn', 'Giả tưởng', 'Truyền cảm hứng', 'Tiểu sử', 'Truyện ngắn', 'Dạy nấu ăn', 'Bài luận', 'Lịch sử'];
    res.json(categories);
});

// Route thêm sách
bookRouter.post('/add', authenticateToken, authorizeRole('admin'), (req, res, next) => {
    upload.single('bookImage')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Lỗi khi tải lên tệp: ' + err.message
            });
        }
        next();
    });
}, addBook);

// Route cập nhật sách
bookRouter.patch('/update/:title', authenticateToken, authorizeRole('admin'), (req, res, next) => {
    upload.single('bookImage')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Lỗi khi tải lên tệp: ' + err.message
            });
        }
        next();
    });
}, updateBook);

// Route xóa sách
bookRouter.delete('/delete', authenticateToken, authorizeRole('admin'), deleteBook);

module.exports = bookRouter;
