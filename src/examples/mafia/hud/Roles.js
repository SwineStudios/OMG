import React from 'react';

import Role from './Role';


const Roles = ({ roles }) => {

  const icons = [];
  const sortedRoles = [];

  for (var role in roles) {
    sortedRoles.push(role);
  }

  sortedRoles.sort();

  for (var i = 0; i < sortedRoles.length; i++) {
    icons.push(
      <Role
        role={sortedRoles[i]}
        number={roles[sortedRoles[i]]}
        key={sortedRoles[i]}
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