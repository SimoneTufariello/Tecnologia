var express = require('express');
var app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());

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

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
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
            console.log(result);
            res.send(result);

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
            if(result.length != 0){
                res.send(true);
                console.log("Login corretto");
            }else{
                res.send(false);
            }
        });
    });
})

app.post('/segnalaG', function (req, res) {

    var args = {
        data: {
            ID: req.body.idMezzo,
            desc: req.body.desc
            },
        headers: { "Content-Type": "application/json" }
    };
    console.log(req.body);
    console.log(args.data);


    client.post("https://3000-e39bb563-82a9-49fa-b482-4079d331ce25.ws-eu0.gitpod.io/Segnala", args, function (data, response) {
        // data contiene le informazioni recuperate dal server REST
        // response contiene le informazioni riguardanti il protocollo HTTP
        console.log(data +response);
        if (data.n == 1)
            res.send([{message: 'OK'}]);
        else
            res.send([{message: 'KO'}]);
    });


});




app.post('/noleggiaM', function (req, res) {
    var args = {
        data: {
            IdMezzo: parseInt(req.query.idMezzo),
            },
        headers: { "Content-Type": "application/json" }
    };
    client.post("https://3000-e39bb563-82a9-49fa-b482-4079d331ce25.ws-eu0.gitpod.io/NoleggiaMono", args, function (data, response) {
        // data contiene le informazioni recuperate dal server REST
        // response contiene le informazioni riguardanti il protocollo HTTP
        if (data.n == 1)
            res.send([{message: 'OK'}]);
        else
            res.send([{message: 'KO'}]);
    });
});


app.post('/BloccaM', function (req, res) {
    var args = {
        data: {
            IdMezzo: parseInt(req.query.idMezzo),
            },
        headers: { "Content-Type": "application/json" }
    };
    client.post("https://3000-e39bb563-82a9-49fa-b482-4079d331ce25.ws-eu0.gitpod.io/BloccaMono", args, function (data, response) {
        // data contiene le informazioni recuperate dal server REST
        // response contiene le informazioni riguardanti il protocollo HTTP
        if (data.n == 1)
            res.send([{message: 'OK'}]);
        else
            res.send([{message: 'KO'}]);
    });
});





app.post('/prenotaS', function (req, res) {
    var args = {
        data: {
            Data: req.body.Data,
            CoordI: req.body.CoordI,
            CoordF: req.body.CoordF,
            IdUtente: req.body.idUtente
            },
        headers: { "Content-Type": "application/json" }
    };

    client.post("https://3000-e39bb563-82a9-49fa-b482-4079d331ce25.ws-eu0.gitpod.io/PrenotaS", args, function (data, response) {
        // data contiene le informazioni recuperate dal server REST
        // response contiene le informazioni riguardanti il protocollo HTTP

        if (data.n == 1)
            res.send({message: 'E\' stata inserita una nuova informazione'});
        else
            res.send({message: 'Problemi nell\'inserimento'});
    });
});





app.post('/partecipaS', function (req, res) {
    var args = {
        data: {
            IdRichiesta: req.body.idRichiesta,
            IdUtente: req.body.idUtente
            },
        headers: { "Content-Type": "application/json" }
    };
    client.post("https://3000-e39bb563-82a9-49fa-b482-4079d331ce25.ws-eu0.gitpod.io/PartecipaS", args, function (data, response) {
        // data contiene le informazioni recuperate dal server REST
        // response contiene le informazioni riguardanti il protocollo HTTP
        if (data.n == 1)
            res.send({message: 'E\' stata inserita una nuova informazione'});
        else
            res.send({message: 'Problemi nell\'inserimento'});
    });
});





//GET REQUESTS

app.get('/visuMezzi', function (req, res) {
    var args = {};
    client.get("https://3000-e39bb563-82a9-49fa-b482-4079d331ce25.ws-eu0.gitpod.io/GetMezzi", args, function (data, response) {
        res.send({Mezzi: data});
    });
});

app.get('/visuOff', function (req, res) {
    var args = {};
    client.get("https://3000-e39bb563-82a9-49fa-b482-4079d331ce25.ws-eu0.gitpod.io/GetOfferte", args, function (data, response) {
        res.send({offerte: data});
    });
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});