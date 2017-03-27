const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const kfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var assert = require("assert");
var opts = {
  password: "helloworld"
};

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: 'babara',
  resave: false,
  saveUnintialized: true,
  store: new FileStore()
}));

app.get('/count', (req, res) => {
  if(req.session.count){
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send('count : '+req.session.count);
});

app.get('/auth/login', (req, res) => {
  var output = `
  <h1>로그인</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text" name="id" placeholder="아이디">
    </p>
    <p>
      <input type="password" name="password" placeholder="비밀번호">
    </p>
    <p>
      <input type="submit">
    </p>
    <a href="/auth/register">회원가입</a>
  </form>
  `;
  res.send(output);
});

app.post('/auth/login', (req, res) => {
  var id =req.body.id;
  var pwd = req.body.password;
  for(var i=0; i<members.length; i++){
    var user = members[i];
    if(uname === user.id) {
      return hasher({password:pwd, salt:user.salt}, function(err, pass, salt, hash){
        if(hash === user.password){
          req.session.nickname = user.nickname;
          req.session.save(function(){
            res.redirect('/welcome');
          });
        } else {
          res.send('babo <a href="/auth/login">로그인</a>');
        }
      });
    }
    // if(id === user.id && sha256(pwd+user.salt) === user.password){
    //   req.session.nickname = user.nickname;
    //   return req.session.save(function(){
    //     res.redirect('/welcome');
    //   });
    }
  }
  res.send('babo <a href="/auth/login">로그인</a>');
});
var salt = '!@#!@$!DFsdqwd@#FS!23aD';
var members = [
  {
    id: 'studiotemple',
    password: '9fa9cca12a28ab8afe286b3ef5a4aa74',
    salt:'!@#FS!@#!@R',
    nickname: 'renz'
  }
];

app.get('/auth/register', (req, res) => {
  var output = `
  <h1>회원가입</h1>
  <form action="/auth/register" method="post">
    <p>
      <input type="text" name="id" placeholder="아이디">
    </p>
    <p>
      <input type="password" name="password" placeholder="비밀번호">
    </p>
    <p>
      <input type="text" name="nickname" placeholder="닉네임">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  `;
  res.send(output);
});

app.post('/auth/register', (req, res) => {
  var user = {
    id:req.body.id,
    password:req.body.password,
    nickname:req.body.nickname
  };
  members.push(user);
  req.session.nickname = req.body.nickname;
  req.session.save(function(){
    res.redirect('/welcome');
  });
});

app.get('/welcome', (req, res) => {
  if(req.session.nickname){
    res.send(`
      <h1>안녕하세요, ${req.session.nickname}님</h1>
      <a href="/auth/logout">로그아웃</a>
    `);
  } else {
    res.send(`
      <h1>아이디 또는 비밀번호가 다릅니다.</h1>
      <a href="/auth/login">로그인</a>
      <a href="/auth/register">회원가입</a>
    `);
  }
});

app.get('/auth/logout', (req, res) => {
  delete req.session.nickname;
  res.redirect('/welcome');
});

app.listen(3002, () => {
  console.log('Conneted 3002 port!!');
});
