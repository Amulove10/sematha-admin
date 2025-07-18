const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD

})

module.exports = db