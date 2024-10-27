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

// Replace the RawShaderMaterial with MeshPhongMaterial for better shadow handling
const material = new THREE.MeshPhongMaterial({
  color: 0x0077be,  // Ocean blue color
  shininess: 60,
  side: THREE.DoubleSide
});

// Modify the plane geometry to have even more segments for better shadow detail
const planeGeometry = new THREE.PlaneGeometry(500, 500, 128, 128);
const plane = new THREE.Mesh(planeGeometry, material);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Add directional light instead of point light for better shadows
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(100, 100, 50);
dirLight.castShadow = true;

// Improve shadow quality
dirLight.shadow.mapSize.width = 4096;
dirLight.shadow.mapSize.height = 4096;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 500;

// Adjust shadow camera frustum to cover the waves
dirLight.shadow.camera.left = -300;
dirLight.shadow.camera.right = 300;
dirLight.shadow.camera.top = 300;
dirLight.shadow.camera.bottom = -300;

scene.add(dirLight);

// Add ambient light to soften shadows
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

function animate() {
  const delta = clock.getDelta();

  // Animate the plane vertices for waves
  const time = Date.now() * 0.001;
  const vertices = planeGeometry.attributes.position.array;
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const y = vertices[i + 1];
    vertices[i + 2] = Math.sin(x * 0.05 + time) * 5 + Math.sin(y * 0.05 + time) * 5;
  }
  planeGeometry.attributes.position.needsUpdate = true;
  planeGeometry.computeVertexNormals(); // Important for proper lighting

  mixer.update(delta);
  controls.update();
  stats.update();
  renderer.render(scene, camera);
}

document.body.appendChild(VRButton.createButton(renderer));
renderer.xr.enabled = true;
