const express = require('express');
const BookModel = require('../models/book.model');
const CategoryModel = require('../models/category.model');
const UserModel = require('../models/user.model');

const router = express.Router();

const getAll = async (req, res, next) => {
    try {
        const books = await BookModel.find({})
            .populate('user', '-password -role')
            .populate('category');

        return res.json(books);
    } catch (err) {
        return next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const book = await BookModel.findById(req.params.id)
            .populate('user', '-password -role')
            .populate('category');

        if (!book) {
            return res.status(404).send('Book was not found');
        }

        return res.json(book);
    } catch (err) {
        return next(err);
    }
};

const getBySlug = async (req, res, next) => {
    try {
        const book = await BookModel.findOne({ slug: req.params.slug })
            .populate('user', '-password -role')
            .populate('category');

        if (!book) {
            return res.status(404).send('Book was not found');
        }

        return res.json(book);
    } catch (err) {
        return next(err);
    }
};

const create = async (req, res, next) => {
    try {
        // TODO: Get user ID from JWT
        const { title, author, price, slug, user, category } = req.body;

        // Using Promise.all() to run the async DB calls concurrently
        const [existingUser, existingCategory, existingSlug] = await Promise.all([
            UserModel.findById(user, { password: 0 }),
            CategoryModel.findById(category),
            BookModel.findOne({ slug })
        ]);

        if (existingSlug) {
            return res.status(400).send('Slug is already in use');
        }

        // TODO: Get user ID from JWT
        if (!existingUser) {
            return res.status(404).send(`The specified user doesn't exist`);
        }

        if (!existingCategory) {
            return res.status(404).send(`The specified category doesn't exist`);
        }

        const book = new BookModel({
            title,
            author,
            price,
            slug,
            user,
            category
        });

        return res.json(await book.save());
    } catch (err) {
        return next(err);
    }
};

// Routes
router.get('/slug/:slug', getBySlug);
router.get('/:id', getById);
router.get('/', getAll);
router.post('/', create);

module.exports = router;
