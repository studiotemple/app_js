const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, renz`s world');
});
app.listen(80, function(){
    console.log('Conneted 80 port!');
});
