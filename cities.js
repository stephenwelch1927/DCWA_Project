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
    var cityDetails = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from city')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
    //Function that get all details from mySql
    var getAllDetails = function(cty_code){
        return new Promise((resolve, reject) =>{
           var cityQuery ={
               sql: "SELECT * from city LEFT JOIN country on city.co_code = country.co_code WHERE cty_code = ?",
               values: [cty_code]
           }
           pool.query(cityQuery)
           .then((result) => {
               resolve(result)
           })
           .catch((error) =>{
               reject(error)
           }) 
        })
    }

    module.exports = {cityDetails, getAllDetails }