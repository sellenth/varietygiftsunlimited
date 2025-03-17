// game-engine.js - Main game initialization and coordination

import * as THREE from 'three';
import { GameState } from './game-state.js';
import { createGiftBox, createGoal, createChargeIndicator, createLevelIndicator, createCongratsPopup,
         createDeliveryVan, createClock, createOutOfStock } from './models.js';
import { initAudio, setupAudioForMobile, toggleMusic, toggleFx } from './audio.js';
import { createAudioButtons, checkButtonClick, checkButtonHover, animateButtonPress } from './ui.js';
import { handleMouseDown, handleMouseUp, handleMouseMove, handleClick, handleKeyDown, handleKeyUp, 
         handleTouchStart, handleTouchEnd, handleTouchMove } from './input-handlers.js';

// Game variables
let scene, camera, renderer;
let giftBox, grassField;
let gameHeight = 15; // Number of jumps to win
let currentPosition = 0;
let gameWidth = 10; // Arbitrary width units
let isJumping = false;
let level = 1;
let speedMultiplier = 1.0; // Base speed multiplier
let obstacles = [];
let clocksToRotate = [];
let truckSpeedChangeTimers = [];
let debugMode = true; // Enable debug visualization
let hitboxHelpers = []; // Store hitbox visualizers
let levelIndicator; // DOM element for level display
let levelIndicator3D; // Three.js level indicator
let congratsPopup; // Three.js popup for level completion

// Audio objects
let audioListener;
let audioLoader;
let jumpStartSound, jumpLandSound, collisionSound, winSound, bgMusic;
let soundsLoaded = false;
let musicMuted = false;
let fxMuted = false;

// Audio control buttons (Three.js objects)
let musicButton, fxButton;
let raycaster, mouse;

// State machine
let currentState = GameState.IDLE;
let chargeStartTime = 0;
let maxChargeTime = 500; // 1 second max charge
let chargeStrength = 0;
let chargeIndicator;
let jumpQueued = false; // Flag to track queued jump inputs
let inputHeld = false; // Flag to track if input is being held down

// Initialize the game
export function initGame() {
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffe0f0); // Light pink background

  // Create camera (orthographic for top-down view)
  const aspect = window.innerWidth / window.innerHeight;
  const viewSize = 15;
  camera = new THREE.OrthographicCamera(
    -viewSize * aspect / 2, 
    viewSize * aspect / 2, 
    viewSize / 2, 
    -viewSize / 2, 
    0.1, 
    1000
  );
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('game-container').appendChild(renderer.domElement);

  // Create grassy field
  const fieldGeometry = new THREE.PlaneGeometry(gameWidth, gameHeight);
  const fieldMaterial = new THREE.MeshBasicMaterial({ color: 0x66cc66 }); // Green color
  grassField = new THREE.Mesh(fieldGeometry, fieldMaterial);
  grassField.position.set(0, 0, -1);
  scene.add(grassField);

  // Initialize audio
  initAudio(scene, camera, () => {
    // Audio initialized callback
    setupAudioForMobile();
  });

  // Create game elements
  giftBox = createGiftBox(scene, debugMode, hitboxHelpers);
  createHitboxHelper(giftBox); // Add hitbox helper for gift box
  createGoal(scene, gameHeight);
  createObstacles();
  chargeIndicator = createChargeIndicator(scene, gameHeight);
  
  // Create level indicator
  const levelIndicators = createLevelIndicator(scene, level);
  levelIndicator = levelIndicators.domIndicator;
  levelIndicator3D = levelIndicators.threeDIndicator;
  
  // Create audio buttons
  const audioButtons = createAudioButtons(scene, musicMuted, fxMuted);
  musicButton = audioButtons.musicButton;
  fxButton = audioButtons.fxButton;
  
  // Create congrats popup (initially hidden)
  congratsPopup = createCongratsPopup(scene, level);
  
  // Setup raycaster for button interaction
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  
  // Handle window resize
  window.addEventListener('resize', onWindowResize);
  
  // Add event listeners
  setupEventListeners();

  // Start the animation loop
  animate();
}

