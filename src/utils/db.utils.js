const sql = require('mssql');
const config = require('./dbConfig');

// Create a pool instance for database connections
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        return pool;
    })
    .catch((err) => {
        console.error('Database Connection Failed!', err);
        process.exit(1);
    });

module.exports = {
    sql,        // Exporting the sql module for queries
    poolPromise // Exporting the pool instance
};
