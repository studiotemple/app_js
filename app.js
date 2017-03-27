var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Hello, renz`s world');
});
app.listen(80, function(){
    console.log('Conneted 80 port!');
});
