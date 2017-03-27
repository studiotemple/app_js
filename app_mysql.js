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

var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'nirvana1998',
  database : 'os'
});

conn.connect();

app.use('/user', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.locals.pretty = true;
app.set('views', './views_mysql');
app.set('view engine', 'jade');
app.get('/upload', (req, res) => {
  res.render('upload');
});
app.post('/upload', upload.single('userfile'), (req, res) => {
  console.log(req.file);
  res.send('uploaded : ' + req.file.filename);
});
app.get('/topic/add', (req, res) => {
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, (err, topics, fields) => {
    res.render('add', {topics: topics});
  });
  // fs.readdir('data', (err, files) => {
  //   if(err){
  //     console.log(err);
  //     res.status(500).send('500 err');
  //   }
  //   res.render('add', {topics: files});
  // });
});
app.post('/topic/add', (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
  var params = [title, description, author];
  conn.query(sql, params, (err, result, feilds) => {
    if(err){
      console.log(err);
      res.status(500).send('500 err');
    } else {
      res.redirect('/topic/'+result.insertId);
    }
  });
  // fs.writeFile('data/'+title, description, (err) => {
  //   if(err){
  //     console.log(err);
  //     res.status(500).send('500 err');
  //   }
  //   res.redirect('/topic/'+title);
  // });
});

app.get(['/topic/:id/edit'], (req, res) => {
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, (err, topics, fields) => {
    var id = req.params.id;
    if(id){
      var sql = 'SELECT * FROM topic WHERE id=?'
      conn.query(sql, [id], (err, topic, field) => {
        if(err){
          console.log(err);
          res.status(500).send('500 err');
          //   }
        } else {
          res.render('edit', {topics: topics, topic:topic[0]});
        }
      });
    } else {
      console.log('there is no id');
      res.status(500).send('500 err');
      res.render('view', {topics: topics});
    }
  });
});

app.post('/topic/:id/edit', (req, res)=> {
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = req.params.id;
  var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
  var params = [title, description, author, id];
  conn.query(sql, params, (err, result, feilds) => {
    if(err){
      console.log(err);
      res.status(500).send('500 err');
    } else {
      res.redirect('/topic/'+id);
    }
  });
});

app.get('/topic/:id/delete', (req, res)=> {
  var sql = 'SELECT id, title FROM topic';
  var id = req.params.id;
  conn.query(sql, (err, topics, fields) => {
    var sql ='SELECT * FROM topic WHERE id=?';
    conn.query(sql, id, (err, topic) => {
      if(err){
        console.log(err);
        res.status(500).send('500 err');
      } else {
        if(topic.length === 0){
          console.log('there is no record');
          res.status(500).send('500 err');
        } else {
          res.render('delete', {topics:topics, topic:topic[0]});
        }

      }
    });
  });

});

app.post('/topic/:id/delete', (req, res) => {
  var id = req.params.id;
  var sql = 'DELETE FROM topic WHERE id=?';
  conn.query(sql, id, (err, result, feilds) => {
    if(err){
      console.log(err);
      res.status(500).send('500 err');
    } else {
      res.redirect('/topic');
    }
  });
});

app.get(['/topic', '/topic/:id'], (req, res) => {
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, (err, topics, fields) => {
    var id = req.params.id;
    if(id){
      var sql = 'SELECT * FROM topic WHERE id=?'
      conn.query(sql, [id], (err, topic, field) => {
        if(err){
          console.log(err);
          res.status(500).send('500 err');
          //   }
        } else {
          res.render('view', {topics: topics, topic:topic[0]});
        }
      });
    } else {
      res.render('view', {topics: topics});
    }
  });
});

app.listen(3000, (req, res) => {
  console.log('Conneted 3000 port...');
});
