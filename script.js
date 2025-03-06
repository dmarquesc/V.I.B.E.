function playMusic() {
    console.log("🎵 Playing R&B...");
    // Add Tone.js logic here to play music
}

function startListening() {
    console.log("🎙️ Voice command activated...");
    // Add Web Speech API logic here
}

function vibeDance() {
    console.log("💃 V.I.B.E. is dancing...");
    // Add animation logic for Three.js model
}
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/controls/OrbitControls.js';

// ✅ Create Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ✅ Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 3, 5);
scene.add(light);

// ✅ Create V.I.B.E.’s Head (Basic Sphere for Now)
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1, roughness: 0.3 });
const vibeHead = new THREE.Mesh(geometry, material);
scene.add(vibeHead);

// ✅ Orbit Controls (User Interaction)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ✅ Render Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();