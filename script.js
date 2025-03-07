import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/controls/OrbitControls.js';
import * as Tone from 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.26/Tone.min.js';

// ✅ Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ✅ Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 3, 5);
scene.add(light);

// ✅ V.I.B.E. Head (Sphere)
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0xffcc00, metalness: 1, roughness: 0.3 });
const vibeHead = new THREE.Mesh(geometry, material);
scene.add(vibeHead);

// ✅ Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ✅ Render Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// ✅ Play Music
window.playMusic = function() {
    console.log("🎵 Playing R&B...");
    const synth = new Tone.Synth().toDestination();
    Tone.Transport.start();
    synth.triggerAttackRelease("C4", "2n");
};

// ✅ Voice Commands
window.startListening = function() {
    console.log("🎙️ Listening...");

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log("User said:", command);
        
        if (command.includes("play music")) playMusic();
        if (command.includes("dance")) vibeDance();
    };
};

// ✅ Dance Animation
window.vibeDance = function() {
    console.log("💃 V.I.B.E. is dancing...");

    let danceMoves = [
        { y: 0.5, duration: 0.2 },
        { y: -0.5, duration: 0.2 },
        { y: 0.3, duration: 0.2 },
        { y: -0.3, duration: 0.2 }
    ];

    let index = 0;
    function move() {
        if (index < danceMoves.length) {
            vibeHead.position.y += danceMoves[index].y;
            setTimeout(() => {
                vibeHead.position.y -= danceMoves[index].y;
                index++;
                move();
            }, danceMoves[index].duration * 1000);
        }
    }
    move();
};

// ✅ Resize Handler
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});