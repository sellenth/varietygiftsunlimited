// models.js - 3D model creation functions

import * as THREE from 'three';

// Create the gift box character
export function createGiftBox(scene, debugMode, hitboxHelpers) {
  // Gift box body
  const boxGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff69b4 }); // Hot pink
  const giftBox = new THREE.Mesh(boxGeometry, boxMaterial);
  
  // Gift box ribbon (cross on top)
  const ribbonGeometry1 = new THREE.BoxGeometry(0.9, 0.1, 0.1);
  const ribbonGeometry2 = new THREE.BoxGeometry(0.1, 0.9, 0.1);
  const ribbonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  
  const ribbonH = new THREE.Mesh(ribbonGeometry1, ribbonMaterial);
  ribbonH.position.set(0, 0, 0.45);
  
  const ribbonV = new THREE.Mesh(ribbonGeometry2, ribbonMaterial);
  ribbonV.position.set(0, 0, 0.45);
  
  // Create gift box group
  const giftBoxGroup = new THREE.Group();
  giftBoxGroup.add(giftBox);
  giftBoxGroup.add(ribbonH);
  giftBoxGroup.add(ribbonV);
  
  // Position at bottom of the screen
  giftBoxGroup.position.set(0, -7.5 + 0.5, 0); // -gameHeight/2 + 0.5
  
  // Add collision geometry (for better hitbox)
  const hitboxSize = .75; // Increased from 0.7 to make hitbox bigger
  giftBoxGroup.userData.hitbox = new THREE.Box3(
    new THREE.Vector3(-hitboxSize/2, -hitboxSize/2, -hitboxSize/2),
    new THREE.Vector3(hitboxSize/2, hitboxSize/2, hitboxSize/2)
  );
  
  scene.add(giftBoxGroup);
  
  // Create debug visualization for hitbox (will be handled by game-engine)
  
  return giftBoxGroup;
}

// Create finish line (hands)
export function createGoal(scene, gameHeight) {
  // Create a more detailed hand model
  const handGroup = new THREE.Group();
  
  // Palm
  const palmGeometry = new THREE.BoxGeometry(1, 0.6, 0.2);
  const skinMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc99 }); // Skin tone
  const palm = new THREE.Mesh(palmGeometry, skinMaterial);
  handGroup.add(palm);
  
  // Fingers
  for (let i = 0; i < 4; i++) {
    const fingerGeometry = new THREE.BoxGeometry(0.15, 0.4, 0.15);
    const finger = new THREE.Mesh(fingerGeometry, skinMaterial);
    finger.position.set(-0.35 + i * 0.23, 0.5, 0);
    handGroup.add(finger);
  }
  
  // Thumb
  const thumbGeometry = new THREE.BoxGeometry(0.15, 0.3, 0.15);
  const thumb = new THREE.Mesh(thumbGeometry, skinMaterial);
  thumb.position.set(-0.55, 0.2, 0);
  thumb.rotation.z = Math.PI / 4;
  handGroup.add(thumb);
  
  // Create left and right hands
  const leftHand = handGroup.clone();
  leftHand.position.set(-1.5, gameHeight/2 - 0.5, 0);
  leftHand.rotation.z = Math.PI; // Rotate 180 degrees
  
  const rightHand = handGroup.clone();
  rightHand.scale.x = -1; // Mirror for right hand
  rightHand.position.set(1.5, gameHeight/2 - 0.5, 0);
  rightHand.rotation.z = Math.PI; // Rotate 180 degrees
  
  scene.add(leftHand);
  scene.add(rightHand);
  
  return { leftHand, rightHand };
}

// Create obstacles
export function createObstacles() {
  // This function will be implemented in game-engine.js
  // since it requires access to many game variables
  return [];
}

