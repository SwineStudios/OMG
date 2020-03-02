import React from 'react';
import * as THREE from 'three';
import React3 from 'react-three-renderer';

import Roles from './Roles';


const HUD = ({ timer, players }) => {

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
        <Roles roles={roles}/>
        <Voting players={players}/>
      }
    </div>
  );
};

export default HUD;