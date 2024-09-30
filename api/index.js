const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware để xử lý JSON
app.use(express.json());

// Ví dụ endpoint API
app.get('/api/books', (req, res) => {
    res.json([
        { id: 1, title: 'Book 1', author: 'Author 1' },
        { id: 2, title: 'Book 2', author: 'Author 2' }
    ]);
});

app.post('/api/books', (req, res) => {
    const newBook = req.body;
    res.status(201).json(newBook); // Trả về cuốn sách vừa được thêm
});

app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});
