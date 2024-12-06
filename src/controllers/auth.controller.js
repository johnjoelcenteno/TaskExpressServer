require('dotenv').config();
const jwt = require('jsonwebtoken');
const { loginGenerateTokens, logout, GenerateAccessTokenByRefreshToken } = require('../services/auth.services');

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const { refreshToken, accessToken } = await loginGenerateTokens(username, password);
        return res.send({ accessToken, refreshToken });
    } catch (error) {
        next(error);
    }
}

exports.logout = async (req, res, next) => {
    try {
        const userId = req.claims.UserId;
        await logout(userId);

        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
}

exports.token = async (req, res, next) => {
    try {
        const token = req.body.token;
        const accessToken = await GenerateAccessTokenByRefreshToken(token);
        return res.send(accessToken);
    } catch (error) {
        next(error);
    }
}
