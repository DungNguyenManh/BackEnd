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
            imageUrl: book.image ? `${req.protocol}://${req.get('host')}/${book.image}` : null
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
            imageUrl: book.image ? `${req.protocol}://${req.get('host')}/${book.image}` : null
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
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category_name: req.body.category_name, 
        number_of_books: req.body.number_of_books,
        image: req.file ? req.file.path : null,
        content: req.body.content
    });
    try {
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
                imageUrl: newBook.image ? `${req.protocol}://${req.get('host')}/${newBook.image}` : null,
                content: newBook.content
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: 'Error adding book',
            error: err.message
        });
    }
};


const updateBook = async (req, res) => {
    try {
        const { title } = req.params; 
        const newTitle = req.body.title; 

        if (!title || !newTitle) {
            return res.status(400).json({
                status: 'error',
                message: 'Title and new title are required'
            });
        }


        const book = await Book.findOne({ title });
        if (!book) {
            return res.status(404).json({
                status: 'error',
                message: 'Book not found'
            });
        }


        book.title = newTitle;


        const updatedBook = await book.save();
        res.status(200).json({
            status: 200,
            message: 'Book updated successfully',
            data: updatedBook
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error updating book',
            error: err.message
        });
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
                imageUrl: book.image ? `${req.protocol}://${req.get('host')}/${book.image}` : null,
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
