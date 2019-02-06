var OrientDB = require('orientjs');

var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'dlqhrdma1'
});

var db = server.use('demodb')
console.log('Using Database:'  + db.name);

/*
    C, R, U, D
*/

// CREATE
/*
var sql = 'SELECT FROM topic';
db.query(sql).then(function(results){
     console.log(results);
});
var sql = 'SELECT FROM topic WHERE @rid=:id';
var param = {
    params:{
        id:'#233:0'
    }
};
db.query(sql, param).then(function(results){
     console.log(results);
});
*/
// INSERT
var sql = "INSERT INTO topic (title, description) VALUES(:title, :desc)";
db.query(sql, {
    params:{
        title:'Express',
        desc:'Express is framework for web'
    }
}).then(function(results){
    console.log(results);
});
/*
// UPDATE
var sql = "UPDATE topic SET title=:title WHERE @rid=:rid";
db.query(sql, {params:{title:'Expressjs', rid:'#233:0'}}).then(function(results){
    console.log(results);
})
// DELETE
var sql = "DELETE FROM topic WHERE @rid=:rid";
db.query(sql, {params:{rid:'#233:0'}}).then(function(results){
     console.log(results);
});
*/