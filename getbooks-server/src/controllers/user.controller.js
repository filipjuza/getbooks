const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const Role = require('../helpers/role');

const router = express.Router();
const { JWT_SECRET } = require('../helpers/environment-variables');

/**
 * Get all users (admin only)
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAll = async (req, res, next) => {
    try {
        const users = await UserModel.find(
            {},
            {
                password: 0
            }
        );

        return res.json(users);
    } catch (err) {
        return next(err);
    }
};

/**
 * Get user by ID (admin only)
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getById = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id, {
            password: 0
        });

        if (!user) {
            return res.status(404).send('User was not found.');
        }
        return res.json(user);
    } catch (err) {
        return next(err);
    }
};

/**
 * Create user (account registration)
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send('Username, email, or password was not specified');
        }

        const existingUsers = await UserModel.find(
            {
                $or: [
                    {
                        email
                    },
                    {
                        username
                    }
                ]
            },
            {
                password: 0
            }
        );

        if (existingUsers.length) {
            if (existingUsers.some(u => u.username === username)) {
                return res.status(400).send('Username not available');
            }

            if (existingUsers.some(u => u.email === email)) {
                return res.status(400).send('Email already in use');
            }
        }

        return bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return next(err);
            }

            const newUser = new UserModel({
                username,
                email,
                password: hash,
                role: Role.User
            });
            const savedUser = await newUser.save();

            return res.json({
                username: savedUser.username,
                email: savedUser.email,
                role: savedUser.role
            });
        });
    } catch (err) {
        return next(err);
    }
};

/**
 * Authenticate user
 * @param {*} req
 * @param {*} res
 * @returns {String} — JWT token
 */
const authenticate = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username or password was not specified');
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.status(401).send('Invalid credentials');
    }

    return bcrypt.compare(password, user.password, (err, success) => {
        if (success) {
            const token = jwt.sign(
                {
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
                JWT_SECRET,
                {
                    expiresIn: '12h'
                }
            );

            return res.json({ token });
        }

        return res.status(401).send('Invalid credentials');
    });
};

/**
 * Routes
 */
router.post('/authenticate', authenticate);
router.get('/:id', getById);
router.get('/', getAll);
router.post('/', create);

module.exports = router;
