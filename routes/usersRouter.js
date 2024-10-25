const express = require('express');
const userRouter = express.Router();
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController'); 

userRouter.get('/', getAllUsers); 

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

module.exports = userRouter;
