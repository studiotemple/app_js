const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const upload = multer({storage: _storage});
const fs = require('fs');

app.use('/user', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');
app.get('/upload', (req, res) => {
  res.render('upload');
});
app.post('/upload', upload.single('userfile'), (req, res) => {
  console.log(req.file);
  res.send('uploaded : ' + req.file.filename);
});
app.get('/topic/new', (req, res) => {
  fs.readdir('data', (err, files) => {
    if(err){
      console.log(err);
      res.status(500).send('500 err');
    }
    res.render('new', {topics: files});
  });
});
app.post('/topic', (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, (err) => {
    if(err){
      console.log(err);
      res.status(500).send('500 err');
    }
    res.redirect('/topic/'+title);
  });
});
app.get(['/topic', '/topic/:id'], (req, res) => {
  fs.readdir('data', (err, files) => {
    if(err){
      console.log(err);
      res.status(500).send('500 err');
    }
    var id = req.params.id;
    if(id){
      // id use
      fs.readFile('data/'+id, 'utf8', (err, data) => {
        if(err){
          console.log(err);
          res.status(500).send('500 err');
        }
        res.render('view', {topics: files, title: id, description: data});
      });
    } else {
      // id not use
      res.render('view', {topics: files, title: 'Welcome', description: 'hello, how'});
    }
  });
});
// app.get('/topic/:id', (req, res) => {
//   var id = req.params.id;
//   fs.readdir('data', (err, files) => {
//     if(err){
//       console.log(err);
//       res.status(500).send('500 err');
//     }
//     fs.readFile('data/'+id, 'utf8', (err, data) => {
//       if(err){
//         console.log(err);
//         res.status(500).send('500 err');
//       }
//         res.render('view', {topics: files, title: id, description: data});
//     });
//   });
// });
app.listen(3000, (req, res) => {
  console.log('Conneted 3000 port...');
});
