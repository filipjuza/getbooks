const express = require('express');
const CategoryModel = require('../models/category.model');

const router = express.Router();

const getAll = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find({});

        return res.json(categories);
    } catch (err) {
        return next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const category = await CategoryModel.findById(req.params.id);

        if (!category) {
            return res.status(404).send('Category was not found');
        }

        return res.json(category);
    } catch (err) {
        return next(err);
    }
};

const getBySlug = async (req, res, next) => {
    try {
        const category = await CategoryModel.findOne({ slug: req.params.slug });

        if (!category) {
            return res.status(404).send('Category was not found');
        }

        return res.json(category);
    } catch (err) {
        return next(err);
    }
};

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

const bootstrap = async () => {
    const categories = [
        {
            name: 'Programming',
            slug: 'programming'
        },
        {
            name: 'Physics',
            slug: 'physics'
        },
        {
            name: 'Marketing',
            slug: 'marketing'
        }
    ];
    const promises = [];

    categories.forEach(category => {
        const newCategory = new CategoryModel(category);

        promises.push(newCategory.create());
    });

    return Promise.all(promises);
};

// Routes
router.get('/slug/:slug', getBySlug);
router.get('/:id', getById);
router.get('/', getAll);
router.post('/', create);

module.exports = router;
