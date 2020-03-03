import React from 'react';
import * as THREE from 'three';
import React3 from 'react-three-renderer';


import Player from './Player';


const Players = ({ positions, rotations, dead, movement }) => {

  const players = [];

  let move = movement || {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
    '8': false,
    '9': false,
  };

  for (var i = 1; i <= Object.keys(positions).length; i++) {
    if (i in dead) {
      continue;
    }
    players.push(
      <Player
        position={positions[i]}
        rotation={rotations}
        type={i - 1}
        animate={move[i]}
        key={i}
      />
    );
  }

  return (
    <group>

    {players}
    
    </group>
  );
};

export default Players;