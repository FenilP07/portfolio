import React, { useState } from "react";

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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

  return (
    <a
      href="#home"
      aria-label="Home"
      className="navbar-logo" 
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "40px",
        width: "40px",
        borderRadius: "12px",
        background: isHovered
          ? "linear-gradient(135deg, #8b5cf6, #ec4899)" // purple → pink on hover
          : "linear-gradient(135deg, #6366f1, #8b5cf6)",
        boxShadow: isHovered
          ? "0 8px 24px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3)"
          : "0 4px 12px rgba(99, 102, 241, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2)",
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.15)` 
          : "rotate(-6deg) scale(1)",
        transition: isHovered ? "all 0.1s ease-out" : "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        animation: "float 3s ease-in-out infinite",
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
          textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          transform: isHovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
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
        `}
      </style>
    </a>
  );
};

export default Logo;