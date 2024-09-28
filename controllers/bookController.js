const Book = require('../models/bookSchema');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('tentheloai');
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const searchBooks = async (req, res) => {
    const query = req.query.q;
    try {
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } }
            ]
        }).populate('tentheloai');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
};

const addBook = async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        tentheloai: req.body.tentheloai,
        soluongsach: req.body.soluongsach
    });
    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // Cập nhật thông tin sách
        if (req.body.title != null) {
            book.title = req.body.title;
        }
        if (req.body.author != null) {
            book.author = req.body.author;
        }
        if (req.body.description != null) {
            book.description = req.body.description;
        }
        if (req.body.tentheloai != null) {
            book.tentheloai = req.body.tentheloai;
        }
        if (req.body.soluongsach != null) {
            book.soluongsach = req.body.soluongsach;
        }

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        res.json({ message: 'Deleted Book' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllBooks,
    searchBooks,
    addBook,
    updateBook,
    deleteBook
};
