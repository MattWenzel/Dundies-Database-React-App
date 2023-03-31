// db-connector.js code adapted from the osu-cs340-ecampus nodejs-starter-app:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/database/db-connector.js

const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_wenzelma',
    password: '****',
    database: 'cs340_wenzelma'
});

module.exports.pool = pool;