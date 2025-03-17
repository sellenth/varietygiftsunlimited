// input-handlers.js - User input event handlers

import { GameState } from './game-state.js';

// Handle mouse down event
export function handleMouseDown(e, currentState, checkButtonClick, startCharging) {
  // Check if we clicked a button
  if (checkButtonClick(e.clientX, e.clientY)) {
    e.preventDefault();
    e.stopPropagation();
    return; // Button was clicked, don't process game action
  }
  
  // Always call startCharging - it will handle the state internally
  startCharging();
}

// Handle mouse up event
export function handleMouseUp(e, currentState, releaseJump) {
  // Always call releaseJump - it will handle the state internally
  releaseJump();
}

// Handle mouse move event for button hover
export function handleMouseMove(e, checkButtonHover) {
  checkButtonHover(e.clientX, e.clientY);
}

// Handle click event (for compatibility)
export function handleClick(e, currentState, checkButtonClick, startCharging, releaseJump) {
  // Check if we clicked a button
  if (checkButtonClick(e.clientX, e.clientY)) {
    e.preventDefault();
    e.stopPropagation();
    return; // Button was clicked, don't process game action
  }
  
  // Only use this for devices that don't support mousedown/mouseup
  if (!('ontouchstart' in window) && !('onmousedown' in window)) {
    // Always call startCharging - it will handle the state internally
    startCharging();
    
    // Simulate immediate release
    setTimeout(releaseJump, 100);
  }
}

// Handle key down event
export function handleKeyDown(e, currentState, startCharging) {
  // Always call startCharging - it will handle the state internally
  startCharging();
}

// Handle key up event
export function handleKeyUp(e, currentState, releaseJump) {
  // Always call releaseJump - it will handle the state internally
  releaseJump();
}

// Handle touch start event
export function handleTouchStart(e, currentState, checkButtonClick, startCharging) {
  // Check if we touched a button
  if (e.touches.length > 0 && checkButtonClick(e.touches[0].clientX, e.touches[0].clientY)) {
    e.preventDefault();
    e.stopPropagation();
    return; // Button was touched, don't process game action
  }
  
  // Always call startCharging - it will handle the state internally
  startCharging();
}

// Handle touch end event
export function handleTouchEnd(e, currentState, releaseJump) {
  // Always call releaseJump - it will handle the state internally
  releaseJump();
}

// Handle touch move event for button hover
export function handleTouchMove(e, checkButtonHover) {
  if (e.touches.length > 0) {
    checkButtonHover(e.touches[0].clientX, e.touches[0].clientY);
  }
} 