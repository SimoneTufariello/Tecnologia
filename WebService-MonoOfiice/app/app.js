var express = require('express');
var app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());

app.set('views', './views');
app.set('view engine', 'pug');

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


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