// Setup event listeners
function setupEventListeners() {
  window.addEventListener('click', (e) => handleClick(e, currentState, (x, y) => checkButtonClick(x, y, camera, congratsPopup, createObstacles), startCharging, releaseJump));
  window.addEventListener('mousedown', (e) => handleMouseDown(e, currentState, (x, y) => checkButtonClick(x, y, camera, congratsPopup, createObstacles), startCharging));
  window.addEventListener('mouseup', (e) => handleMouseUp(e, currentState, releaseJump));
  window.addEventListener('mousemove', (e) => handleMouseMove(e, (x, y) => checkButtonHover(x, y, camera)));
  window.addEventListener('keydown', (e) => handleKeyDown(e, currentState, startCharging));
  window.addEventListener('keyup', (e) => handleKeyUp(e, currentState, releaseJump));
  window.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleTouchStart(e, currentState, (x, y) => checkButtonClick(x, y, camera, congratsPopup, createObstacles), startCharging);
  });
  window.addEventListener('touchend', (e) => {
    e.preventDefault();
    handleTouchEnd(e, currentState, releaseJump);
  });
  window.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleTouchMove(e, (x, y) => checkButtonHover(x, y, camera));
  });
}

// Handle window resize
function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;
  const viewSize = 15;
  
  camera.left = -viewSize * aspect / 2;
  camera.right = viewSize * aspect / 2;
  camera.top = viewSize / 2;
  camera.bottom = -viewSize / 2;
  
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Update level indicator position
  if (levelIndicator3D) {
    levelIndicator3D.position.set(-viewSize * aspect / 2 + 1, -viewSize / 2 + 0.5, 1);
  }
}

// Start charging the jump
function startCharging() {
  // If already jumping, queue the jump for when we land
  if (currentState === GameState.JUMPING) {
    jumpQueued = true;
    inputHeld = true; // Mark that input is being held
    return;
  }
  
  currentState = GameState.CHARGING;
  chargeStartTime = Date.now();
  chargeStrength = 0;
  inputHeld = true; // Mark that input is being held
  
  // Play jump start sound
  if (soundsLoaded && !fxMuted) {
    if (!jumpStartSound.isPlaying) {
      jumpStartSound.play();
    }
  }
  
  // Start charge animation
  animateCharging();
}

// Animate the charging state
function animateCharging() {
  if (currentState === GameState.CHARGING) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - chargeStartTime;
    
    // Calculate charge strength (0 to 1)
    chargeStrength = Math.min(elapsedTime / maxChargeTime, 1);
    
    // Update charge indicator
    chargeIndicator.scale.set(1, chargeStrength, 1);
    
    // Continue animation
    requestAnimationFrame(animateCharging);
  } else {
    // If state changed (e.g., player died), reset charge indicator
    if (currentState === GameState.GAME_OVER || currentState === GameState.IDLE) {
      chargeIndicator.scale.set(1, 0, 1);
    }
  }
}

// Release the jump
function releaseJump() {
  inputHeld = false; // Mark that input is no longer held
  
  if (currentState === GameState.CHARGING) {
    currentState = GameState.JUMPING;
    
    // Reset charge indicator
    chargeIndicator.scale.set(1, 0, 1);
    
    // Play jump release sound
    if (soundsLoaded && !fxMuted) {
      if (!jumpLandSound.isPlaying) {
        jumpLandSound.play();
      }
    }
    
    // Execute jump with charge strength
    playerJump(chargeStrength);
  }
}

// Player jump function
function playerJump(strength = 1) {
  if (currentState === GameState.JUMPING) {
    // Calculate jump distance based on strength with no minimum (pixel precision)
    const jumpDistance = strength * 1.5;
    const targetY = giftBox.position.y + jumpDistance;
    
    // Animation
    const jumpAnimation = () => {
      // Check if game state has changed (e.g., player died)
      if (currentState !== GameState.JUMPING) {
        return; // Stop the animation if state changed
      }
      
      const jumpSpeed = 0.1 * (1 + strength); // Faster jump for stronger charge
      if (giftBox.position.y < targetY) {
        giftBox.position.y += jumpSpeed;
        requestAnimationFrame(jumpAnimation);
      } else {
        giftBox.position.y = Math.min(targetY, gameHeight/2 - 0.5); // Cap at top of screen
        currentState = GameState.IDLE;
        
        // Check if player reached the top
        if (giftBox.position.y >= gameHeight/2 - 1) {
          levelComplete();
        } else {
          // Check if we have a queued jump or if input is still held
          if (jumpQueued || inputHeld) {
            jumpQueued = false;
            // Small delay before starting the next jump
            setTimeout(() => {
              startCharging();
            }, 50);
          }
        }
        
        // Check collision with obstacles
        checkCollisions();
      }
    };
    
    requestAnimationFrame(jumpAnimation);
  }
}

