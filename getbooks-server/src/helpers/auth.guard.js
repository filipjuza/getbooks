const expressJwt = require('express-jwt');
const { JWT_SECRET } = require('../helpers/environment-variables');

function authGuard(roles = []) {
    let permittedRoles = roles;

    if (typeof roles === 'string') {
        permittedRoles = [roles];
    }

    return [
        expressJwt({ JWT_SECRET }),
        (req, res, next) => {
            if (permittedRoles.length && !permittedRoles.includes(req.user.role)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            return next();
        }
    ];
}

module.exports = authGuard;
