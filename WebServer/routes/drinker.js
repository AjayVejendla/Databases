var express = require('express');
var router = express.Router();
var queries = require('./queries.js');

/* GET home page. */
router.get('/', function(req, res, next) {
 
    res.render('drinker')
   

});

router.post('/', (req,res,next) => {

    drinker = req.body["name"]

    getResults(drinker).then(results =>{

        console.log(results)
        res.json(results)


    })
});


async function getResults(drinker){

    drinker = '"' + drinker + '"'

    transactions = await queries.query("call getTransactions(" + drinker + ");")
    spendingDays = await queries.query("call spendingPerBarDay(" + drinker + ");")
    spendingMonths = await queries.query("call spendingPerBarMonth(" + drinker + ");")
    topBeers = await queries.query("call drinkerTopBeers(" + drinker + ");")
    
    return [transactions,spendingDays,spendingMonths,topBeers]

};

module.exports = router;