// Check for collisions with obstacles
function checkCollisions() {
  // Don't check collisions if already in GAME_OVER state
  if (currentState === GameState.GAME_OVER) {
    return;
  }
  
  // Create a box3 for the gift box at its current position
  const giftBoxHitbox = giftBox.userData.hitbox.clone();
  giftBoxHitbox.translate(giftBox.position);
  
  for (const obstacle of obstacles) {
    // Get the obstacle's hitbox at its current position
    const obstacleHitbox = obstacle.userData.hitbox.clone();
    obstacleHitbox.translate(obstacle.position);
    
    // Check for intersection
    if (giftBoxHitbox.intersectsBox(obstacleHitbox)) {
      // Collision detected - play sound
      if (soundsLoaded && !fxMuted) {
        if (!collisionSound.isPlaying) {
          collisionSound.play();
        }
      }
      
      // Apply knockback effect
      applyKnockback(obstacle);
      
      
      // Set game over state
      currentState = GameState.GAME_OVER;
      
      // Reset game after a short delay to show knockback
      break;
    }
  }
}

// Apply knockback effect when player is hit
function applyKnockback(obstacle) {
  // Determine knockback direction based on obstacle position relative to player
  const knockbackDirection = Math.sign(giftBox.position.x - obstacle.position.x);
  
  // Move player in the opposite direction of the collision
  giftBox.position.x += knockbackDirection * 0.5;
  
  // Also move slightly down
  giftBox.position.y -= 0.2;
  
  // Update charge indicator position
  if (chargeIndicator) {
    chargeIndicator.position.x = giftBox.position.x + 0.6;
    chargeIndicator.position.y = giftBox.position.y;
  }
  
  // Update hitbox helper
  updateHitboxHelper(giftBox);
}

// Reset the game when player collides with obstacle

// Complete the level
function levelComplete() {
  level++;
  currentState = GameState.LEVEL_COMPLETE;
  
  // Increase speed multiplier by 3% for each level
  speedMultiplier = 1.0 + (level - 1) * 0.03;
  
  // Update level indicator
  if (levelIndicator) {
    levelIndicator.textContent = `Level: ${level}`;
  }
  
  // Update 3D level indicator
  updateLevelIndicator3D();
  
  // Play win sound
  if (soundsLoaded && !fxMuted) {
    if (!winSound.isPlaying) {
      winSound.play();
    }
  }
  
  // Update and show Three.js popup
  updateCongratsPopup(level - 1);
  congratsPopup.visible = true;
  
}

// Update the 3D level indicator text
function updateLevelIndicator3D() {
  // Remove old text if it exists
  if (levelIndicator3D) {
    const oldText = levelIndicator3D.children.find(child => child.userData && child.userData.isLevelText);
    if (oldText) {
      levelIndicator3D.remove(oldText);
    }
    
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
    
    levelIndicator3D.add(textMesh);
  }
}

