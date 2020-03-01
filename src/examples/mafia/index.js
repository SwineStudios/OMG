import React from 'react';

import * as THREE from 'three';
import Stats from 'stats.js';

import React3 from 'react-three-renderer';

import ExampleBase from '../../ExampleBase';

import Players from './objects/Players';
import HUD from './hud/HUD';


class Game extends ExampleBase { 
  constructor(props, context) {
    super(props, context);

    this.directionalLightPosition = new THREE.Vector3(1, 1, 0);

    this.objectPositions = {
      players: {
        '1': new THREE.Vector3(-200, 0, 200),
        '2': new THREE.Vector3(0, 0, 200),
        '3': new THREE.Vector3(-400, 0, 0),
        '4': new THREE.Vector3(200, 0, 0),
        '5': new THREE.Vector3(400, 0, 0),
        '6': new THREE.Vector3(-400, 0, -200),
        '7': new THREE.Vector3(-200, 0, -200),
      },
      'axis': new THREE.Vector3(0, 0, 0),
    };

    this.arrowDir = new THREE.Vector3(0, 1, 0);
    this.arrowOrigin = new THREE.Vector3(0, 0, 0);

    this.scenePosition = new THREE.Vector3(0, 0, 0);

    this.state = {
      ...this.state,
      timer: Date.now() * 0.0001,
      players: []
    };
  }

  _onAnimate = () => {
    this._onAnimateInternal();
  };

  componentDidMount() {
    this.stats = new Stats();

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
    this.stats.domElement.style.right = '0px';

    this.refs.container.appendChild(this.stats.domElement);

    //get players from server
    var response = 5;

    this.setState({
      players: response
    })
  }

  componentWillUnmount() {
    delete this.stats;
  }

  _onAnimateInternal() {
    const timer = Date.now() * 0.0001;

    this.setState({
      timer,
    });

    this.stats.update();
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    const {
      timer,
    } = this.state;

    const objectRotation = new THREE.Euler(
      0,
      0,
      0
    );

    return (<div ref="container">
      <HUD timer={timer.toFixed(1)} />
      <React3
        width={width}
        height={height}
        antialias
        pixelRatio={window.devicePixelRatio}
        mainCamera="mainCamera"
        onAnimate={this._onAnimate}
      >
        <resources>
          <texture
            resourceId="texture"
            url="textures/UV_Grid_Sm.jpg"
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
            anisotropy={16}
          />
          <meshLambertMaterial
            resourceId="material"
            side={THREE.DoubleSide}
          >
            <textureResource
              resourceId="texture"
            />
          </meshLambertMaterial>
        </resources>
        <scene>
          <perspectiveCamera
            fov={45}
            aspect={width / height}
            near={1}
            far={2000}
            lookAt={this.scenePosition}
            name="mainCamera"
            position={new THREE.Vector3(
              800,
              400,
              800 
            )}
          />
          <ambientLight
            color={0x404040}
          />
          <directionalLight
            color={0xffffff}
            position={this.directionalLightPosition}
            lookAt={this.scenePosition}
          />
          <Players
            positions = {this.objectPositions['players']}
            rotations = {objectRotation}
          />
          <axisHelper
            position={this.objectPositions['axis']}
            size={50}
            rotation={objectRotation}
          />
        </scene>
      </React3>
    </div>);
  }
}

export default Game;
