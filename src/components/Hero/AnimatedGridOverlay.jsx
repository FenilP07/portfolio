const AnimatedGridOverlay = ({
  color = "rgba(99, 102, 241, 0.1)", // Default indigo color
  gridSize = "50px", // Grid cell size
  opacity = 0.1, // Overall opacity
  perspective = "500px", // 3D perspective distance
  rotateX = 60, // Rotation angle in degrees
  scale = 2, // Scale factor
  translateY = "-50%", // Vertical offset
  zIndex = 2, // Z-index for layering
  lineWidth = "1px", // Grid line thickness
}) => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(${color} ${lineWidth}, transparent ${lineWidth}),
          linear-gradient(90deg, ${color} ${lineWidth}, transparent ${lineWidth})
        `,
        backgroundSize: `${gridSize} ${gridSize}`,
        transform: `perspective(${perspective}) rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY})`,
        transformOrigin: 'center top',
        opacity: opacity,
        zIndex: zIndex,
      }}
    />
  );
};

export default AnimatedGridOverlay;