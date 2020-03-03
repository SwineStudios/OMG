import React from 'react';

import Role from './Role';


const Roles = ({ roles, role }) => {

  const icons = [];
  const sortedRoles = [];

  for (let role in roles) {
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
      <span style={{
        'paddingLeft': '40px'
      }}>
        My role: {role}
      </span>
    </div>
  );
};

export default Roles;