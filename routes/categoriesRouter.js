const express = require('express');
const categoriesRouter = express.Router();

// Danh sách thể loại sách
const categories = [
    'Hành động',
    'Tình cảm',
    'Hài',
    'Kinh dị',
    'Bí ẩn',
    'Giả tưởng',
    'Truyền cảm hứng',
    'Tiểu sử',
    'Truyện ngắn',
    'Dạy nấu ăn',
    'Bài luận',
    'Lịch sử'
];

// Đường dẫn để lấy danh sách thể loại
categoriesRouter.get('/', (req, res) => {
    res.json(categories);
});

module.exports = categoriesRouter;
