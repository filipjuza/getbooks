/**
 * Global error-handling middleware.
 * Note that the "next" parameter is required, even if it's not used
 * (express requires this specific signature from error handlers).
 * https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
const errorHandler = (err, req, res, next) => {
    console.log('***** Error handler kicked in *****');

    /**
     * CastErrors (ObjectID in an incorrect format) are handled as 404's
     */
    if (err.name === 'CastError') {
        return res.status(404).send('Not found');
    }

    if (err.name === 'UnauthorizedError') {
        console.log(err);
        return res.status(401).json({ message: 'Invalid token' });
    }

    if (typeof err === 'string') {
        return res.status(400).json({ message: err });
    }

    return res.status(500).json({ message: err.message });
};

module.exports = errorHandler;
