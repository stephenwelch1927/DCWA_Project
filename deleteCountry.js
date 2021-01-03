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
    
    //Function that deletes data
    var deleteCountryDetails = function (co_code) {
    return new Promise((resolve, reject) => {
        var deleteQuery = {
            sql : 'DELETE FROM country WHERE co_code = ?',
            values:[co_code]
        }
        pool.query(deleteQuery)    
        .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    module.exports = { deleteCountryDetails }