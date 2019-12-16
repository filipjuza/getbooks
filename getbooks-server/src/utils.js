function normalizePort(portNumber) {
    const port = parseInt(portNumber, 10);

    if (Number.isNaN(port)) {
        // named pipe
        return portNumber;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

module.exports = {
    normalizePort
};
