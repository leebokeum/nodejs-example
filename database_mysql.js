var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'leebokeum.cbpocbpweegy.ap-northeast-2.rds.amazonaws.com',
    user     : 'leebokeum',
    password : 'dlqhrdma1',
    database : 'leebokeum'
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });

  var sql = "SELECT * FROM user";
  connection.query(sql, function (error, rows, fields) {
    if (error){
        throw error
    } 
    else{
        console.log('rows', rows);
        console.log('fields', fields);
    }
  });

  //접속끊기
  connection.end();