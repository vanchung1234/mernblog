const router = require('express').Router();
const User = require('../models/User');
const verifyToken = require('../middleware/auth');
const argon2 = require('argon2');

router.put('/:id', verifyToken, async(req, res) => {
    const { password, confirmpassword, Avatar } = req.body;
    if (password) {
        var hashPassword = await argon2.hash(password);
    }
    if (password.length < 4)
        return res.status(400).json({
            success: false,
            message: 'Độ dài mật khẩu tối thiểu là 4',
        });
    if (password != confirmpassword)
        return res.status(400).json({
            success: false,
            message: 'Nhập lại mật khẩu không đúng',
        });
    try {
        let updatedUser = {
            password: hashPassword,
            Avatar,
        };
        const userUpdateCondition = {
            _id: req.params.id,
            user: req.userId,
        };

        updatedUser = await User.findOneAndUpdate(
            userUpdateCondition,
            updatedUser, { new: true }
        );

        if (!updatedUser) {
            return res.status(401).json({
                success: false,
                message: 'Bạn không có quyền truy cập !!!',
            });
        }

        res.json({
            success: true,
            message: 'Cập nhật thành công!!!',
            user: updatedUser,
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