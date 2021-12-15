const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const Post = require('../models/Post')
    //get posts private

router.get('/mypost', verifyToken, async(req, res) => {
    try {
        const posts = await Post.find({
            user: req.userId,
        }).populate('user', ['username']);
        res.json({ success: true, posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

//get all post
router.get('/', verifyToken, async(req, res) => {
    const Query = req.query.categories;
    try {
        if (Query) {
            const posts = await Post.find({
                categories: Query,
            }).populate('user', ['username']);
            res.json({ success: true, posts });
        } else {
            const posts = await Post.find({}).populate('user', [
                'username',
            ]);
            res.json({ success: true, posts });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

//create post
router.post('/', verifyToken, async(req, res) => {
    const { name, desc, photo, categories } = req.body;

    try {
        const newPost = new Post({
            name,
            desc,
            photo,
            categories,
            user: req.userId,
        });

        await newPost.save();
        res.json({
            success: true,
            message: 'Tạo Post thành công',
            post: newPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

//update
router.put('/:id', verifyToken, async(req, res) => {
    const { name, desc, photo, categories } = req.body;

    try {
        let updatedPost = {
            name,
            desc,
            photo,
            categories,
        };
        const postUpdateCondition = {
            _id: req.params.id,
            user: req.userId,
        };

        updatedPost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatedPost, { new: true }
        );
        if (!updatedPost)
            return res.status(401).json({
                success: false,
                message: 'Không thấy post hoặc bạn không có quyền',
            });

        res.json({
            success: true,
            message: 'Cập nhật thành cmn công!',
            post: updatedPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

//delete
router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const postDeleteCondition = {
            _id: req.params.id,
            user: req.userId,
        };
        const deletePost = await Post.findOneAndDelete(
            postDeleteCondition
        );

        if (!deletePost) {
            return res.status(401).json({
                success: false,
                message: 'Không thấy post hoặc bạn không có quyền',
            });
        }
        res.json({ success: true, post: deletePost });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});
module.exports = router;