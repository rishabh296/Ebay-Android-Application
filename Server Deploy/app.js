'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const https = require('https')
const request = require('request');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/singleitem', (req,res) => {
  var form = req.query
  var url = formURL(form)
  
  https.get(url, (resp) => {
    let data = ''
    resp.on('data', (chunk) =>{
      data+=chunk
    })
    resp.on('end', () => {
      res.json(JSON.parse(data))
      
    })
  })
});



function formURL(form){
  var entriesPerPage = 1000
  var prodId = form.prodId
  var url = "https://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=RishabhB-csci571-PRD-92eb6be68-f2def3d6&siteid=0&version=967&ItemID="+prodId+"&IncludeSelector=Description,Details,ItemSpecifics"
  return url
}


// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});