function errorHandler(err, req, res) {
    if (err.name === 'CastError') {
        res.status(404).send('Question was not found.');
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid Token' });
    }

    if (typeof err === 'string') {
        return res.status(400).json({ message: err });
    }

    return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
