const express = require('express');
const userRouter = express.Router();
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController'); // Thêm getAllUsers vào đây

// Route lấy tất cả người dùng
userRouter.get('/', getAllUsers); // Đường dẫn này sẽ lấy tất cả người dùng

// Route đăng ký người dùng
userRouter.post('/register', registerUser);

// Route đăng nhập người dùng
userRouter.post('/login', loginUser);

module.exports = userRouter;