// Create a delivery van obstacle
export function createDeliveryVan() {
  const van = new THREE.Group();
  
  // Van body
  const bodyGeometry = new THREE.BoxGeometry(2, 0.8, 0.8);
  const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x4285f4 }); // Blue
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  
  // Windshield - moved to the other side
  const windshieldGeometry = new THREE.PlaneGeometry(0.6, 0.4);
  const windshieldMaterial = new THREE.MeshBasicMaterial({ color: 0xadd8e6 }); // Light blue
  const windshield = new THREE.Mesh(windshieldGeometry, windshieldMaterial);
  windshield.position.set(0.5, 0.1, 0.41); // Changed from -0.5 to 0.5
  
  // Windshield frame
  const frameGeometry = new THREE.BoxGeometry(0.65, 0.45, 0.02);
  const frameMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.set(0.5, 0.1, 0.4); // Changed from -0.5 to 0.5
  
  // Wheels
  const wheelGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 16);
  wheelGeometry.rotateX(Math.PI / 2);
  const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 });
  
  const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheel1.position.set(-0.6, -0.4, 0);
  
  const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheel2.position.set(0.6, -0.4, 0);
  
  van.add(body);
  van.add(frame);
  van.add(windshield);
  van.add(wheel1);
  van.add(wheel2);
  
  return van;
}

// Create a clock obstacle
export function createClock() {
  const clock = new THREE.Group();
  
  // Clock face
  const faceGeometry = new THREE.CircleGeometry(0.5, 32);
  const faceMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const face = new THREE.Mesh(faceGeometry, faceMaterial);
  
  // Clock outline
  const outlineGeometry = new THREE.RingGeometry(0.48, 0.5, 32);
  const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
  outline.position.set(0, 0, 0.01);
  
  // Clock hands
  const hourHandGeometry = new THREE.PlaneGeometry(0.05, 0.3);
  const hourHandMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const hourHand = new THREE.Mesh(hourHandGeometry, hourHandMaterial);
  hourHand.position.set(0, 0.025, 0.02);
  hourHand.rotation.z = Math.random() * Math.PI * 2;
  
  const minuteHandGeometry = new THREE.PlaneGeometry(0.03, 0.4);
  const minuteHandMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const minuteHand = new THREE.Mesh(minuteHandGeometry, minuteHandMaterial);
  minuteHand.position.set(0, 0.15, 0.03);
  minuteHand.rotation.z = Math.random() * Math.PI * 2;
  
  clock.add(face);
  clock.add(outline);
  clock.add(hourHand);
  clock.add(minuteHand);
  
  // Store references to hands for rotation
  clock.userData.hourHand = hourHand;
  clock.userData.minuteHand = minuteHand;
  clock.userData.rotationSpeed = {
    hour: 0.001 + Math.random() * 0.002,
    minute: 0.003 + Math.random() * 0.005
  };
  
  return clock;
}

// Create "Out of Stock" text
export function createOutOfStock() {
  const textGroup = new THREE.Group();
  
  // Background rectangle - reduced width
  const bgGeometry = new THREE.PlaneGeometry(1.4, 0.8); // Changed from 1.8 to 1.4
  const bgMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const background = new THREE.Mesh(bgGeometry, bgMaterial);
  
  // Red border - reduced width
  const borderGeometry = new THREE.PlaneGeometry(1.4, 0.8); // Changed from 1.8 to 1.4
  const borderMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    transparent: true,
    opacity: 0.2
  });
  const border = new THREE.Mesh(borderGeometry, borderMaterial);
  border.position.set(0, 0, 0.01);
  
  // Create text using canvas texture
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.fillStyle = 'rgba(255, 255, 255, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw text - stacked vertically to take less horizontal space
  ctx.fillStyle = '#ff0000';
  ctx.font = 'bold 32px Arial'; // Slightly smaller font
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('OUT', canvas.width/2, canvas.height/2 - 30);
  ctx.fillText('OF', canvas.width/2, canvas.height/2);
  ctx.fillText('STOCK', canvas.width/2, canvas.height/2 + 30);
  
  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  const textMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true
  });
  
  // Reduced width
  const textPlane = new THREE.PlaneGeometry(1.2, 0.7); // Changed from 1.6 to 1.2
  const textMesh = new THREE.Mesh(textPlane, textMaterial);
  textMesh.position.set(0, 0, 0.02);
  
  textGroup.add(background);
  textGroup.add(border);
  textGroup.add(textMesh);
  
  return textGroup;
}

