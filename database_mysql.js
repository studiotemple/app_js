var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'nirvana1998',
  database : 'os'
});

conn.connect();

// var sql = 'SELECT * FROM topic';
// conn.query(sql, (err, rows, fields) => {
//   if(err){
//     console.log(err);
//   } else {
//     for(var i=0; i<rows.length; i++){
//         console.log(rows[i].id);
//       console.log(rows[i].title);
//       console.log(rows[i].description);
//       console.log(rows[i].author);
//     }
//   }
// });
var sql = 'INSERT INTO topic (id, title, description, author) VALUES(?, ?, ?, ?)';
var params = ['2', 'hi-row', 'rowrow sleep', 'zam'];
conn.query(sql, params, (err, rows, feilds) => {
  if(err){
    console.log(err);
  } else {
    console.log(rows.insertId)
  }
});
// var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
// var params = ['NNPM', 'babobabo', 'lady', 1];
// conn.query(sql, params, (err, rows, feilds) => {
//   if(err){
//     console.log(err);
//   } else {
//     console.log(rows)
//   }
// });
// var sql = 'DELETE FROM topic WHERE id=?';
// var params = [1];
// conn.query(sql, params, (err, rows, feilds) => {
//   if(err){
//     console.log(err);
//   } else {
//     console.log(rows)
//   }
// });
conn.end();
