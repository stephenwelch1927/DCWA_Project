//Require Imports
var express = require('express');
var myCountries = require('./countries');
var myHeadsOfState = require('./headsOfState');
var myCities = require('./cities');
var myAddCountry = require('./addCountry');
var myDeleteCountry = require('./deleteCountry');
var myUpdateCountry = require('./editCountry');
var bodyParser = require('body-parser');
const { body, validationResult, check } = require('express-validator');

//Set view engine to use ejs
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

//App.get to route to the home page
app.get('/', (req, res) => {
    console.log("GET on /");
    res.render('home');
});

//App.get to route to addCountry
app.get('/addCountry', (req, res) => {
    console.log("GET on /");
    res.render('addCountry');

});

//App.post to add a country 
app.post('/addCountry',[check('code').isLength({min:3, max:3}).withMessage("Country Code Must Be At Least 3 Characters")], 
(req, res)=>{
    myAddCountry.addCountryDetails(req.body.code, req.body.name, req.body.description)
    var errors = validationResult(req)
    .then((result) => {
        res.redirect('/countries')
    })
    .catch((error) => {
        console.log(error)
        res.send("Not ok")
    })
})

//App.get to route to the delete page
app.get('/delete/:code', (req, res) => {
    myDeleteCountry.deleteCountryDetails(req.params.code)
    .then((result) => {
        res.redirect('/countries')
    })
    .catch((error) => {
        res.send("Error in deletion")
    })
});
//App.get retrives the data from function in countries.js
app.get('/countries', (req, res) => {
    myCountries.countryDetails()
        .then((result) => {
            res.render('countries', { country: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//App.get that retrives all city data
app.get('/cities', (req, res) => {
    myCities.cityDetails()
        .then((result) => {
            res.render('cities', { cities: result })
        })
        .catch((error) => {
            res.send(error)
        })
})


//App.get retrives data from mongodb and displays it
app.get('/headOfState', (req, res) => {
    myHeadsOfState.getHeadsOfState()
        .then((documents) => {
            res.render('headsOfState', { stateData: documents });
        })
        .catch((error) => {
            res.send(error)
        })

})
//App.get to retrieve info for editCOuntry
app.get('/editCountry/:code', (req,res) => {
    var check = req.params.code
    myCountries.countryDetails()
        .then((result) =>{
            result.forEach(country => {
                if(check == country.code){
                    res.render('edit', {errors: undefined, code: code, name: country.co_name, co_details: country.co_details})
                }
            
            })
        })
        .catch((error) => {
            console.log(error)
        })

})
//Updating the country details
app.post('/editCountry/:code',
[check('code').custom((value, {req}) => {
    if (value !== req.params.code){
        console.log(req.params.code)
        throw new Error("Country Code Cannot Change Value")
    }else {return true}
}),
check('name').isLength({min: 3}).withMessage("Country Name Must Be At Least 3 Characters")
], (req, res) => {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render('edit', {errors: errors.errors, code: req.params.code, name: req.body.name, details: req.body.details})
    }else{
        myUpdateCountry.editCountryDetails(req.body.code, req.body.name, req.body.details)
        .then((result) => {
            res.redirect('/countries')
        })
        .catch((error) => {
            res.send(error)
        })
    }
})

//App.get to naigate to headsofstate
app.get('/addHeadOfState', (req, res) => {
    res.render('addHeadOfState')
})

//app.post updates the head of state page
app.post('/addHeadOfState', (req, res) => {
    myHeadsOfState.addHeadsOfState(req.body.id, req.body.name)
        .then((result) => {
            res.redirect('/headOfState')
        })
        .catch((error) => {
            console.log(error)
            res.send("Not ok")
        })
})
//App.get that retrives all details
app.get('/allDetails/:code', (req, res) => {
    myCities.getAllDetails(req.params.code)
        .then((result) => {
            console.log("Details Ok")
            res.render('allDetails', { allDetail: result})
        })
        .catch((error) => {
            res.send(error)
        })
})



//App set up to listen on port 3000
app.listen(3000, () => {
    console.log("Listening on Port 3000");
});