export const BackgroundLayers = ({ refs }) => (
  <>
    <div
      ref={refs.layer1}
      className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"
    />
    <div
      ref={refs.layer2}
      className="absolute inset-0 z-[2] opacity-40"
      style={{
        background:
          "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(99, 102, 241, 0.25) 0%, transparent 50%)",
      }}
    />
    <div
      ref={refs.layer3}
      className="absolute inset-0 z-[3] opacity-20"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
      }}
    />
  </>
);