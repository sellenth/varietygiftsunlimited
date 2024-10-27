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
camera.lookAt(0, 0.5, 0);

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

const material = new THREE.RawShaderMaterial({
  side: THREE.DoubleSide,
  uniforms: {
    time: { value: 0.0 },
    waveHeight: { value: .2 },
    waveFrequency: { value: 3.0 }
  },

  vertexShader: `
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform float time;
    uniform float waveHeight;
    uniform float waveFrequency;
    
    attribute vec3 position;

    void main() {
      vec3 pos = position;
      float wave = sin(time + pos.x) * waveHeight;
      pos.z += wave;
      pos.z *= sin(pos.y * 1.5) + 1. / 2.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    precision mediump float;

    void main() {
      gl_FragColor = vec4(0.5, 0.8, 1.0, 1.0); // Light blue color
    }
  `,
});

// Create a plane with more segments for smoother waves
const planeGeometry = new THREE.PlaneGeometry(500, 500, 64, 64);
const plane = new THREE.Mesh(planeGeometry, material);
plane.rotation.x = -Math.PI / 2; // Rotate to be horizontal
scene.add(plane);

function animate() {
  const delta = clock.getDelta();

  // Update the time uniform for animation
  material.uniforms.time.value += delta;

  mixer.update(delta);

  controls.update();

  stats.update();

  renderer.render(scene, camera);
}

document.body.appendChild(VRButton.createButton(renderer));
renderer.xr.enabled = true;
