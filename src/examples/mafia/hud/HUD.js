import React from 'react';

import Voting from './Voting';
import Roles from './Roles';


const HUD = ({ timer, players, me, handleChange }) => {

  var minutes = Math.floor(timer / 60);
  var seconds = timer - minutes * 60;

  var roles = {};

  for (var player in players) {
    var role = players[player]['role'];
    if (role) {
      if (roles[role]) {
        roles[role]++;
      } else {
        roles[role] = 1;
      }
    }
  }

  return (
    <div>
      {minutes + ':' + seconds}
      <div style={{
        'width': '100%',
        'height': '20px',
        'backgroundColor': 'black'
      }}/>
      {typeof players === 'number' ?
        players + " players joined" :
        <span>
          <Roles roles={roles}/>
          <div style={{
            'width': '100%',
            'height': '20px',
            'backgroundColor': 'black'
          }}/>
          <Voting players={players} me={me} change={handleChange}/>
        </span>
      }
    </div>
  );
};

export default HUD;