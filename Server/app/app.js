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

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.post('/register', function(req, res) {

    var nome = req.body.nome;
    var cognome = req.body.cognome;
    var username = req.body.username;
    var email = req.body.email;
    var data = req.body.data;
    var pass = req.body.password;

    var stat; //no

    var con = Connection();

    con.connect(function(err) {
        if (err) throw err;
        con.query('INSERT INTO User(Nome, Cognome, Username, Password, Email, Data) VALUES("' + nome + '","' + cognome + '","' + username + '","' + pass + '","' + email + '","' + data + '")', function(err, result, fields) {
            if (err) throw err;
            console.log("OK, registrazione effettuata correttamente: " + nome +" "+ password);

            res.send(true);
        });
    });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});