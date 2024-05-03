const Pool = require('pg').Pool;
const config = require('../../env');

const pool = new Pool({
    user: config.dbUser,
    host: config.dbHost,
    database: config.dbDatabase,
    password: config.dbPassword,
    port: config.dbPort
})

module.exports = pool;