// Application imports
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// Custom middleware & utilities
const errorHandler = require('./helpers/error-handler');
const utils = require('./helpers/utils');

// Controllers

const port = utils.normalizePort(process.env.PORT || '4000');
const databaseUrl = process.env.MONGO_URL || 'mongodb://localhost/getbooks';
const buildPath = path.resolve(__dirname, '..', '..', 'client', 'build');
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(buildPath));

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

// Global error handling
app.use(errorHandler);

// Routes
app.get('/*', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));

// DB connection & server startup
mongoose
    .connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        app.listen(port);

        console.log(`getbooks-server running on port ${port}`);
    })
    .catch(error => console.error(error));