// Create charge indicator
export function createChargeIndicator(scene, gameHeight) {
  const geometry = new THREE.BoxGeometry(0.1, 0.5, 0.1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const chargeIndicator = new THREE.Mesh(geometry, material);
  chargeIndicator.position.set(0.6, -gameHeight/2 + 0.5, 0);
  chargeIndicator.scale.set(1, 0, 1); // Start with no height
  scene.add(chargeIndicator);
  
  return chargeIndicator;
}

// Create level indicator
export function createLevelIndicator(scene, level) {
  // Create DOM element for level indicator (keep for fallback)
  const domIndicator = document.createElement('div');
  domIndicator.id = 'level-indicator';
  domIndicator.textContent = `Level: ${level}`;
  document.body.appendChild(domIndicator);
  
  // Create 3D level indicator
  const threeDIndicator = new THREE.Group();
  
  // Background rectangle
  const bgGeometry = new THREE.PlaneGeometry(1.6, 0.6);
  const bgMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xff69b4,
    transparent: true,
    opacity: 0.8
  });
  const background = new THREE.Mesh(bgGeometry, bgMaterial);
  
  // Add border
  const borderGeometry = new THREE.PlaneGeometry(1.65, 0.65);
  const borderMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffffff,
    transparent: true,
    opacity: 0.5
  });
  const border = new THREE.Mesh(borderGeometry, borderMaterial);
  border.position.set(0, 0, -0.01);
  
  threeDIndicator.add(border);
  threeDIndicator.add(background);
  
  // Create text using canvas texture
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.fillStyle = 'rgba(255, 255, 255, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`LEVEL: ${level}`, canvas.width/2, canvas.height/2);
  
  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  const textMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true
  });
  
  const textPlane = new THREE.PlaneGeometry(1.5, 0.5);
  const textMesh = new THREE.Mesh(textPlane, textMaterial);
  textMesh.position.set(0, 0, 0.01);
  textMesh.userData = { isLevelText: true };
  
  threeDIndicator.add(textMesh);
  
  // Position at bottom left
  const aspect = window.innerWidth / window.innerHeight;
  const viewSize = 15;
  threeDIndicator.position.set(-viewSize * aspect / 2 + 1, -viewSize / 2 + 0.5, 1);
  
  scene.add(threeDIndicator);
  
  return { domIndicator, threeDIndicator };
}

