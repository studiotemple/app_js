const express = require('express');
const app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.locals.pretty = true;

app.set('view engine', 'jade');
app.set('views', 'views_file');
app.use(express.static('public_file'));
app.get('/topic/new', (req, res) => {
  res.render('new');
});


app.get('/template', (req, res) => {
  res.render('temp', {time: Date(),
    title: 'jade'
   });
});
app.get('/', function(req, res){
    res.send('Hello home page');;
});
app.get('/form', (req, res) => {
    res.render('form');
});
app.get('/form_receiver', (req, res) => {
  var title = req.query.title;
  var description = req.query.description;
  res.send(title + ',' + description);z
});
app.post('/form_receiver', (req, res) => {
  var title = req.body.title;
  var description= req.body.description;
  res.send(title + ',' + description);
});

app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
          ${lis}
        </ul>
        ${time}
    </body>
  </html>`;
  res.send(output);
});
app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/route.png">')
})
app.get('/login', function(req, res){
    res.send('<h1>Login please</h1>');
});
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});
