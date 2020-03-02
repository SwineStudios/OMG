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


const players = {
  '1': {
    'role': 'mafia',
    'vote': '1'
  },
  '2': {
    'role': 'doctor',
    'vote': undefined
  },
  '3': {
    'role': 'survivor',
    'vote': undefined
  }
}


//================================
//================================

//app.post('/', (req, res) => {
//  setup(req, res);
//});

app.get('/players', (req, res) => {
  res.send(players);
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


    



    setTimeout(mafia, framelength);
  }
  mafia();

});

