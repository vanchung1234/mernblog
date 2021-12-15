const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');

const User = require('../models/User');

router.get('/', verifyToken, async(req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async(req, res) => {
    const { username, password, confirmpassword } = req.body;

    if (password != confirmpassword)
        return res.status(400).json({
            success: false,
            message: 'Nhập lại mật khẩu không đúng',
        });

    if (password.length < 4)
        return res.status(400).json({
            success: false,
            message: 'Độ dài mật khẩu tối thiểu là 4',
        });

    try {
        // Check for existing user
        const user = await User.findOne({ username });

        if (user)
            return res.status(400).json({
                success: false,
                message: 'Người dùng tồn tại',
            });

        // All good
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
            username,
            password: hashedPassword,
        });
        await newUser.save();

        res.json({
            success: true,
            message: 'User created successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        // Check for existing user
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'Sai tên đăng nhập hoặc mật khẩu',
            });

        // Username found
        const passwordValid = await argon2.verify(
            user.password,
            password
        );
        if (!passwordValid)
            return res.status(400).json({
                success: false,
                message: 'Sai tên đăng nhập hoặc mật khẩu',
            });

        // All good
        // Return token
        const accessToken = jwt.sign({ userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: 'User logged in successfully',
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});
module.exports = router;