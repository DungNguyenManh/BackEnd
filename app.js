const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const { dbConnection } = require('./database/dbconnect');
const path = require('path');

const usersRouter = require('./routes/usersRouter');
const booksRouter = require('./routes/booksRouter');
const borrowRouter = require('./routes/borrowRouter');
const categoriesRouter = require('./routes/categoriesRouter');

dotenv.config();
const app = express();

app.use(
    cors({
        origin: [process.env.FRONTEND_URL, process.env.BACKEND_URL],
        methods: ["GET", "POST", "DELETE", "PATCH"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.use(express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
    res.send("Welcome to the Library API");
});

app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/borrow-requests", borrowRouter);
app.use("/api/categories", categoriesRouter);

app.use(errorMiddleware);

module.exports = app; 
