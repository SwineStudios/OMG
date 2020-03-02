const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//const goose = require('../database/index.js');
//const players = require('../database/controllers/players.js');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

//================================
//================================

const queue = 0;

const roundLength = 600;
var time = Date.now() * 0.0001;

const players = {
}


//================================
//================================

//app.post('/', (req, res) => {
//  setup(req, res);
//});

app.get('/time', (req, res) => {
  res.send({
    'timeStart': time,
    'roundLength': roundLength
  });
});

app.get('/players', (req, res) => {
  if (Object.keys(players).length !== 0)
    res.send(players);
  else
    res.send({'queue': queue});
});

//================================
//================================




//================================
//================================

const framelength = 200;

//================================
//================================

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);


  const mafia = () => {

    //handle round time out
    var remaining = roundLength - (Date.now() * 0.0001 - time).toFixed(1) * 10;

    if (remaining < 0)
      time = Date.now() * 0.0001;
    //


    



    setTimeout(mafia, framelength);
  }
  mafia();

});

