const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Lấy tất cả người dùng
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Không trả về password
        res.status(200).json({
            statusCode: 200,
            message: "Users retrieved successfully",
            data: users
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Đăng ký người dùng
const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            statusCode: 400,
            message: "Incorrect gmail format",
            data: { gmail: email }
        });
    }

    const role = username.includes('admin') ? 'admin' : 'client';

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                statusCode: 400,
                message: "User already exists",
                data: { username }
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            password: hashedPassword,
            role: role,
            email: email
        });

        await newUser.save();

        res.status(200).json({
            statusCode: 200,
            message: "User created successfully",
            data: {
                username: newUser.username,
                role: newUser.role,
                email: newUser.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Đăng nhập người dùng
// Đăng nhập người dùng bằng email
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm người dùng dựa trên email thay vì username
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                message: "Email does not exist",
                data: { email: email }
            });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                statusCode: 400,
                message: "Password is incorrect",
                data: { password: password }
            });
        }

        // Tạo token JWT
        const accessToken = jwt.sign(
            { username: user.username, role: user.role }, // vẫn có thể bao gồm username trong token nếu cần
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            statusCode: 200,
            message: "Login successful",
            username: user.username,
            token: accessToken,
            role: user.role
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { getAllUsers, registerUser, loginUser };
