import React, { useState } from "react";

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((y - centerY) / centerY) * -15;
    const tiltY = ((x - centerX) / centerX) * 15;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const createExplosion = (e) => {
    // Get the position of the logo button
    const rect = e.currentTarget.getBoundingClientRect();
    const logoX = rect.left + rect.width / 2;
    const logoY = rect.top + rect.height / 2;

    // Create explosion sound effect
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Bass thump
    const bass = audioContext.createOscillator();
    const bassGain = audioContext.createGain();
    bass.connect(bassGain);
    bassGain.connect(audioContext.destination);
    bass.frequency.value = 80;
    bassGain.gain.setValueAtTime(0.3, audioContext.currentTime);
    bassGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    bass.start();
    bass.stop(audioContext.currentTime + 0.5);

    // Explosion sound
    const explosion = audioContext.createOscillator();
    const explosionGain = audioContext.createGain();
    explosion.connect(explosionGain);
    explosionGain.connect(audioContext.destination);
    explosion.frequency.setValueAtTime(800, audioContext.currentTime);
    explosion.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.4);
    explosionGain.gain.setValueAtTime(0.2, audioContext.currentTime);
    explosionGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    explosion.start();
    explosion.stop(audioContext.currentTime + 0.4);

    // High pitch sparkle
    setTimeout(() => {
      const sparkle = audioContext.createOscillator();
      const sparkleGain = audioContext.createGain();
      sparkle.connect(sparkleGain);
      sparkleGain.connect(audioContext.destination);
      sparkle.frequency.setValueAtTime(2000, audioContext.currentTime);
      sparkle.frequency.exponentialRampToValueAtTime(4000, audioContext.currentTime + 0.3);
      sparkleGain.gain.setValueAtTime(0.15, audioContext.currentTime);
      sparkleGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      sparkle.start();
      sparkle.stop(audioContext.currentTime + 0.3);
    }, 100);

    // Generate particles
    const newParticles = [];
    const particleCount = 80;
    const colors = ['#ff0080', '#00ff80', '#0080ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#8000ff'];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 5 + Math.random() * 10;
      const size = 4 + Math.random() * 12;
      
      newParticles.push({
        id: Math.random(),
        x: logoX,
        y: logoY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: size,
        life: 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20,
        shape: Math.random() > 0.5 ? 'circle' : 'square',
      });
    }
    
    setParticles(newParticles);
    setIsExploding(true);
    setScreenShake(true);
    setClickCount(prev => prev + 1);

    // Animate particles
    let frame = 0;
    const animate = () => {
      frame++;
      setParticles(prev => {
        const updated = prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.3, // gravity
          life: p.life - 0.02,
          rotation: p.rotation + p.rotationSpeed,
        })).filter(p => p.life > 0);
        
        if (updated.length > 0 && frame < 120) {
          requestAnimationFrame(animate);
        } else {
          setIsExploding(false);
        }
        return updated;
      });
    };
    
    requestAnimationFrame(animate);
    
    setTimeout(() => setScreenShake(false), 500);
  };

  return (
    <>
      {/* Particle effects container */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
          animation: screenShake ? "screenShake 0.5s ease-out" : "none",
        }}
      >
        {particles.map(p => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.shape === 'circle' 
                ? `radial-gradient(circle, ${p.color}, ${p.color}88)`
                : p.color,
              borderRadius: p.shape === 'circle' ? '50%' : '2px',
              transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`,
              opacity: p.life,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              transition: "none",
            }}
          />
        ))}
      </div>

      <a
        href="#home"
        aria-label="Home"
        className="navbar-logo"
        onClick={(e) => {
          e.preventDefault();
          createExplosion(e);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
          width: "40px",
          borderRadius: "12px",
          background: isExploding
            ? `linear-gradient(${clickCount * 45}deg, #ff0080, #00ff80, #0080ff, #ffff00, #ff00ff)`
            : isHovered
            ? "linear-gradient(135deg, #8b5cf6, #ec4899)"
            : "linear-gradient(135deg, #6366f1, #8b5cf6)",
          boxShadow: isExploding
            ? "0 0 60px rgba(255, 0, 128, 1), 0 0 100px rgba(0, 255, 128, 0.8), 0 0 140px rgba(0, 128, 255, 0.6)"
            : isHovered
            ? "0 8px 24px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3)"
            : "0 4px 12px rgba(99, 102, 241, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2)",
          transform: isExploding
            ? `perspective(1000px) scale(1.4) rotate(${clickCount * 180}deg)`
            : isHovered 
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.15)` 
            : "rotate(-6deg) scale(1)",
          transition: isExploding 
            ? "all 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            : isHovered 
            ? "all 0.1s ease-out" 
            : "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          animation: isExploding 
            ? "explode 0.5s ease-out, rainbow 0.3s linear infinite"
            : "float 3s ease-in-out infinite",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glossy overlay effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)",
            borderRadius: "12px 12px 0 0",
            pointerEvents: "none",
          }}
        />

        {/* Animated shimmer effect */}
        <div
          style={{
            position: "absolute",
            top: "-100%",
            left: "-100%",
            width: "300%",
            height: "300%",
            background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
            animation: isHovered ? "shimmer 1.5s ease-in-out" : "none",
            pointerEvents: "none",
          }}
        />

        {/* Pulsing background ring */}
        <div
          style={{
            position: "absolute",
            inset: "-4px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            opacity: isHovered ? 0.4 : 0,
            filter: "blur(8px)",
            transition: "opacity 0.4s ease",
            animation: isHovered ? "pulse 2s ease-in-out infinite" : "none",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />

        <span
          style={{
            color: "white",
            fontWeight: "800",
            fontSize: "1rem",
            userSelect: "none",
            position: "relative",
            zIndex: 1,
            textShadow: isExploding
              ? "0 0 20px #fff, 0 0 40px #fff, 0 0 60px #fff"
              : "0 2px 8px rgba(0,0,0,0.3)",
            transform: isExploding 
              ? `scale(1.5) rotate(${clickCount * 360}deg)` 
              : isHovered 
              ? "scale(1.1) rotate(5deg)" 
              : "scale(1)",
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            filter: isExploding ? "brightness(2)" : "none",
          }}
        >
          F
        </span>

        {/* Keyframes for animations */}
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
            
            @keyframes shimmer {
              0% { transform: translateX(-100%) translateY(-100%); }
              100% { transform: translateX(100%) translateY(100%); }
            }
            
            @keyframes pulse {
              0%, 100% { 
                transform: scale(1);
                opacity: 0.4;
              }
              50% { 
                transform: scale(1.1);
                opacity: 0.6;
              }
            }

            @keyframes explode {
              0% { 
                transform: scale(1);
              }
              50% { 
                transform: scale(1.6);
              }
              100% { 
                transform: scale(1.4);
              }
            }

            @keyframes rainbow {
              0% { filter: hue-rotate(0deg) brightness(1.5); }
              100% { filter: hue-rotate(360deg) brightness(1.5); }
            }

            @keyframes screenShake {
              0%, 100% { transform: translate(0, 0); }
              10% { transform: translate(-8px, -4px) rotate(-0.5deg); }
              20% { transform: translate(8px, 4px) rotate(0.5deg); }
              30% { transform: translate(-8px, 4px) rotate(-0.5deg); }
              40% { transform: translate(8px, -4px) rotate(0.5deg); }
              50% { transform: translate(-4px, -2px) rotate(-0.3deg); }
              60% { transform: translate(4px, 2px) rotate(0.3deg); }
              70% { transform: translate(-2px, -1px) rotate(-0.2deg); }
              80% { transform: translate(2px, 1px) rotate(0.2deg); }
              90% { transform: translate(-1px, -0.5px) rotate(-0.1deg); }
            }
          `}
        </style>
      </a>
    </>
  );
};

export default Logo;