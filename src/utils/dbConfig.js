require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_SERVER, DB } = process.env;
const config = {
    user: DB_USER,      // MSSQL username
    password: DB_PASSWORD,  // MSSQL password
    server: DB_SERVER,      // Server name or IP address
    database: DB,  // Database name
    options: {
        encrypt: true,           // Required for Azure (change as needed)
        trustServerCertificate: true, // For local development
    },
    port: 1433,                // Default MSSQL port
};

module.exports = config;

