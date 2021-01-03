var mysql = require('promise-mysql');
var pool;

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
    
    //Function that gets data from the database
    var countryDetails = function () {
    return new Promise((resolve, reject) => {
        pool.query('select co_code, co_name, co_details from country')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    module.exports = { countryDetails }