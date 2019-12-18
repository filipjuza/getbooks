// Application imports
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');

// Custom middleware & utilities
const { DATABASE_URL, SERVER_PORT, JWT_SECRET } = require('./helpers/environment-variables');
const errorHandler = require('./helpers/error-handler');

// Controllers
const categoryController = require('./controllers/category.controller');
const userController = require('./controllers/user.controller');
const bookController = require('./controllers/book.controller');

const buildPath = path.resolve(__dirname, '..', '..', 'client', 'build');
// const publicRoutes = [
//     /^(?!\/api).*/gim,
//     '/api/user/authenticate',
//     '/api/user/create',
//     { url: /^(\/api\/category).*/gim, methods: ['GET'] },
//     { url: /^(\/api\/book).*/gim, methods: ['GET'] }
// ];
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(buildPath));
// app.use(expressJwt({ secret: JWT_SECRET }).unless({ path: publicRoutes }));

// CORS setup
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

// Routes
app.use('/api/category', categoryController);
app.use('/api/user', userController);
app.use('/api/book', bookController);

// Global error handling
app.use(errorHandler);

// Redirect non-api routes to React Router
app.get('/*', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));

// DB connection & server startup
mongoose
    .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        app.listen(SERVER_PORT);

        console.log(`getbooks-server running on port ${SERVER_PORT}`);
    })
    .catch(error => console.error(error));
