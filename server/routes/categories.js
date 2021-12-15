const Category = require('../models/Category');
const router = require('express').Router();
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, async(req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json('savedCat');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', verifyToken, async(req, res) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;