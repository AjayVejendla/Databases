var express = require('express');
var router = express.Router();
var queries = require('./queries.js');


router.get('/', function(req, res, next) {

    getBeers().then((results => {
        res.render('bar',{bars: results})

    }))
 
    
   

});

router.post('/', (req,res,next) => {

    bar = req.body["bar"]
    console.log(bar)

    getResults(bar).then(results =>{

        res.json(results)


    }).catch(err => {
        console.log(err)
    })
});


async function getResults(bar){
    try{
    console.log(bar)
    topSpenders= await queries.query("call topTenSpenders(" +'"'+ bar +'"'+ ");");
    topBeers = await queries.query("call topTenBeers(" +'"'+ bar +'"'+ ");");
    topManf = await queries.query("call topManfSales2(" +'"'+ bar +'"'+ ");");
    billsHours = await queries.query("call billsDistributionHour(" +'"'+ bar +'"'+ ");");
    billsDays = await queries.query("call billsDistributionDay(" +'"'+ bar +'"'+ ");");
    return [topSpenders,topBeers,topManf,billsDays,billsHours];
    }
    catch(err){

        console.log(err)

    }

}

async function getBeers(){


    return queries.query("SELECT name FROM Bar;")


}

module.exports = router;