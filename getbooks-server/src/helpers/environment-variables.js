const { normalizePort } = require('./utils');

/**
 * Environment variables & default values
 */
module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'this_is_a_dev_only_secret',
    DATABASE_URL: process.env.MONGO_URL || 'mongodb://localhost/getbooks',
    SERVER_PORT: normalizePort(process.env.PORT || '4000')
};