// Update the congrats popup message
function updateCongratsPopup(completedLevel) {
  // Find the message mesh
  const messageMesh = congratsPopup.children.find(child => child.userData && child.userData.isMessageText);
  
  if (messageMesh) {
    // Create new canvas for updated message
    const messageCanvas = document.createElement('canvas');
    messageCanvas.width = 512;
    messageCanvas.height = 128;
    const messageCtx = messageCanvas.getContext('2d');
    
    // Clear canvas
    messageCtx.fillStyle = 'rgba(255, 255, 255, 0)';
    messageCtx.fillRect(0, 0, messageCanvas.width, messageCanvas.height);
    
    // Draw updated message
    messageCtx.fillStyle = '#333333';
    messageCtx.font = '40px Arial';
    messageCtx.textAlign = 'center';
    messageCtx.textBaseline = 'middle';
    messageCtx.fillText(`You completed level ${completedLevel}!`, messageCanvas.width/2, messageCanvas.height/2);
    
    // Update texture
    if (messageMesh.material.map) {
      messageMesh.material.map.dispose();
    }
    messageMesh.material.map = new THREE.CanvasTexture(messageCanvas);
    messageMesh.material.needsUpdate = true;
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Move obstacles
  obstacles.forEach(obstacle => {
    obstacle.position.x += obstacle.userData.speed;
    
    // Wrap around screen edges
    if (obstacle.position.x > gameWidth/2 + 1) {
      obstacle.position.x = -gameWidth/2 - 1;
    } else if (obstacle.position.x < -gameWidth/2 - 1) {
      obstacle.position.x = gameWidth/2 + 1;
    }
    
    // Rotate clock objects as they move
    if (obstacle.userData.type === 1) { // Clock type
      obstacle.rotation.z += obstacle.userData.speed * -1.0; // Rotate based on movement speed
    }
    
    // Update hitbox helper position
    updateHitboxHelper(obstacle);
    
    // Check for collisions during movement
    if (currentState !== GameState.GAME_OVER && currentState !== GameState.LEVEL_COMPLETE) {
      const giftBoxHitbox = giftBox.userData.hitbox.clone();
      giftBoxHitbox.translate(giftBox.position);
      
      const obstacleHitbox = obstacle.userData.hitbox.clone();
      obstacleHitbox.translate(obstacle.position);
      
      if (giftBoxHitbox.intersectsBox(obstacleHitbox)) {
        // Collision detected during movement
        if (soundsLoaded && !fxMuted) {
          if (!collisionSound.isPlaying) {
            collisionSound.play();
          }
        }
        
        // Apply knockback effect
        applyKnockback(obstacle);
        
        // Set game over state
        currentState = GameState.GAME_OVER;
        
        // Reset game after a short delay to show knockback
        return; // Exit the loop to prevent further processing
      }
    }
  });
  
  // Only continue if game is not over
  if (currentState === GameState.GAME_OVER) {
    return;
  }
  
  // Rotate clock hands
  clocksToRotate.forEach(clock => {
    if (clock.userData.hourHand && clock.userData.minuteHand) {
      clock.userData.hourHand.rotation.z += clock.userData.rotationSpeed.hour;
      clock.userData.minuteHand.rotation.z += clock.userData.rotationSpeed.minute;
    }
  });
  
  // Update charge indicator position to follow gift box horizontally
  if (chargeIndicator) {
    chargeIndicator.position.x = giftBox.position.x + 0.6;
    chargeIndicator.position.y = giftBox.position.y;
  }
  
  // Update gift box hitbox helper
  updateHitboxHelper(giftBox);
  
  renderer.render(scene, camera);
}

// Create a visual helper for hitboxes
function createHitboxHelper(object) {
  if (!object.userData.hitbox) return;
  
  const box = object.userData.hitbox.clone();
  const size = box.getSize(new THREE.Vector3());
  
  const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
  const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000, 
    wireframe: true,
    transparent: true,
    opacity: 0.5
  });
  
  const helper = new THREE.Mesh(geometry, material);
  helper.visible = debugMode;
  
  // Store reference to the object this helper belongs to
  helper.userData.targetObject = object;
  
  // Position helper at the center of the hitbox
  const center = box.getCenter(new THREE.Vector3());
  helper.position.copy(center);
  
  scene.add(helper);
  hitboxHelpers.push(helper);
  
  return helper;
}

// Update hitbox helper position
function updateHitboxHelper(object) {
  const helper = hitboxHelpers.find(h => h.userData.targetObject === object);
  if (!helper) return;
  
  const hitbox = object.userData.hitbox.clone();
  hitbox.translate(object.position);
  
  const center = hitbox.getCenter(new THREE.Vector3());
  helper.position.copy(center);
}

