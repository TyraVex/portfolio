//init ressources
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

// init objects
const scene = new THREE.Scene();
const loader = new GLTFLoader();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas:document.querySelector('#bg'), antialias: true});
const controls = new OrbitControls(camera,renderer.domElement);

// global settings
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// lights
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light

//stars
function addStar() {
  const geometry = new THREE.SphereGeometry(1.5, 20, 20);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// donut
const geometry = new THREE.TorusGeometry(130, 20, 10, 40);
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
camera.position.set(0, 0, 260);
pointLight.position.set(0, 0, 500);
torus.position.set(0, 0, 0);

// add objects
scene.add(pointLight);
scene.add(ambientLight);
scene.add(torus);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.007;
  controls.update();
}

animate()
