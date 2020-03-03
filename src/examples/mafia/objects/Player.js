import React from 'react';
import * as THREE from 'three';
import React3 from 'react-three-renderer';


var lathePoints = [];

for (let i = 0; i < 50; i++) {
  lathePoints.push(new THREE
    .Vector2(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, (i - 5) * 2));
}

const Player = ({ position, rotation, type, animate }) => {

  const body = [];

  const heads = [];

  if (type === 0) {
    heads.push(
      <octahedronGeometry
        radius={75}
        detail={2}
        key={0}
      />
    );
  } else  if (type === 1) {
    heads.push(
      <tetrahedronGeometry
        radius={75}
        detail={0}
        key={0}
      />
    );
  } else  if (type === 2) {
    heads.push(
      <boxGeometry
        width={100}
        height={100}
        depth={100}
        widthSegments={4}
        heightSegments={4}
        depthSegments={4}
        key={0}
      />
    );
  } else  if (type === 3) {
    heads.push(
      <cylinderGeometry
        radiusTop={25}
        radiusBottom={75}
        height={100}
        radialSegments={40}
        heightSegments={5}
        key={0}
      />
    );
  } else  if (type === 4) {
    heads.push(
      <latheGeometry
        points={lathePoints}
        segments={20}
        key={0}
      />
    );
  } else  if (type === 5) {
    heads.push(
      <torusGeometry
        radius={50}
        tube={20}
        radialSegments={20}
        tubularSegments={20}
        key={0}
      />
    );
  } else  if (type === 6) {
    heads.push(
      <torusKnotGeometry
        radius={50}
        tube={10}
        radialSegments={50}
        tubularSegments={20}
        key={0}
      />
    );
  }

  let headPosition = new THREE.Vector3(position.x, 80, position.z);

  let feet = 10;
  if (animate)
    feet = Math.floor(Math.random() * 9) + 4;

  body.push(
    <mesh
      key={0}
      position={headPosition}
      rotation={rotation}
    >
      {heads}
      <materialResource
        resourceId="material"
      />
    </mesh>
  );

  return (
    <group>
      {body}
      <mesh
        key={0}
        position={position}
        rotation={rotation}
      >
        <torusKnotGeometry
          radius={50}
          tube={10}
          radialSegments={50}
          tubularSegments={feet}
          key={0}
        />
        <materialResource
          resourceId="material"
        />
      </mesh>
    </group>
  );
};

export default Player;