// Create Three.js popup (initially hidden)
export function createCongratsPopup(scene, level) {
  // Create a new group for the popup
  const congratsPopup = new THREE.Group();
  
  // Create a background rectangle with pink border
  const bgGeometry = new THREE.PlaneGeometry(6, 4);
  const bgMaterial = new THREE.MeshBasicMaterial({ color: 0xffe0f0 }); // Light pink
  const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
  congratsPopup.add(bgMesh);
  
  // Add border
  const borderGeometry = new THREE.PlaneGeometry(6.2, 4.2);
  const borderMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xff69b4, // Hot pink
    transparent: true,
    opacity: 0.8
  });
  const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
  borderMesh.position.z = -0.01;
  congratsPopup.add(borderMesh);
  
  // Create title text
  const titleCanvas = document.createElement('canvas');
  titleCanvas.width = 512;
  titleCanvas.height = 128;
  const titleCtx = titleCanvas.getContext('2d');
  
  // Clear canvas
  titleCtx.fillStyle = 'rgba(255, 255, 255, 0)';
  titleCtx.fillRect(0, 0, titleCanvas.width, titleCanvas.height);
  
  // Draw title
  titleCtx.fillStyle = '#ff69b4'; // Hot pink
  titleCtx.font = 'bold 60px Arial';
  titleCtx.textAlign = 'center';
  titleCtx.textBaseline = 'middle';
  titleCtx.fillText('CONGRATULATIONS!', titleCanvas.width/2, titleCanvas.height/2);
  
  // Create texture from canvas
  const titleTexture = new THREE.CanvasTexture(titleCanvas);
  const titleMaterial = new THREE.MeshBasicMaterial({
    map: titleTexture,
    transparent: true
  });
  
  // Create title mesh
  const titlePlane = new THREE.PlaneGeometry(5, 1);
  const titleMesh = new THREE.Mesh(titlePlane, titleMaterial);
  titleMesh.position.set(0, 1, 0.01);
  
  congratsPopup.add(titleMesh);
  
  // Create message text (will be updated for each level)
  const messageCanvas = document.createElement('canvas');
  messageCanvas.width = 512;
  messageCanvas.height = 128;
  const messageCtx = messageCanvas.getContext('2d');
  
  // Clear canvas
  messageCtx.fillStyle = 'rgba(255, 255, 255, 0)';
  messageCtx.fillRect(0, 0, messageCanvas.width, messageCanvas.height);
  
  // Draw message
  messageCtx.fillStyle = '#333333';
  messageCtx.font = '40px Arial';
  messageCtx.textAlign = 'center';
  messageCtx.textBaseline = 'middle';
  messageCtx.fillText(`You completed level ${level}!`, messageCanvas.width/2, messageCanvas.height/2);
  
  // Create texture from canvas
  const messageTexture = new THREE.CanvasTexture(messageCanvas);
  const messageMaterial = new THREE.MeshBasicMaterial({
    map: messageTexture,
    transparent: true
  });
  
  // Create message mesh
  const messagePlane = new THREE.PlaneGeometry(5, 1);
  const messageMesh = new THREE.Mesh(messagePlane, messageMaterial);
  messageMesh.position.set(0, 0, 0.01);
  messageMesh.userData = { isMessageText: true };
  
  congratsPopup.add(messageMesh);
  
  // Create button
  const buttonGeometry = new THREE.PlaneGeometry(2.5, 0.8);
  const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0xff69b4 }); // Hot pink
  const buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
  buttonMesh.position.set(0, -1, 0.01);
  buttonMesh.userData = { isButton: true };
  
  congratsPopup.add(buttonMesh);
  
  // Create button text
  const buttonCanvas = document.createElement('canvas');
  buttonCanvas.width = 256;
  buttonCanvas.height = 128;
  const buttonCtx = buttonCanvas.getContext('2d');
  
  // Clear canvas
  buttonCtx.fillStyle = 'rgba(255, 255, 255, 0)';
  buttonCtx.fillRect(0, 0, buttonCanvas.width, buttonCanvas.height);
  
  // Draw button text
  buttonCtx.fillStyle = '#ffffff';
  buttonCtx.font = 'bold 40px Arial';
  buttonCtx.textAlign = 'center';
  buttonCtx.textBaseline = 'middle';
  buttonCtx.fillText('NEXT LEVEL', buttonCanvas.width/2, buttonCanvas.height/2);
  
  // Create texture from canvas
  const buttonTexture = new THREE.CanvasTexture(buttonCanvas);
  const buttonTextMaterial = new THREE.MeshBasicMaterial({
    map: buttonTexture,
    transparent: true
  });
  
  // Create button text mesh
  const buttonTextPlane = new THREE.PlaneGeometry(2.4, 0.7);
  const buttonTextMesh = new THREE.Mesh(buttonTextPlane, buttonTextMaterial);
  buttonTextMesh.position.set(0, 0, 0.01);
  buttonTextMesh.userData = { isButtonText: true };
  
  buttonMesh.add(buttonTextMesh);
  
  // Position the popup in front of everything
  congratsPopup.position.set(0, 0, 5);
  congratsPopup.visible = false;
  
  // Add the popup to the scene
  scene.add(congratsPopup);
  
  return congratsPopup;
}

// Create a canvas texture with emoji
export function createTextureCanvas(emoji) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw emoji
  ctx.fillStyle = 'white';
  ctx.font = '80px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);
  
  return canvas;
} 