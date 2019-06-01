var express = require('express');
var app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());

const pug = require('pug');
app.set('view engine', 'pug');

MongoClient = require('mongodb').MongoClient;

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//------------------------------------------------------------------------------- MONO OFFICE -----------------------------------------------------------------

//MONOPATTINI IN USO PER MONOFFICE
app.get('/', function (req, res) {

    MongoClient.connect('mongodb+srv://admin:WmfgqPRXyc5vVlLQ@simo-2g6jy.mongodb.net/admin', function(err, db) {
      if (err) {
        throw err;
      }
      var dbo = db.db("Tecnologie");
      dbo.collection("Monopattino").find({Stato: true}).toArray(function(err, result) {
        if (err) {
          throw err;
        }

      dbo.collection("Guasto").find().toArray(function(err, result2) {
        if (err) {
          throw err;
        }
        res.render('Home', {monop: result, guasti: result2});

      });
    });
  });
});


//SISTEMAZIONE GUASTI
app.post('/risoluzioneGuasti', function (req, res) {

    MongoClient.connect('mongodb+srv://admin:WmfgqPRXyc5vVlLQ@simo-2g6jy.mongodb.net/admin', function(err, db) {
      if (err) {
        throw err;
      }

      var dbo = db.db("Tecnologie");

      //ELIMINAZIONE GUASTO
      var GuastoEliminare = { QRCode: req.body.QRCode, CodiceGuasto: parseInt(req.body.CodGuasto)};

      dbo.collection("Guasto").deleteOne(GuastoEliminare, function(err, result) {
        if (err) throw err;

     // });

      //MODIFICA GUASTO MONOPATTINO
         var monopModificare = { QRCode: req.body.QRCode};
         var newMonop = { $set: {Guasto: false} };

         dbo.collection("Monopattino").updateOne(monopModificare, newMonop, function(err, result2) {
           if (err) throw err;

           //PER RIVISUALIZZARE TUTTI I MONOPATTINI E I GUASTI
           dbo.collection("Monopattino").find({Stato: true}).toArray(function(err, result3) {
             if (err) {
                throw err;
             }

           dbo.collection("Guasto").find().toArray(function(err, result4) {
            if (err) {
                throw err;
            }

        if (result.result.n == 1 && result2.result.n == 1)
             res.render("Home.pug", {stat: "OK", mexDelete: "Guasto eliminato correttamente!", mexUpdate: "Il monopattino è di nuovo in funzione!", monop: result3, guasti: result4 });
           else
             res.render("Home.pug", {stat: "KO", mexDelete: "Problemi nell'eliminazione!", mexUpdate: "Problemi nell'aggiornamento!", monop: result3, guasti: result4 });

        db.close();

        });//dbo guast
        });//dbo monop
         });//dbo monop
       }); //dbo guasto
     });//mongoclient

});

//--------------------------------------------------------------------------------------------------- MONO RENT --------------------------------------------------------

//VISUALIZZARE MONOPATTINI
app.get('/VisualizzaMonop', function (req, res) {

    MongoClient.connect('mongodb+srv://admin:WmfgqPRXyc5vVlLQ@simo-2g6jy.mongodb.net/admin', function(err, db) {
      if (err) {
        throw err;
      }
      var dbo = db.db("Tecnologie");
      dbo.collection("Monopattino").find().toArray(function(err, result) {
        if (err) {
          throw err;
        }
        res.send(result);
        db.close();
      });
    });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});