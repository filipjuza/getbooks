const express = require('express');
const BookModel = require('../models/book.model');

const router = express.Router();

/**
 * Get all books
 */
router.get('/', async (req, res, next) => {
    try {
        const books = await BookModel.find({})
            .populate('user')
            .populate('category');

        res.json(books);
    } catch (err) {
        next(err);
    }
});
