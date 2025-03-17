// audio.js - Audio handling functions

import * as THREE from 'three';
import { createTextureCanvas } from './models.js';

// Audio objects
let audioListener;
let audioLoader;
let jumpStartSound, jumpLandSound, collisionSound, winSound, bgMusic;
let soundsLoaded = false;
let musicMuted = false;
let fxMuted = false;

// Initialize Three.js audio system
export function initAudio(scene, camera, callback) {
  // Create audio listener and attach to camera
  audioListener = new THREE.AudioListener();
  camera.add(audioListener);
  
  // Create audio loader
  audioLoader = new THREE.AudioLoader();
  
  // Create sound objects
  jumpStartSound = new THREE.Audio(audioListener);
  jumpLandSound = new THREE.Audio(audioListener);
  collisionSound = new THREE.Audio(audioListener);
  winSound = new THREE.Audio(audioListener);
  
  // Create background music (positional audio for better control)
  bgMusic = new THREE.PositionalAudio(audioListener);
  
  // Load sound files
  let loadedCount = 0;
  const totalSounds = 5;
  
  // Helper function to track loading progress
  const onSoundLoaded = () => {
    loadedCount++;
    if (loadedCount === totalSounds) {
      soundsLoaded = true;
      console.log("All sounds loaded");
      
      if (callback) callback();
    }
  };
  
  // Load jump start sound
  audioLoader.load('/gifty-dodge/jump-press.mp3', function(buffer) {
    jumpStartSound.setBuffer(buffer);
    jumpStartSound.setVolume(1.0);
    onSoundLoaded();
  });
  
  // Load jump land sound
  audioLoader.load('/gifty-dodge/jump-release.mp3', function(buffer) {
    jumpLandSound.setBuffer(buffer);
    jumpLandSound.setVolume(1.0);
    onSoundLoaded();
  });
  
  // Load collision sound
  audioLoader.load('/gifty-dodge/ow.mp3', function(buffer) {
    collisionSound.setBuffer(buffer);
    collisionSound.setVolume(1.0);
    onSoundLoaded();
  });
  
  // Load win sound
  audioLoader.load('/gifty-dodge/yay.mp3', function(buffer) {
    winSound.setBuffer(buffer);
    winSound.setVolume(1.0);
    onSoundLoaded();
  });
  
  // Load background music
  audioLoader.load('/gifty-dodge/boba-date.mp3', function(buffer) {
    bgMusic.setBuffer(buffer);
    bgMusic.setVolume(0.25);
    bgMusic.setLoop(true);
    bgMusic.setRefDistance(20); // Adjust as needed
    
    // Add music to scene
    const musicDummy = new THREE.Object3D();
    musicDummy.position.set(0, 0, 0);
    musicDummy.add(bgMusic);
    scene.add(musicDummy);
    
    onSoundLoaded();
  });
  
  // Fallback in case loading takes too long
  setTimeout(() => {
    if (!soundsLoaded) {
      soundsLoaded = true;
      console.log("Sound loading timeout - proceeding anyway");
      
      if (callback) callback();
    }
  }, 5000);
}

// Setup audio for mobile devices
export function setupAudioForMobile() {
  console.log("Setting up audio for mobile/first interaction");
  
  // Create a function to unlock audio context
  const unlockAudioContext = () => {
    // Resume the audio context if it's suspended
    if (audioListener.context.state === 'suspended') {
      audioListener.context.resume().then(() => {
        console.log("AudioContext resumed successfully");
      });
    }
    
    // Start background music if not muted
    if (!musicMuted && soundsLoaded) {
      console.log("Starting background music on first interaction");
      if (!bgMusic.isPlaying) {
        bgMusic.play();
      }
    }
    
    // Remove the event listeners after first interaction
    document.removeEventListener('touchstart', unlockAudioContext, true);
    document.removeEventListener('touchend', unlockAudioContext, true);
    document.removeEventListener('click', unlockAudioContext, true);
    document.removeEventListener('keydown', unlockAudioContext, true);
  };
  
  // Add event listeners for user interaction
  document.addEventListener('touchstart', unlockAudioContext, true);
  document.addEventListener('touchend', unlockAudioContext, true);
  document.addEventListener('click', unlockAudioContext, true);
  document.addEventListener('keydown', unlockAudioContext, true);
  
  // Try to unlock immediately if possible
  unlockAudioContext();
}

// Toggle music
export function toggleMusic() {
  musicMuted = !musicMuted;
  console.log("Music toggle activated, new state:", musicMuted);
  
  if (musicMuted) {
    // Pause background music
    if (bgMusic.isPlaying) {
      bgMusic.pause();
    }
    console.log("Music paused");
  } else {
    // Play background music
    if (soundsLoaded && !bgMusic.isPlaying) {
      bgMusic.play();
    }
    console.log("Music playing");
  }
  
  return musicMuted;
}

// Toggle sound effects
export function toggleFx() {
  fxMuted = !fxMuted;
  console.log("FX toggle activated, new state:", fxMuted);
  
  if (fxMuted) {
    // Mute sound effects
    jumpStartSound.setVolume(0);
    jumpLandSound.setVolume(0);
    collisionSound.setVolume(0);
    winSound.setVolume(0);
    console.log("FX muted");
  } else {
    // Unmute sound effects
    jumpStartSound.setVolume(1);
    jumpLandSound.setVolume(1);
    collisionSound.setVolume(1);
    winSound.setVolume(1);
    console.log("FX unmuted");
  }
  
  return fxMuted;
}

// Export audio objects
export {
  audioListener, audioLoader, jumpStartSound, jumpLandSound, collisionSound, winSound, bgMusic,
  soundsLoaded, musicMuted, fxMuted
}; 