import * as THREE from "three";

export const createTextTexture = (text) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 256;
  canvas.height = 256;

  ctx.shadowBlur = 20;
  ctx.shadowColor = "rgba(59, 130, 246, 0.8)";
  ctx.fillStyle = "rgba(59, 130, 246, 0.6)";
  ctx.font = "bold 64px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Multiple passes for blur effect
  for (let i = 0; i < 3; i++) {
    ctx.fillText(text, 128, 128);
  }

  return new THREE.CanvasTexture(canvas);
};

export const createParticle = (texture, position) => {
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.position.set(position.x, position.y, position.z);
  sprite.scale.set(0.6, 0.6, 1);
  return sprite;
};