import React from 'react';
import * as THREE from 'three';
import React3 from 'react-three-renderer';


import Player from './Player';


const Players = ({ positions, rotations }) => {

  const players = [];

  for (var i = 0; i < Object.keys(positions).length; i++) {
    players.push(
      <Player
        position={positions[i]}
        rotation={rotations}
        type={i}
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