const { sql, poolPromise } = require('../utils/db.utils');

exports.GetUserByUsername = async (username) => {
    const pool = await poolPromise; // Get the connection pool
    const result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT UserId, Username, PasswordHash FROM Users WHERE username = @username');

    return result.recordset;
}

exports.GetUserById = async (userId) => {
    const pool = await poolPromise; // Get the connection pool
    const result = await pool.request()
        .input('UserId', sql.Int, userId)
        .query('SELECT UserId, Username, PasswordHash FROM Users WHERE UserId = @userId');

    return result.recordset[0];
}

exports.UpdateRefreshToken = async (userId, token) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('UserId', sql.Int, userId)
        .input('refreshToken', sql.VarChar, token)
        .query('UPDATE Users SET RefreshToken = @refreshToken WHERE UserId = @UserId');

    return result.rowsAffected;
}

exports.GetUserByRefreshToken = async (refreshToken) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('RefreshToken', refreshToken)
        .query(`SELECT RefreshToken, UserId FROM Users WHERE RefreshToken = @RefreshToken`);

    return result.recordset[0];
}



