import { useState, useEffect } from "react";

const AmbientLightOrbs = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to -0.5 to 0.5 range
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Orb 1: Follows mouse - Indigo/Purple */}
      <div 
        className="absolute w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          top: '20%',
          left: '10%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 100%)',
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
        }}
      />

      {/* Orb 2: Moves opposite to mouse - Purple/Pink */}
      <div 
        className="absolute w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          bottom: '20%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.15) 50%, transparent 100%)',
          transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`,
        }}
      />

      {/* Orb 3: Slower movement - Cyan/Blue (optional third orb) */}
      <div 
        className="absolute w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-transform duration-[1500ms] ease-out"
        style={{
          top: '50%',
          left: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 100%)',
          transform: `translate(-50%, -50%) translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
      />
    </>
  );
};

export default AmbientLightOrbs;