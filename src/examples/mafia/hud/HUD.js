import React from 'react';

import Voting from './Voting';
import Roles from './Roles';


const HUD = ({ timer, players, me, handleChange, dawn, night, report, suspect }) => {

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

  let myRole = '';
  if (players[me])
    myRole = players[String(me)]['role'];

  var isSurvivor = false;
  if (night) {
    isSurvivor = (myRole === 'survivor');
  }

  if (String(seconds).length === 1)
    seconds = '0' + seconds;

  return (
    <div>
      {minutes + ':' + seconds}
      <div style={{
        'width': '100%',
        'height': '20px',
        'backgroundColor': 'black'
      }}/>
      <span>
        <Roles roles={roles} role={myRole}/>
        { !night || !isSurvivor ?
          <span>
            <div style={{
              'width': '100%',
              'height': '20px',
              'backgroundColor': 'black'
            }}/>
            <Voting
              players={players}
              me={me}
              role={myRole}
              change={handleChange}
              dawn={dawn}
              night={night}
              report={report}
              suspect={suspect}
            />
          </span>
          :
          null
        }
      </span>
    </div>
  );
};

export default HUD;