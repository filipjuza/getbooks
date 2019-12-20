const express = require('express');
const CategoryModel = require('../models/category.model');
const BookModel = require('../models/book.model');

const router = express.Router();

/**
 * Get all categories
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAll = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find({});

        return res.json(categories);
    } catch (err) {
        return next(err);
    }
};

/**
 * Get category by slug
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getBySlug = async (req, res, next) => {
    try {
        const category = await CategoryModel.findOne({ slug: req.params.slug });
        console.log(category);

        if (!category) {
            return res.status(404).send('Category was not found');
        }

        return res.json(category);
    } catch (err) {
        return next(err);
    }
};

/**
 * Create category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = async (req, res, next) => {
    try {
        const { name, slug } = req.body;

        const existingSlug = await CategoryModel.findOne({ slug });

        if (existingSlug) {
            return res.status(400).send('Slug is already in use');
        }

        const category = new CategoryModel({
            name,
            slug
        });

        return res.json(await category.save());
    } catch (err) {
        return next(err);
    }
};

/**
 * Get books in category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getBooks = async (req, res, next) => {
    try {
        const category = await CategoryModel.findOne({ slug: req.params.slug });

        if (!category) {
            return res.status(404).send('Category was not found');
        }

        const books = await BookModel.find({ category }).populate('user', '-password -role');
        return res.json(books);
    } catch (err) {
        return next(err);
    }
};

/**
 * Routes
 */
router.get('/:slug/book', getBooks);
router.get('/:slug', getBySlug);
router.get('/', getAll);
router.post('/', create);

module.exports = router;
