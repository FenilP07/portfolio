import { useEffect } from "react";
import * as THREE from "three";
import { HERO_CONFIG, CODE_SNIPPETS } from "../constants/heroConfig";
import { createTextTexture, createParticle } from "../utils/threeUtils";
import { wrapPosition } from "../utils/mathUtils";

export const useThreeJsScene = (canvasRef) => {
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      HERO_CONFIG.camera.fov,
      window.innerWidth / window.innerHeight,
      HERO_CONFIG.camera.near,
      HERO_CONFIG.camera.far
    );
    camera.position.z = HERO_CONFIG.camera.positionZ;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particles = [];
    const velocities = [];

    for (let i = 0; i < HERO_CONFIG.particles.count; i++) {
      const position = {
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 10,
      };

      velocities.push({
        x: (Math.random() - 0.5) * HERO_CONFIG.particles.speedMultiplier,
        y: (Math.random() - 0.5) * HERO_CONFIG.particles.speedMultiplier,
        z: (Math.random() - 0.5) * HERO_CONFIG.particles.speedMultiplier * 0.5,
      });

      const randomText =
        CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      const texture = createTextTexture(randomText);
      const particle = createParticle(texture, position);
      
      // 🎨 NEW: Add glow phase for pulsing effect
      particle.userData.glowPhase = Math.random() * Math.PI * 2;
      
      scene.add(particle);
      particles.push(particle);
    }

    // 🎨 NEW: Line material for particle connections
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x6366f1, // matches your blue accent
      transparent: true, 
      opacity: 0.15 
    });
    const lineSegments = [];

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // 🎨 NEW: Clear old connection lines
      lineSegments.forEach(line => {
        line.geometry.dispose();
        scene.remove(line);
      });
      lineSegments.length = 0;

      particles.forEach((particle, i) => {
        // Apply velocity
        particle.position.x += velocities[i].x;
        particle.position.y += velocities[i].y;
        particle.position.z += velocities[i].z;

        // Mouse interaction
        const dx = particle.position.x - mouse.x * 5;
        const dy = particle.position.y - mouse.y * 5;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < HERO_CONFIG.particles.mouseRange) {
          particle.position.x += dx * HERO_CONFIG.particles.mouseInfluence;
          particle.position.y += dy * HERO_CONFIG.particles.mouseInfluence;
        }

        // Boundary wrapping
        particle.position.x = wrapPosition(particle.position.x, -10, 10);
        particle.position.y = wrapPosition(particle.position.y, -10, 10);
        particle.position.z = wrapPosition(particle.position.z, -5, 5);

        // Rotation
        particle.material.rotation += HERO_CONFIG.particles.rotationSpeed;

        // 🎨 NEW: Subtle glow pulse
        particle.userData.glowPhase += 0.015;
        const glowIntensity = 0.45 + Math.sin(particle.userData.glowPhase) * 0.25;
        particle.material.opacity = glowIntensity * 0.5;

        // 🎨 NEW: Draw connection lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dist = particle.position.distanceTo(particles[j].position);
          if (dist < 3.5) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              particle.position,
              particles[j].position
            ]);
            const line = new THREE.Line(geometry, lineMaterial.clone());
            line.material.opacity = (1 - dist / 3.5) * 0.25;
            scene.add(line);
            lineSegments.push(line);
          }
        }
      });

      // Camera movement
      camera.position.x +=
        (mouse.x * HERO_CONFIG.camera.mouseMultiplier - camera.position.x) *
        HERO_CONFIG.camera.smoothness;
      camera.position.y +=
        (mouse.y * HERO_CONFIG.camera.mouseMultiplier - camera.position.y) *
        HERO_CONFIG.camera.smoothness;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);

      lineSegments.forEach(line => {
        line.geometry.dispose();
        scene.remove(line);
      });

      particles.forEach((particle) => {
        if (particle.material.map) particle.material.map.dispose();
        particle.material.dispose();
      });
      renderer.dispose();
    };
  }, [canvasRef]);
};