// Create obstacles
function createObstacles() {
  // Clear existing obstacles
  obstacles.forEach(obstacle => scene.remove(obstacle));
  obstacles = [];
  clocksToRotate = [];
  
  // Clear any existing truck speed change timers
  truckSpeedChangeTimers.forEach(timer => clearTimeout(timer));
  truckSpeedChangeTimers = [];
  
  // Create 6 rows of obstacles (delivery vans, clocks, "out of stock" text)
  for (let i = 1; i < gameHeight - 1; i += 2) {
    const y = -gameHeight/2 + i + 1;
    
    // Randomly choose obstacle type
    const obstacleType = Math.floor(Math.random() * 3);
    let obstacle;
    
    switch (obstacleType) {
      case 0: // Delivery van
        obstacle = createDeliveryVan();
        setupTruckSpeedChanges(obstacle);
        break;
      case 1: // Clock
        obstacle = createClock();
        clocksToRotate.push(obstacle);
        break;
      case 2: // "Out of stock" text
        obstacle = createOutOfStock();
        break;
    }
    
    // Random starting position
    const x = Math.random() * gameWidth - gameWidth/2;
    obstacle.position.set(x, y, 0);
    
    // Random direction (1: right, -1: left)
    const direction = i % 4 === 0 ? -1 : 1;
    const baseSpeed = (Math.random() * 0.05 + 0.02) * speedMultiplier;
    
    obstacle.userData = {
      speed: baseSpeed * direction,
      baseSpeed: baseSpeed,
      direction: direction,
      type: obstacleType
    };
    
    // Add collision geometry based on obstacle type
    if (obstacleType === 0) { // Delivery van
      const hitboxWidth = 1.8; // Slightly smaller than visual size
      const hitboxHeight = 0.7;
      obstacle.userData.hitbox = new THREE.Box3(
        new THREE.Vector3(-hitboxWidth/2, -hitboxHeight/2, -0.4),
        new THREE.Vector3(hitboxWidth/2, hitboxHeight/2, 0.4)
      );
    } else if (obstacleType === 1) { // Clock
      const radius = 0.45; // Slightly smaller than visual size
      obstacle.userData.hitbox = new THREE.Box3(
        new THREE.Vector3(-radius, -radius, -0.1),
        new THREE.Vector3(radius, radius, 0.1)
      );
    } else { // Out of stock
      const hitboxSize = 0.9;
      obstacle.userData.hitbox = new THREE.Box3(
        new THREE.Vector3(-hitboxSize/2, -hitboxSize/2, -0.1),
        new THREE.Vector3(hitboxSize/2, hitboxSize/2, 0.1)
      );
    }
    
    // Create hitbox helper
    createHitboxHelper(obstacle);
    
    obstacles.push(obstacle);
    scene.add(obstacle);
  }
}

// Setup random speed changes for trucks
function setupTruckSpeedChanges(truck) {
  const createSpeedChange = () => {
    const timer = setTimeout(() => {
      // Random speed multiplier between 0.5 and 2
      const randomSpeedMultiplier = 0.5 + Math.random() * 1.5;
      truck.userData.speed = truck.userData.baseSpeed * truck.userData.direction * randomSpeedMultiplier;
      
      // Schedule next speed change
      const nextChangeTimer = createSpeedChange();
      truckSpeedChangeTimers.push(nextChangeTimer);
    }, 2000 + Math.random() * 3000); // Random time between 2-5 seconds
    
    return timer;
  };
  
  const initialTimer = createSpeedChange();
  truckSpeedChangeTimers.push(initialTimer);
}

// Export game variables and functions for other modules
export {
  scene, camera, renderer, giftBox, gameHeight, gameWidth, level, speedMultiplier,
  obstacles, clocksToRotate, truckSpeedChangeTimers, hitboxHelpers, debugMode,
  audioListener, audioLoader, jumpStartSound, jumpLandSound, collisionSound, winSound, bgMusic,
  soundsLoaded, musicMuted, fxMuted, musicButton, fxButton, raycaster, mouse,
  currentState, chargeIndicator, chargeStrength, createHitboxHelper, updateHitboxHelper,
  inputHeld // Export the inputHeld state
}; 