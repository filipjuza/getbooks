const express = require('express');
const BookModel = require('../models/book.model');

const router = express.Router();

const getAll = async (req, res, next) => {
    try {
        const books = await BookModel.find({})
            .populate('user', '-password -role')
            .populate('category');

        res.json(books);
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const book = await BookModel.findById(req.params.id)
            .populate('user', '-password -role')
            .populate('category');

        if (!book) {
            res.status(404).send('Book was not found');
        } else {
            res.json(book);
        }
    } catch (err) {
        next(err);
    }
};

const getBySlug = async (req, res, next) => {
    try {
        const book = await BookModel.findOne({ slug: req.body.slug })
            .populate('user', '-password -role')
            .populate('category');

        if (!book) {
            res.status(404).send('Book was not found');
        } else {
            res.json(book);
        }
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const { title, author, price, slug, user, category } = req.body;
        const book = new BookModel({
            title,
            author,
            price,
            slug,
            user,
            category
        });

        res.json(await book.save());
    } catch (err) {
        next(err);
    }
};

// Routes
router.get('/slug/:slug', getBySlug);
router.get('/:id', getById);
router.get('/', getAll);
router.post('/', create);

module.exports = router;
