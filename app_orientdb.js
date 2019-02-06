// 받은 정보를 파일 시스템에 저장하는 웹 어플리케이션

var express = require("express");
var app = express();

var fs = require("fs");

//파일업로드를 위한 multer 모듈
var multer = require("multer");
var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

var upload = multer({storage:_storage});

var OrientDB = require('orientjs');

var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'dlqhrdma1'
});

var db = server.use('demodb')
console.log('Using Database:'  + db.name);

//post method를 쓰기위한 bodyparser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;

app.set("views", "./views_orientdb");
app.set("view engine", "jade");

//내용저장 화면
app.get("/topicNew", function(req, res) {
  res.render("new");
});

//저장된 파일 목록을 불러오고 파일 내용을 보여줌
app.get(["/topic", "/topic/:id"], function(req, res) {
  var sql = 'SELECT FROM topic';
  db.query(sql).then(function(topics){ 
    var id = req.params.id;
    if(id){
      var sql = 'SELECT FROM topic WHERE @rid=:rid';
      db.query(sql, {params:{rid:id}}).then(function(topic){ 
        res.render("view", { topics: topics, topic:topic[0]});
      });
    }else{
      res.render("view", { topics: topics} );
    } 
  })
});

//post로 넘어온 데이터를 저장
app.post("/topic", function(req, res) {
  var title = req.body.title;
  var description = req.body.description;

  fs.writeFile("data/" + title, description, function(err) {
    if (err) {
      res.status(500).send("Internal Server Error");
    }

    res.send("Success");
  });
});

app.get("/upload", function(req, res) {
  res.render("upload");
});

app.post("/upload", upload.single('userfile'), function(req, res) {
  console.log(req.file);
  res.send("uploaded"+req.file.filename);
});

app.listen(3000, function() {
  console.log("Connected, 3000 port!!");
});
