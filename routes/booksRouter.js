const express = require('express');
const bookRouter = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

const {
    getAllBooks,
    searchBooks,
    addBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// Routes
bookRouter.get('/', getAllBooks);
bookRouter.get('/search', searchBooks);
bookRouter.get('/categories', async (req, res) => {
    const categories = ['Hành động', 'Tình cảm', 'Hài', 'Kinh dị', 'Bí ẩn', 'Giả tưởng', 'Truyền cảm hứng', 'Tiểu sử', 'Truyện ngắn', 'Dạy nấu ăn', 'Bài luận', 'Lịch sử']; // Danh sách thể loại mẫu
    res.json(categories);
});

bookRouter.post('/add', authenticateToken, authorizeRole('admin'), upload.single('bookImage'), addBook);

bookRouter.patch('/update/:title', authenticateToken, authorizeRole('admin'), upload.single('bookImage'), updateBook);

bookRouter.delete('/delete', authenticateToken, authorizeRole('admin'), deleteBook);

module.exports = bookRouter;