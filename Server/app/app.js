var express = require('express');
var app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//app.use(cookieParser()); //cookie

const cors = require('cors');

var cookieParser = require('cookie-parser');

app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   next();
});


var MongoClient = require('mongodb').MongoClient;
var Client = require('node-rest-client').Client;
var client = new Client();


var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "remotemysql.com",
    password: "QsvcvJ4J7O",
    database: "UPHEOeV4ml",
    user: "UPHEOeV4ml"
    });




app.get('/', function (req, res) {
  res.send('Hello World!');
});

//REGISTRAZIONE
app.post('/register', function(req, res) {

    var nome = req.query.nome;
    var cognome = req.query.cognome;
    var username = req.query.username;
    var email = req.query.email;
    var data = req.query.data;
    var pass = req.query.password;

    var stat; //no



    conn.connect(function(err) {
        if (err) throw err;
        conn.query('INSERT INTO User(Nome, Cognome, Username, Password, Email, Data) VALUES("' + nome + '","' + cognome + '","' + username + '","' + pass + '","' + email + '","' + data + '")', function(err2, result, fields) {
            if (err2) throw err2;
            console.log(result);
            res.send(result);

        });
    });
})
//LOGIN
app.post('/login', function(req, res) {

    var username = req.query.username;
    var pass = req.query.password;

    var stat; //no

    conn.connect(function(err) {
        if (err) throw err;
        conn.query('SELECT ID FROM User WHERE Username = "' + username + '" AND Password = "' + pass + '"', function(err, result, fields) {
            if (err) throw err;
            if(result.length != 0){
                res.send(result);
                console.log("Login corretto");
            }else{
                res.send(false);
            }
        });
    });
})


//VISUALIZZARE MONOPATTINI
app.get('/VisualizzaMonop', function (req, res) {
    var args = {};
    client.get("https://3000-c58ed4f4-a087-4683-bc1d-2e35d72adad7.ws-eu0.gitpod.io/VisualizzaMonop", args, function (data, response) {
        console.log(data);
        res.send({result: data});
    });
});


app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});