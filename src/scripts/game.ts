import * as THREE from "three";
import { VRButton } from "three/addons/webxr/VRButton.js";

import Stats from "three/addons/libs/stats.module.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

let mixer;

const clock = new THREE.Clock();
const container = document.getElementById("container");

const stats = new Stats();
container.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const pmremGenerator = new THREE.PMREMGenerator(renderer);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3dd);
scene.environment =
  pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  100,
);
camera.position.set(5, 2, 8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load(
  "https://threejs.org/examples/models/gltf/LittlestTokyo.glb",
  function (gltf) {
    const model = gltf.scene;
    model.position.set(1, 1, 0);
    model.scale.set(0.01, 0.01, 0.01);
    //scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();

    renderer.setAnimationLoop(animate);
  },
  undefined,
  function (e) {
    console.error(e);
  },
);

window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

function animate() {
  const delta = clock.getDelta();

  mixer.update(delta);

  controls.update();

  stats.update();

  renderer.render(scene, camera);
}

document.body.appendChild(VRButton.createButton(renderer));
renderer.xr.enabled = true;

const material = new THREE.RawShaderMaterial({
  uniforms: {
    time: { value: 1.0 },
    resolution: { value: new THREE.Vector2() }
  },

  vertexShader: `
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    attribute vec3 position;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position + vec3(0, 0, -2), 1.0);
      
    }
  `,
  fragmentShader: `
    precision mediump float;
    uniform float time;
    uniform vec2 resolution;

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution;
      uv -= vec2(0.5);
      uv *= vec2(resolution.x / resolution.y, 1);
      vec3 col = vec3(0);
      float noise = sin(dot(uv, vec2(12.9898, 4.1414)) * 43758.5453 + time);
      col += vec3(noise);
      gl_FragColor = vec4(col, 1.0);
    }
  `,
});

var plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
plane.position.set(0, 0, 0);
plane.rotation.set(-Math.PI / 6, 0, 0);
scene.add(plane);
