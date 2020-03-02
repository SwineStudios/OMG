import React from 'react';
import * as THREE from 'three';
import React3 from 'react-three-renderer';

import Roles from './Roles';


const HUD = ({ timer, players }) => {

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
      {timer}
      <div style={{
        'width': '100%',
        'height': '20px',
        'backgroundColor': 'black'
      }}/>
      {typeof players === 'number' ?
        players + " players joined" :
        <Roles roles={roles}/>
      }
    </div>
  );
};

export default HUD;