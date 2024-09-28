// Dùng CommonJS (require)
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})





// import { dbConnection } from './database/dbconnect';
// import dotenv from "dotenv";

// const express = require('express')
// const app = express()
// const port = 3000
// const bodyParser = require('body-parser')
// const path = require('path');


// dotenv.config();


// const userRouter = require('./routes/users');
// const bookRouter = require('./routes/books');
// const borrowRequestRouter = require('./routes/borrowRequests');

// app.use(bodyParser.urlencoded({ extended: false }))

// app.use(bodyParser.json())
// app.use(express.json())
// app.use(express.static(path.join(__dirname, 'public')));


// //app.use('/admin/api/v1/', router1)
// //app.use('/', router1)
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.use('/users', userRouter);
// app.use('/books', bookRouter);
// app.use('/borrow-requests', borrowRequestRouter);
// // app.use('/api1/v1/', router1)

// dbConnection();

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })