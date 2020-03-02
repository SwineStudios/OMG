import React from 'react';

import Role from './Role';


const Roles = ({ roles }) => {

  const icons = [];

  for (var role in roles) {
    icons.push(
      <Role
        role={role}
        number={roles[role]}
        key={role}
      />
    );
  }

  return (
    <div>
      {icons}
    </div>
  );
};

export default Roles;