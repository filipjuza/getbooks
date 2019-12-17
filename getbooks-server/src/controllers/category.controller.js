const express = require('express');
const CategoryModel = require('../models/category.model');

const router = express.Router();

const getAll = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find({});

        res.json(categories);
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const category = await CategoryModel.findById(req.params.id);

        if (!category) {
            res.status(404).send('Category was not found');
        } else {
            res.json(category);
        }
    } catch (err) {
        next(err);
    }
};

const getBySlug = async (req, res, next) => {
    try {
        const category = await CategoryModel.find({ slug: req.body.slug });

        if (!category) {
            res.status(404).send('Category was not found');
        } else {
            res.json(category);
        }
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const category = new CategoryModel({
            name: req.body.name,
            slug: req.body.slug
        });

        res.json(await category.save());
    } catch (err) {
        next(err);
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
router.get('/', getAll);
router.get('/:id', getById);
router.get('/slug/:slug', getBySlug);
router.post('/', create);

module.exports = router;
