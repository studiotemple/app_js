const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: 'babara',
  resave: false,
  saveUnintialized: true
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
  </form>
  `;
  res.send(output);
});

app.post('/auth/login', (req, res) => {
  var user = {
    id: 'studiotemple',
    password: 'nirvana1998',
    nickname: 'renz'
  }
  var id =req.body.id;
  var pwd = req.body.password;
  if(id === user.id && pwd === user.password){
    req.session.nickname = user.nickname;
    res.redirect('/welcome');
  } else {
    res.send('babo <a href="/auth/login">로그인</a>');
  }
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
    `);
  }
});

app.get('/auth/logout', (req, res) => {
  delete req.session.nickname;
  res.redirect('/welcome');
});

app.listen(3003, () => {
  console.log('Conneted 3003 port!!');
});
