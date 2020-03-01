import React from 'react';
import * as THREE from 'three';
import React3 from 'react-three-renderer';


const HUD = ({ timer }) => {

  return (
    <div>
      {timer}
    </div>
  );
};

export default HUD;