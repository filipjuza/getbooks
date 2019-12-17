function errorHandler(err, req, res, next) {
    console.log('***** Error handler kicked in *****');
    if (err.name === 'CastError') {
        return res.status(404).send('Not found');
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    if (typeof err === 'string') {
        return res.status(400).json({ message: err });
    }

    return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
