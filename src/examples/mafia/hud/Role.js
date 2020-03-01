import React from 'react';
import * as THREE from 'three';
import React3 from 'react-three-renderer';


const Role = ({ role, number }) => {

  var color = 'red'; //error

  if (role === 'survivor') color = 'blue';
  if (role === 'mafia') color = 'black';
  if (role === 'cop') color = 'brown';
  if (role === 'doctor') color = 'green';

  return (
    <span>
      <span style={{
          'height': '20px',
          'width': '20px',
          'margin-top': '4px',
          'margin-left': '20px',
          'background-color': color,
          'display': 'inline-block'
      }}/>
      { ' x ' + number }
    </span>
  );
};

export default Role;