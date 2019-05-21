var express = require('express');
var app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());


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
            console.log("Login corretto");

            res.send(true);
        });
    });
})

app.post('/login', function(req, res) {

    var username = req.query.username;
    var pass = req.query.password;

    var stat; //no

    conn.connect(function(err) {
        if (err) throw err;
        conn.query('SELECT * FROM User WHERE Username = "' + username + '" AND Password = "' + pass + '"', function(err, result, fields) {
            if (err) throw err;
            if (result == '') {
                res.send(false);
            } else {
                console.log("Login corretto");
                res.send(true)
            }
        });
    });
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});