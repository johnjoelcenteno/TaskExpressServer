const fs = require('fs');
const path = require('path');
const { poolPromise } = require('../src/utils/db.utils');

async function runSQLFile(sqlFileName) {
    try {
        const filePath = path.join(__dirname, sqlFileName);
        const sqlContent = fs.readFileSync(filePath, 'utf8');

        const pool = await poolPromise;

        await pool.request().batch(sqlContent);
        console.log('SQL file executed successfully.');
    } catch (err) {
        console.error('Error executing SQL file:', err);
    } finally {
        process.exit(0);
    }
}

runSQLFile('schema.sql');
