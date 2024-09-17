import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'; //allows to move around the scene --need to add to the code



const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

//positioning
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera);

//material, geometry
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);



//torus
scene.add(torus)


//objects
const pointLight = new THREE.PointLight(0xffffff); //0 for a hexidecimal liberal
pointLight.position.set(10,10,10) //the higher the number, the further the light goes from the object.

const ambientLight = new THREE.AmbientLight(0xffffff); //lights up entire scene
scene.add(pointLight, ambientLight) //i gotta add EVERY object to scene!!

const lightHelper = new THREE.PointLightHelper(pointLight) //shows a lil cam with light
const gridHelper =  new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)


const controls = new OrbitControls(camera, renderer.domElement); //adds controls along w import


//STARS
function addStar() {
  const geometry = new THREE.SphereGeometry( 0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial ({color: 0xffffff})
  const star = new THREE.Mesh (geometry, material);
    //random generation of stars
const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100)); //number that random generates from 0 to 100

star.position.set(x,y,z);
scene.add(star);
}

    //how many stars do i want in the scene?
Array(200).fill().forEach(addStar)


//animation
function animate () {
  requestAnimationFrame(animate); //tells the browser I wanna perform an animation

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene,camera);
}

animate()

