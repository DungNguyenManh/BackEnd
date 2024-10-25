const express = require('express');
const bookRouter = express.Router();
const multer = require('multer'); // Nếu không cần, bạn có thể bỏ import này
const fs = require('fs');

const {
    getAllBooks,
    searchBooks,
    addBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// Nếu không cần thiết lập uploadDir, bạn có thể bỏ qua phần này
const uploadDir = 'uploads'; // Có thể xóa nếu không sử dụng
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Bạn có thể xóa phần cấu hình multer vì không cần upload nữa
const upload = multer({
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        // Không cần kiểm tra loại tệp nếu không upload
        cb(null, true);
    }
});

bookRouter.get('/', getAllBooks);
bookRouter.get('/search', searchBooks);
bookRouter.get('/categories', (req, res) => {
    const categories = ['Hành động', 'Tình cảm', 'Hài', 'Kinh dị', 'Bí ẩn', 'Giả tưởng', 'Truyền cảm hứng', 'Tiểu sử', 'Truyện ngắn', 'Dạy nấu ăn', 'Bài luận', 'Lịch sử'];
    res.json(categories);
});

// Bạn không cần upload nữa, nên có thể xóa middleware upload
bookRouter.post('/add', authenticateToken, authorizeRole('admin'), addBook);
bookRouter.patch('/update/:id', authenticateToken, authorizeRole('admin'), updateBook);
bookRouter.delete('/delete', authenticateToken, authorizeRole('admin'), deleteBook);

module.exports = bookRouter;
