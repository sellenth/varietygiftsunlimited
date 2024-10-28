 import AFRAME from "aframe";
 import * as THREE from 'three'

AFRAME.registerComponent("bounce", {
  init: function () {
    this.direction = 1;
    this.position = new THREE.Vector3();
    this.position.copy(this.el.object3D.position);
    setTimeout(() => {
      this.ready = true;
    }, 3000);
  },

  tick: function () {
    if (!this.ready) return;
    var position = this.el.object3D.position.y;
    if (position <= 0) {
      this.direction = 1;
    } else if (position >= 5) {
      this.direction = -1;
    }
    this.el.object3D.position.set(this.position.x, position + 0.05 * this.direction, this.position.z);
  }
});
AFRAME.registerComponent("changescale", {
  init: function () {
    this.direction = 1;
    setTimeout(() => {
      this.ready = true;
    }, 3000);
  },

  tick: function () {
    if (!this.ready) return;
    var scale = this.el.object3D.scale;
    if (scale.x <= 0.05) {
      this.direction = 1;
    } else if (scale.x >= 1) {
      this.direction = -1;
    }
    this.el.object3D.scale.set(
      scale.x + this.direction * 0.01,
      scale.y + this.direction * 0.01,
      scale.z + this.direction * 0.01
    );
  }
});