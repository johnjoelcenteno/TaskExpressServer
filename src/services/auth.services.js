require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomErr = require('../utils/CustomError.utils')

const { GetUserByUsername, UpdateRefreshToken, GetUserByRefreshToken, GetUserById } = require('../models/Users.model');


function generateAccessToken(claims) {
    const expiresIn = process.env.ACCESS_TOKEN_VALIDITY;
    return jwt.sign(claims, process.env.ACCESS_TOKEN, { expiresIn });
}

function generateRefreshToken(claims) {
    return jwt.sign(claims, process.env.REFRESH_TOKEN);
}

exports.loginGenerateTokens = async (username, password) => {
    const userRecordSet = await GetUserByUsername(username);

    if (!userRecordSet.length) throw new CustomErr('Invalid username', 400);

    const { UserId, Username, PasswordHash } = userRecordSet[0];

    const passwordMatched = await bcrypt.compare(password, PasswordHash);
    if (!passwordMatched) throw new CustomErr('Invalid password', 401);

    const claims = { name: username, UserId };

    const accessToken = generateAccessToken(claims);
    const refreshToken = generateRefreshToken(claims);

    await UpdateRefreshToken(UserId, refreshToken);
    return { accessToken, refreshToken };
}

exports.logout = async (userId) => {

    const { UserId } = await GetUserById(userId);
    if (!UserId) throw new CustomErr("Unauthorized", 401);

    await UpdateRefreshToken(UserId, null);
}

exports.GenerateAccessTokenByRefreshToken = async (token) => {
    const response = await GetUserByRefreshToken(token);
    if (!response) throw new CustomErr("Unauthorized", 401); // refreshToken is already removed (logout)

    if (!token) throw new CustomErr("Invalid token request", 401);

    return jwt.verify(token, process.env.REFRESH_TOKEN, (err, claims) => {
        if (err) throw new CustomErr("Unauthorized", 401);

        const accessToken = generateAccessToken({ name: claims.name, UserId: response?.UserId });
        return { accessToken };
    });
}