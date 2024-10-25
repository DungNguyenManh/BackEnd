const Book = require('../models/bookSchema');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('category_name');
        const bookList = books.map(book => ({
            title: book.title,
            author: book.author,
            description: book.description,
            category_name: book.category_name,
            number_of_books: book.number_of_books,
            imageUrl: book.image,
        }));

        res.status(200).json({
            status: 200,
            message: 'Book display successful',
            data: bookList
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
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
        }).populate('category_name');

        const bookList = books.map(book => ({
            title: book.title,
            author: book.author,
            description: book.description,
            category_name: book.category_name,
            number_of_books: book.number_of_books,
            imageUrl: book.image || `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
        }));

        res.status(200).json({
            status: 200,
            message: 'Books fetched successfully',
            data: bookList
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching books',
            error: error.message
        });
    }
};

const addBook = async (req, res) => {
    try {
        const { title, author, description, category_name, number_of_books, content } = req.body;

        if (!title || !author || !category_name) {
            return res.status(400).json({ status: 'error', message: 'Vui lòng cung cấp tất cả các trường bắt buộc.' });
        }

        const book = new Book({
            title,
            author,
            description,
            category_name,
            number_of_books,
            image: req.file ? `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}` : `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
            content
        });

        const newBook = await book.save();

        res.status(201).json({
            status: 200,
            message: 'Book added successfully',
            data: {
                id: newBook._id,
                title: newBook.title,
                author: newBook.author,
                description: newBook.description,
                category_name: newBook.category_name,
                number_of_books: newBook.number_of_books,
                imageUrl: newBook.image,
                content: newBook.content
            }
        });
    } catch (err) {
        console.error("Lỗi khi thêm sách:", err); 
        res.status(500).json({
            status: 'error',
            message: 'Error adding book',
            error: err.message
        });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedData = req.body;

        if (!id) {
            return res.status(400).json({ status: 'error', message: 'Book ID is required for updating' });
        }

        if (req.file) {
            updatedData.image = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`; 
        }

        const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ status: 'error', message: 'Book not found' });
        }

        res.status(200).json({
            status: 200,
            message: 'Book updated successfully',
            data: {
                id: updatedBook._id,
                title: updatedBook.title,
                author: updatedBook.author,
                description: updatedBook.description,
                category_name: updatedBook.category_name,
                number_of_books: updatedBook.number_of_books,
                imageUrl: updatedBook.image,
                content: updatedBook.content
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Error updating book', error: err.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({
                status: 'error',
                message: 'Title is required to delete books'
            });
        }

        const booksToDelete = await Book.find({ title: title });

        if (booksToDelete.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No books found with that title'
            });
        }

        const result = await Book.deleteMany({ title: title });

        return res.status(200).json({
            status: 200,
            message: `${result.deletedCount} book(s) deleted successfully`,
            data: booksToDelete.map(book => ({
                id: book._id,
                title: book.title,
                author: book.author,
                description: book.description,
                category_name: book.category_name,
                number_of_books: book.number_of_books,
                imageUrl: book.image || `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
                content: book.content
            }))
        });

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error deleting book',
            error: err.message
        });
    }
};

module.exports = {
    getAllBooks,
    searchBooks,
    addBook,
    updateBook,
    deleteBook
};
