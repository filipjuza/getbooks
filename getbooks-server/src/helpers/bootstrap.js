const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model');
const CategoryModel = require('../models/category.model');
const BookModel = require('../models/book.model');
const Role = require('../helpers/role');

/**
 * Generate dummy users
 */
const bootstrapUsers = async () => {
    const promises = [];
    const users = [
        {
            username: 'filip',
            email: 'filip.juza@gmail.com',
            password: 'shrek'
        },
        {
            username: 'admin',
            email: 'filip.juza1@gmail.com',
            password: 'admin',
            role: Role.Admin
        },
        {
            username: 'Marc88',
            email: 'filip.juza2@gmail.com',
            password: 'fortnite'
        }
    ];

    users.forEach(user => {
        /**
         * Hashing synchronously to avoid race conditions (since books depend on users – see app.js:88)
         */
        const hash = bcrypt.hashSync(user.password, 10);

        const newUser = new UserModel({
            username: user.username,
            email: user.email,
            password: hash,
            role: user.role || Role.User
        });

        promises.push(newUser.save());
    });

    return Promise.all(promises);
};

/**
 * Generate dummy categories
 */
const bootstrapCategories = async () => {
    const promises = [];
    const categories = [
        {
            name: 'Javascript',
            slug: 'javascript'
        },
        {
            name: 'Marketing',
            slug: 'marketing'
        },
        {
            name: 'Philosophy',
            slug: 'philosophy'
        }
    ];

    categories.forEach(category => {
        const newCategory = new CategoryModel({
            name: category.name,
            slug: category.slug
        });

        promises.push(newCategory.save());
    });

    return Promise.all(promises);
};

/**
 * Generate dummy books — dependent on users & categories
 */
const bootstrapBooks = async (users, categories) => {
    const promises = [];
    const books = [
        {
            title: `You don't know JS`,
            author: 'Some Dude',
            price: '399',
            slug: 'you-dont-know-js',
            image: `https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`,
            user: users[0].id,
            category: categories[0].id
        },
        {
            title: `Free real estate`,
            author: 'Hick Dertz',
            price: '69',
            slug: 'free-real-estate',
            image: `https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`,
            user: users[0].id,
            category: categories[1].id
        },
        {
            title: `Top 100 frameworks in 2020`,
            author: 'Guy Designer',
            price: '420',
            slug: 'top-100-frameworks-2020',
            image: `https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`,
            user: users[1].id,
            category: categories[0].id
        }
    ];

    books.forEach(book => {
        const newBook = new BookModel({
            title: book.title,
            author: book.author,
            price: book.price,
            slug: book.slug,
            image: book.image,
            user: book.user,
            category: book.category
        });

        promises.push(newBook.save());
    });

    return Promise.all(promises);
};

module.exports = {
    bootstrapUsers,
    bootstrapCategories,
    bootstrapBooks
};
