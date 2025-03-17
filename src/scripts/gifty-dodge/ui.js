// ui.js - UI elements and interactions

import * as THREE from 'three';
import { createTextureCanvas } from './models.js';
import { toggleMusic, toggleFx, musicMuted, fxMuted } from './audio.js';

// UI variables
let musicButton, fxButton;
let raycaster, mouse;

// Create Three.js audio control buttons
export function createAudioButtons(scene, isMusicMuted, isFxMuted) {
  // Music button
  const musicGeometry = new THREE.CircleGeometry(0.4, 16);
  const musicMaterial = new THREE.MeshBasicMaterial({ 
    color: isMusicMuted ? 0x969696 : 0xf2f60d, // Gray if muted, yellow if not
    transparent: true,
    opacity: 0.8
  });
  musicButton = new THREE.Mesh(musicGeometry, musicMaterial);
  
  // Position in top-right corner of screen
  const aspect = window.innerWidth / window.innerHeight;
  const viewSize = 15;
  musicButton.position.set(viewSize * aspect / 2 - 0.5, viewSize / 2 - 1, 1);
  scene.add(musicButton);
  
  // Music icon (note symbol)
  const noteGeometry = new THREE.PlaneGeometry(0.8, 0.8);
  const noteTexture = new THREE.CanvasTexture(createTextureCanvas(isMusicMuted ? '🔇' : '🎵'));
  const noteMaterial = new THREE.MeshBasicMaterial({ 
    map: noteTexture,
    transparent: true
  });
  const noteIcon = new THREE.Mesh(noteGeometry, noteMaterial);
  noteIcon.position.set(0, 0, 0.01);
  musicButton.add(noteIcon);
  
  // Add a highlight effect for better visual feedback
  const musicHighlightGeometry = new THREE.RingGeometry(0.8, 0.9, 32);
  const musicHighlightMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
  });
  const musicHighlight = new THREE.Mesh(musicHighlightGeometry, musicHighlightMaterial);
  musicHighlight.position.set(0, 0, 0.005);
  musicHighlight.visible = false;
  musicButton.add(musicHighlight);
  
  // Store reference to icon for updating
  musicButton.userData = {
    icon: noteIcon,
    highlight: musicHighlight,
    type: 'music',
    muted: isMusicMuted,
    isHovered: false
  };
  
  // Sound effects button
  const fxGeometry = new THREE.CircleGeometry(0.4, 32);
  const fxMaterial = new THREE.MeshBasicMaterial({ 
    color: isFxMuted ? 0x969696 : 0xf2f60d, // Gray if muted, yellow if not
    transparent: true,
    opacity: 0.8
  });
  fxButton = new THREE.Mesh(fxGeometry, fxMaterial);
  
  // Position next to music button
  fxButton.position.set(viewSize * aspect / 2 - 1.5, viewSize / 2 - 1, 1);
  scene.add(fxButton);
  
  // Sound icon
  const soundGeometry = new THREE.PlaneGeometry(0.8, 0.8);
  const soundTexture = new THREE.CanvasTexture(createTextureCanvas(isFxMuted ? '🔇' : '🔊'));
  const soundMaterial = new THREE.MeshBasicMaterial({ 
    map: soundTexture,
    transparent: true
  });
  const soundIcon = new THREE.Mesh(soundGeometry, soundMaterial);
  soundIcon.position.set(0, 0, 0.01);
  fxButton.add(soundIcon);
  
  // Add a highlight effect for better visual feedback
  const fxHighlightGeometry = new THREE.RingGeometry(0.8, 0.9, 32);
  const fxHighlightMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
  });
  const fxHighlight = new THREE.Mesh(fxHighlightGeometry, fxHighlightMaterial);
  fxHighlight.position.set(0, 0, 0.005);
  fxHighlight.visible = false;
  fxButton.add(fxHighlight);
  
  // Store reference to icon for updating
  fxButton.userData = {
    icon: soundIcon,
    highlight: fxHighlight,
    type: 'fx',
    muted: isFxMuted,
    isHovered: false
  };
  
  // Initialize raycaster and mouse
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  
  return { musicButton, fxButton, raycaster, mouse };
}

