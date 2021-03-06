import React from 'react';


const Role = ({ role, number }) => {

  var color = 'red'; //error

  if (role === 'survivor') color = 'blue';
  if (role === 'mafia') color = 'black';
  if (role === 'cop') color = 'darkgoldenrod';
  if (role === 'doctor') color = 'green';

  return (
    <span>
      <span style={{
          'height': '20px',
          'width': '20px',
          'marginTop': '4px',
          'marginLeft': '20px',
          'backgroundColor': color,
          'display': 'inline-block'
      }}/>
      { ' x ' + number }
    </span>
  );
};

export default Role;