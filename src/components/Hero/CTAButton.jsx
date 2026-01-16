// CTAButton.jsx
export const CTAButton = ({ href, variant = "primary", children, icon, onClick }) => {
  const baseClasses =
    "group relative inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg overflow-hidden transition-all duration-500 ease-in-out hover:scale-105 hover:rotate-[1deg] cursor-pointer w-full sm:w-auto";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-2xl",
    secondary:
      "border-2 border-white/20 backdrop-blur-sm text-white hover:border-white/40 hover:bg-white/5",
  };

  const overlayClasses = {
    primary:
      "absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 ease-in-out rounded-lg",
    secondary:
      "absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-30 transition-opacity duration-500 ease-in-out rounded-lg",
  };

  return (
    <a
      href={href}
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
      style={{ pointerEvents: "auto" }}
    >
      <span className="relative z-10 flex items-center">
        {children}
        {icon && <span className="ml-2">{icon}</span>}
      </span>
      <div className={overlayClasses[variant]} />
    </a>
  );
};
