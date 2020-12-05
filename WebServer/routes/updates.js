var express = require('express');
var router = express.Router();
var queries = require('./queries.js');

router.get('/', function(req, res, next) {

    res.render('updates')
   

});

router.post('/', (req,res,next) => {
    queryInput = req.body["query"]

    //queryInput = sanitizeQuotes(queryInput);

    queries.query(
        queryInput
    ).then(results =>{
        console.log(results)
        if(results.length == 0){
            res.json("Success!")
        }
        else{
            try{
            res.json(results.info['msg'].split('(',1)[0])
            }

            catch{
            res.json(results)
            }
        }
    }
    )
});


function sanitizeQuotes(input){
    return input.replace(/"/g, '\\"');
}



module.exports = router;