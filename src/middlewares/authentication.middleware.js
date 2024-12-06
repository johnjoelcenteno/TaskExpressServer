require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, claims) => {
        if (err) {
            return res.sendStatus(401);
        }

        req.claims = claims;
        next();
    });
}