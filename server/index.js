require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const app = express();
const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');
const categoryRoute = require('./routes/categories');
const userRouter = require('./routes/user');
const multer = require('multer');
const path = require('path');
const cors = require('cors')

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.4b3ji.mongodb.net/MernBlog?retryWrites=true&w=majority
          `, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        );
        console.log('MongoDb connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

connectDB();

app.use(cors())
app.use(express.json());
app.use(
    '/images',
    express.static(path.join(__dirname, '/images'))
);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post(
    '/api/upload',
    upload.single('file'),
    (req, res) => {
        res.status(200).json('File has been uploaded');
    }
);

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/categories', categoryRoute);
app.use('/api/user', userRouter);

app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`)
);