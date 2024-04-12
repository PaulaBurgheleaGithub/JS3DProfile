import './style.css'
import * as THREE from "three";
import { OrbitControls, ThreeMFLoader } from 'three/examples/jsm/Addons.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xDA9A01 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLigit = new THREE.PointLight(0xffffff);
pointLigit.position.set(5, 5, 5,);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLigit, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLigit);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
};

Array(300).fill().forEach(addStar);

//scene texture

const sceneTexture = new THREE.TextureLoader().load('/assets/16.webp');
scene.background = sceneTexture;

//avatar

const avatarTexture = new THREE.TextureLoader().load('/assets/12.webp');
const profile = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: avatarTexture})
);

scene.add(profile);
profile.position.z = -5;
profile.position.x = 2;
// ball/sphere

const sphereTexture = new THREE.TextureLoader().load('/assets/22.webp');
const surfaceTexture = new THREE.TextureLoader().load('/assets/texture.jpg');
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sphereTexture,
    normalMap: surfaceTexture

  })
);

scene.add(sphere);
sphere.position.z = 30;
sphere.position.setX(-10);

//scroll animation/positioning
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  sphere.rotation.x += 0.05;
  sphere.rotation.y += 0.075;
  sphere.rotation.z += 0.05;

  profile.rotation.y += 0.01;
  profile.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  
  controls.update();
  renderer.render(scene, camera);
};

animate();


