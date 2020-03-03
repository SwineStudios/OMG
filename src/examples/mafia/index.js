import React from 'react';

import * as THREE from 'three';
import Stats from 'stats.js';
import axios from 'axios';

import React3 from 'react-three-renderer';

import ExampleBase from '../../ExampleBase';

import Players from './objects/Players';
import HUD from './hud/HUD';

document.addEventListener("DOMContentLoaded", init, false);
var canvas = null;
function init() {
  canvas = document.getElementsByTagName("canvas")[0];
  canvas.addEventListener("mousedown", getPosition, false);
}

function getPosition(event) {
  var x = new Number();
  var y = new Number();
  if (event.x != undefined && event.y != undefined) {
    x = event.x;
    y = event.y;
  } else { // Firefox method to get the position
    x = event.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
    y = event.clientY + document.body.scrollTop +
        document.documentElement.scrollTop;
  }
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  alert("x: " + x + "  y: " + y);
}

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

    this.day = 0;
    this.dawn = false;

    this.state = {
      ...this.state,
      timer: Date.now() * 0.0001,
      timeStart: 0,
      roundLength: 100,
      players: 0
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


    //get initial data

    var thisModule = this;

    axios.get('http://localhost:3000/start/').then(function (response) {

      thisModule.setState(response.data);
    })
  }

  componentWillUnmount() {
    delete this.stats;
  }

  handleChange(event) {
    axios.post('http://localhost:3000/vote/' + this.state.player + '/' + event.target.value);
  }

  _onAnimateInternal() {
    const timer = Date.now() * 0.0001;

    this.setState({
      timer,
    });

    this.stats.update();

    var thisModule = this;

    axios.get('http://localhost:3000/update/').then(function (response) {

      var data = response.data;
      if (data.queue) data.players = data.queue;
      if (!data.players[thisModule.state.player]) data.dead = true;
      else data.dead = false;

      thisModule.setState(data);
    })
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    const {
      timer,
      timeStart,
      roundLength
    } = this.state;

    const objectRotation = new THREE.Euler(
      0,
      0,
      0
    );

    var time = roundLength - (timer - timeStart).toFixed(1) * 10;

    if (this.day !== this.state.day) {
      this.dawn = true;
      this.day = this.state.day;
    } else {
      this.dawn = false;
    }

    var avatars = {};
    if (this.state.avatars) {
      for (let avatar in this.state.avatars) {
        avatars[avatar] = new THREE.Vector3(this.state.avatars[avatar].x, 0, this.state.avatars[avatar].z);
      }
    }

    var deadList = this.state.deadList || {};

    return (<div ref="container">
      {this.state.dead ? "You are dead" :
        <HUD 
          timer={time}
          players={this.state.players}
          me={this.state.player}
          handleChange={this.handleChange.bind(this)}
          dawn={this.dawn}
          night={this.state.night}
          report={this.state.report}
          suspect={this.state.suspect}
        />
      }
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
            positions={this.state.avatars ?
              avatars :
              this.objectPositions['players']}
            rotations={objectRotation}
            dead={deadList}
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
