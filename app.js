const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const { dbConnection } = require('./database/dbconnect');

const usersRouter = require('./routes/usersRouter');
const booksRouter = require('./routes/booksRouter');
const borrowRouter = require('./routes/borrowRouter');

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
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

dbConnection();

app.get("/", (req, res) => {
    res.send("Welcome to the Library API");
});

// Use routers
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/borrow-requests", borrowRouter);

app.use(errorMiddleware);

module.exports = app;
