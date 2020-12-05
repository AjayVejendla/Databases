var express = require('express');
var router = express.Router();
var queries = require('./queries.js');


router.get('/', function(req, res, next) {

    getBeers().then((results => {
        res.render('beer',{beers: results})

    }))
 
    
   

});

router.post('/', (req,res,next) => {

    beer = req.body["beer"]

    getResults(beer).then(results =>{

        res.json(results)


    })
});


async function getResults(beer){
    console.log(beer)
    topSellers = await queries.query("call topFiveSellerOfBeer(" +'"'+ beer +'"'+ ");");
    topConsumers = await queries.query("call topDrinkerOfBeer(" +'"'+ beer +'"'+ ");");
    topSales = await queries.query("call beerDistributionDay(" +'"'+ beer +'"'+ ");");
    return [topSellers,topConsumers,topSales];

}

async function getBeers(){


    return queries.query("SELECT name FROM Beer;")


}

module.exports = router;