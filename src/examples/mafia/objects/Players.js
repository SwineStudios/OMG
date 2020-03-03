import React from 'react';
import * as THREE from 'three';
import React3 from 'react-three-renderer';


import Player from './Player';


const Players = ({ positions, rotations, dead }) => {

  const players = [];

  for (var i = 1; i <= Object.keys(positions).length; i++) {
    if (i in dead) {
      continue;
    }
    players.push(
      <Player
        position={positions[i]}
        rotation={rotations}
        type={i - 1}
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