var express = require('express');
var app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {

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

    res.send({message: 'WebService RESTful'});
});