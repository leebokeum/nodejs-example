// Express 연습

var express = require('express');
var app = express();

//post method를 쓰기위한 bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//static 정적 파일을 쓰기위한 셋팅
app.use(express.static('public'));

app.get('/image', function (req, res) {
    res.send('Hello Route, <img src = "/img1.png">');
});

//jade 템플릿을 이용해 응답하기위한 셋팅
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');

//jade 템플릿을 이용해 응답하기
app.get('/template', function (req, res) {
    res.render('temp', { time: Date(), _title: 'Jade' });
});


//기본 Default Router
app.get('/', function (req, res) {
    res.send('Hello home page');
});


//query string 인자값으로 받기
//http://localhost:3000/topic?id=1
app.get('/topic', function (req, res) {
    res.send(req.query.id);
});


//시멘틱 URL로 응답받기
//http://localhost:3000/topic/1
app.get('/topic/:id', function (req, res) {
    res.send(req.params.id);
});



// 동적으로 html 그려서 응답하기
app.get('/dynamic', function (req, res) {
    var lis = '';

    for (var i = 0; i < 5; i++) {
        lis = lis + '<li>coding</li>';
    }

    var output = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
    <meta charset="utf-8">
    <!-- Compatibility for IE -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <!-- Set viewport for N-Screen -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="leebokeum">
    <meta name="keywords" content="html5">
    <meta name="description" content="HTML5 Template">
    <!-- Development -->
    <meta name="robots" content="noindex, nofollow">
    <!-- Release -->
    <meta name="robots" content="index, follow">
    <title> HTML5 Template </title> 
    </head>
    <body>
    
        <h1>hello world, dynamic</h1>
        <ul>
            ${lis}
        </ul>
        
    </body>
    </html>
     
    `;
    res.send(output);
});

//router sample
app.get('/login', (req, res) => {
    res.send('<h1>Login please</h1>');
});

//post로 받기
app.post('/login', (req, res) => {
    var title = req.body.title;
    res.send('title');
});

app.listen(3000, function () {
    console.log('Connected 3000 port!');
});