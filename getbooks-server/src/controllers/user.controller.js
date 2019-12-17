const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const Role = require('../helpers/role');

const router = express.Router();
const { JWT_SECRET } = require('../helpers/environment-variables');

const getAll = async (req, res, next) => {
    try {
        const users = await UserModel.find(
            {},
            {
                password: 0
            }
        );

        res.json(users);
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id, {
            password: 0
        });

        if (!user) {
            res.status(404).send('User was not found.');
        } else {
            res.json(user);
        }
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).send('Username, email, or password was not specified');

            return;
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
                res.status(400).send('Username not available');
            } else if (existingUsers.some(u => u.email === email)) {
                res.status(400).send('Email already in use');
            }
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                const newUser = new UserModel({
                    username,
                    email,
                    password: hash,
                    role: Role.User
                });
                const savedUser = await newUser.save();

                res.json({
                    username: savedUser.username,
                    email: savedUser.email,
                    role: savedUser.role
                });
            });
        }
    } catch (err) {
        next(err);
    }
};

const authenticate = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send('Email or password was not specified');

        return;
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
        res.status(404).send('User not found');

        return;
    }

    bcrypt.compare(password, user.password, (err, success) => {
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

            res.json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
};

// Routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.post('/authenticate', authenticate);

module.exports = router;
