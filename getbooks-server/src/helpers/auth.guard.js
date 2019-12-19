const expressJwt = require('express-jwt');
const { JWT_SECRET } = require('../helpers/environment-variables');

/**
 * Inspired by https://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api
 * as well as my previous Angular projects https://pastebin.com/rYb1t8nj (Angular AuthGuard)
 */
const authGuard = (roles = []) => {
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
};

module.exports = authGuard;