// Handle button clicks
export function checkButtonClick(x, y, camera, congratsPopup, createObstacles) {
  console.log("Checking button click at:", x, y);
  
  // Convert screen coordinates to normalized device coordinates
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;
  
  console.log("Normalized coordinates:", mouse.x, mouse.y);
  
  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  
  // Get all interactive objects
  const interactiveObjects = [musicButton, fxButton];
  
  // Add popup button if popup is visible
  if (congratsPopup && congratsPopup.visible) {
    const popupButton = congratsPopup.children.find(child => child.userData && child.userData.isButton);
    if (popupButton) {
      interactiveObjects.push(popupButton);
    }
  }
  
  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(interactiveObjects, true);
  
  console.log("Intersections found:", intersects.length);
  
  if (intersects.length > 0) {
    const button = intersects[0].object;
    console.log("Intersected object:", button);
    
    // Check if we hit a button or its child
    const targetButton = button.userData && (button.userData.type || button.userData.isButton || button.userData.isButtonText) 
      ? button 
      : button.parent;
    
    console.log("Target button:", targetButton);
    
    if (targetButton && targetButton.userData && targetButton.userData.type === 'music') {
      console.log("Music button clicked");
      // Visual feedback - scale animation
      animateButtonPress(musicButton);
      
      // Toggle music state
      const newMutedState = toggleMusic();
      
      // Update button appearance
      updateMusicButtonAppearance(newMutedState);
      
      return true;
    } else if (targetButton && targetButton.userData && targetButton.userData.type === 'fx') {
      console.log("FX button clicked");
      // Visual feedback - scale animation
      animateButtonPress(fxButton);
      
      // Toggle FX state
      const newMutedState = toggleFx();
      
      // Update button appearance
      updateFxButtonAppearance(newMutedState);
      
      return true;
    } else if (targetButton && (targetButton.userData.isButton || targetButton.userData.isButtonText)) {
      console.log("Popup button clicked");
      // Visual feedback - scale animation
      animateButtonPress(targetButton);
      
      // Hide popup and create new obstacles
      if (congratsPopup) {
        congratsPopup.visible = false;
        if (createObstacles) {
          createObstacles();
        }
      }
      
      return true;
    }
  }
  
  return false;
}

// Update music button appearance
function updateMusicButtonAppearance(muted) {
  if (muted) {
    // Update button appearance
    musicButton.material.color.set(0x969696); // Gray
    const muteTexture = new THREE.CanvasTexture(createTextureCanvas('🔇'));
    musicButton.userData.icon.material.map = muteTexture;
    musicButton.userData.icon.material.needsUpdate = true;
  } else {
    // Update button appearance
    musicButton.material.color.set(0xf2f60d); // Yellow
    const musicTexture = new THREE.CanvasTexture(createTextureCanvas('🎵'));
    musicButton.userData.icon.material.map = musicTexture;
    musicButton.userData.icon.material.needsUpdate = true;
  }
  
  musicButton.userData.muted = muted;
}

// Update FX button appearance
function updateFxButtonAppearance(muted) {
  if (muted) {
    // Update button appearance
    fxButton.material.color.set(0x969696); // Gray
    const muteTexture = new THREE.CanvasTexture(createTextureCanvas('🔇'));
    fxButton.userData.icon.material.map = muteTexture;
    fxButton.userData.icon.material.needsUpdate = true;
  } else {
    // Update button appearance
    fxButton.material.color.set(0xf2f60d); // Yellow
    const fxTexture = new THREE.CanvasTexture(createTextureCanvas('🔊'));
    fxButton.userData.icon.material.map = fxTexture;
    fxButton.userData.icon.material.needsUpdate = true;
  }
  
  fxButton.userData.muted = muted;
}

// Check for button hover
export function checkButtonHover(x, y, camera) {
  // Convert screen coordinates to normalized device coordinates
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;
  
  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  
  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects([musicButton, fxButton], true);
  
  // Reset hover states
  if (musicButton.userData.isHovered) {
    musicButton.userData.isHovered = false;
    musicButton.userData.highlight.visible = false;
  }
  
  if (fxButton.userData.isHovered) {
    fxButton.userData.isHovered = false;
    fxButton.userData.highlight.visible = false;
  }
  
  // Set hover state for intersected button
  if (intersects.length > 0) {
    const button = intersects[0].object;
    const targetButton = button.userData.type ? button : button.parent;
    
    targetButton.userData.isHovered = true;
    targetButton.userData.highlight.visible = true;
  }
}

// Animate button press
export function animateButtonPress(button) {
  // Save original scale
  const originalScale = button.scale.clone();
  
  // Scale down
  button.scale.set(0.9, 0.9, 0.9);
  
  // Scale back up after a short delay
  setTimeout(() => {
    button.scale.copy(originalScale);
  }, 100);
  
  // Add highlight effect for popup button
  if (button.userData && (button.userData.isButton || button.userData.isButtonText)) {
    // Change color temporarily
    const originalColor = button.material.color.clone();
    button.material.color.set(0xff4da6); // Lighter pink
    
    // Restore original color after delay
    setTimeout(() => {
      button.material.color.copy(originalColor);
    }, 100);
  }
}

// Export UI objects
export {
  musicButton, fxButton, raycaster, mouse
}; 