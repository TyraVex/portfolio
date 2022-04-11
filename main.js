import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// init objects
const scene = new THREE.Scene();
const loader = new GLTFLoader();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas:document.querySelector('#bg')});
const controls = new OrbitControls(camera,renderer.domElement,renderer.autoRotate);

// global settings
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera );

// lights
const pointLight = new THREE.PointLight(0xffffff);

// helpers
//const gridHelper = new THREE.GridHelper(200,50);

// donut
const geometry = new THREE.TorusGeometry(130, 20, 20, 50);
const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

// 3d-model
loader.load('assets/text.glb', function ( model ) {
    scene.add(model.scene);
  }, undefined, function (error) {
  	console.error(error);
  }
);

// objects settings
camera.position.setY(350);
pointLight.position.set(0, 300, 0);
torus.position.set(0, 0, 0);

// add objects
//scene.add(gridHelper);
scene.add(pointLight);
scene.add(torus);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.007;
  controls.update();
}

animate()
