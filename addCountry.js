const { Code } = require('mongodb');
var mysql = require('promise-mysql');
var pool;
const { body, validationResult } = require('express-validator');

mysql.createPool({
    connectionLimit    : 10,
    host               : 'localhost',
    user               : 'root',
    password           : 'bluebirds1927',
    database           : 'geography'
})
    .then((result) => {
        pool = result;
    })
    .catch((error) => {
        console.log(error);
    })
    
    //Function that inserts new data into the database
    var addCountryDetails = function (code, name, description) {
    return new Promise((resolve, reject) => {
        var addQuery = {
            sql : 'insert into country (co_code, co_name, co_details) VALUES (?, ?, ?)',
            values:[code, name, description]
        }
        pool.query(addQuery)    
        .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    module.exports = { addCountryDetails }