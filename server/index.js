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

let queue = 0;

const roundLength = 600;
let time = Date.now() * 0.0001;

const players = {
}

let deadList = {
}

const movement = {
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
  '6': false,
  '7': false,
  '8': false,
  '9': false
}

let report = '';
let suspect = '';

const avatars = {
  '1': {'x': -200, 'z': 200},
  '2': {'x': 0, 'z': 200},
  '3': {'x': -400, 'z': 0},
  '4': {'x': 200, 'z': 0},
  '5': {'x': 400, 'z': 0},
  '6': {'x': -400, 'z': -200},
  '7': {'x': -200, 'z': -200}
}

const avatarDest = {
}

let pregame = false;
let day = 0;
let night = false;

const setup = {
  'mafia': 2,
  'survivor': 3,
  'doctor': 1,
  'cop': 1
};

let powerroles = {
  'mafia1': '',
  'mafia2': '',
  'cop': '',
  'doctor': ''
};

let nightvotes = {};

let roles = [];

//================================
//================================

//app.post('/', (req, res) => {
//  newSetup(req, res);
//});

app.get('/start', (req, res) => {
  queue++;
  let player = queue;
  res.send({
    'player': player,
    'timeStart': time,
    'roundLength': roundLength
  });
});

app.get('/update', (req, res) => {
  let obj = {
    players: players
  };

  if (Object.keys(players).length === 0)
    obj.players = queue;

  obj.avatars = avatars;
  obj.deadList = deadList;

  obj.day = day;
  obj.night = night;

  obj.report = report;
  obj.suspect = suspect;

  obj.movement = movement

  res.send(obj);
});

app.post('/vote/:player/:target', (req, res) => {
  players[req.params.player].vote = req.params.target;
  res.end();
});

app.post('/click/:player/:x/:z', (req, res) => {
  let x = (req.params.x - 400) * 1.3;
  let z = (req.params.z - 400) * 1.3;
  avatarDest[req.params.player] = {'x': z, 'z': -x};
  res.end();
});

//================================
//================================

const newGame = () => {
  dawn = true;
  deadList = {};
  roles = [];
  for (let role in setup)
    for (let i = 0; i < setup[role]; i++)
      roles.push(role);
  shuffle(roles);

  //for (let role in powerroles)
    //nightvotes[role] = powerroles[role];
};

const newDay = () => {
  time = Date.now() * 0.0001;
  
  day++;
  night = !night;

  if (night)
    report = '';

  each(players, (p) => {
    if (night && p.role !== 'survivor')
      p.vote = undefined;
    if (!night)
      p.vote = undefined;
  });
};

const moveAvatars = () => {
  if (Object.keys(avatarDest).length === 0) {
    for (let move in movement)
      movement[move] = false;
    return;
  }

  for (avatar in avatarDest) {
    movement[avatar] = true;

    let x = avatars[avatar].x - avatarDest[avatar].x;
    let z = avatars[avatar].z - avatarDest[avatar].z;

    if (Math.abs(x) < 20 && Math.abs(z) < 20) {
      delete avatarDest[avatar];
    }

    let signx = x < 0 ? 1 : -1;
    let signz = z < 0 ? 1 : -1;

    avatars[avatar].x += 10 * signx;
    avatars[avatar].z += 10 * signz;
  }
}

const countVotes = () => {
  if (night) {
    let nightvotes = {};

    each(players, (p) => {
      if (p.role === 'mafia') {
        if (!nightvotes['mafia1'])
          nightvotes['mafia1'] = p.vote;
        else
          nightvotes['mafia2'] = p.vote;
      } else if (p.role === 'doctor')
        nightvotes['doctor'] = p.vote;
      else if (p.role === 'cop')
        nightvotes['cop'] = p.vote;
    });

    let mafiakill = false;

    if (nightvotes['mafia1'] && nightvotes['mafia2']) {
      if (nightvotes['mafia1'] === nightvotes['mafia2'])
        mafiakill = true;
    }
    else if (nightvotes['mafia1'])
        mafiakill = true;
    else if (nightvotes['mafia2'])
      mafiakill = true;

    if (mafiakill) {

      victim = nightvotes['mafia1'] || nightvotes['mafia2'];

      if (nightvotes['doctor']) {
        if (nightvotes['doctor'] !== victim) {
          delete players[victim];
          deadList[victim] = true;
        }
      }

      //get cop report
      if (nightvotes['cop']) {
        report = players[nightvotes['cop']].role;
        suspect = nightvotes['cop'];
      }
      //

      newDay();
    }

  } else {
    const votes = {};

    each(players, (p) => {
      if (votes[p.vote])
        votes[p.vote]++;
      else
        votes[p.vote] = 1;
    });

    let max = -1;
    let victim = '';

    for (let target in votes) {
      if (votes[target] > max) {
        max = votes[target];
        victim = target;
      } else if (votes[target] === max) {
        victim = '';
      }
    }

    if (victim !== '') {
      delete players[victim];
      deadList[victim] = true;
      newDay();
    }
  }

};

const beginning = () => {
  pregame = false;

  console.log('game begins');

  for (let i = 1; i <= roles.length; i++) {
    players[i] = {
      'role': roles[i-1]
    }
  }
};

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const each = function(collection, iterator) {
  if (!Array.isArray(collection))
    for (let key in collection)
      iterator(collection[key], key, collection);
  else
    for (let i = 0; i < collection.length; i++)
      iterator(collection[i], i, collection);
};

const filter = (collection, test) => {
  let arr = [];
  each(collection, function(item){
    if(test(item))
      arr.push(item);
  });
  return arr;
};

//================================
//================================

const framelength = 50;

//================================
//================================

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);

  pregame = true;

  newGame();

  const mafia = () => {

    //check if room has filled
    if (pregame && queue >= roles.length)
      beginning();
    //

    //wait for players
    if (pregame) {
      setTimeout(mafia, framelength);
      return;
    }
    //

    //handle round time out
    const remaining = roundLength - (Date.now() * 0.0001 - time).toFixed(1) * 10;

    if (remaining < 0)
      newDay();
    //

    //handle player behavior
    const nonVoters = filter(players, (p) => {
      return typeof p.vote === "undefined";
    });

    if (nonVoters.length === 0) {
      countVotes();
    }
    //
    
    //move 3D models
    moveAvatars();
    //

    setTimeout(mafia, framelength);
  };
  mafia();

});

