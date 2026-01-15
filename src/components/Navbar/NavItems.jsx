import { forwardRef } from "react";

const NavItems = forwardRef(({ navItems, activeSection }, ref) => (
  <div className="hidden md:flex items-center gap-1">
    {navItems.map((item, index) => (
      <a
        key={item.id}
        href={`#${item.id}`}
        ref={(el) => (ref.current[index] = el)}
        className="nav-item group relative px-4 py-2.5" 
        
      >
        <span
          className={`relative font-medium text-sm transition-all duration-300 tracking-wide ${
            activeSection === item.id
              ? "text-white font-semibold"
              : "text-slate-400 group-hover:text-white"
          }`}
        >
          {item.name}
        </span>

        <span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 
            bg-gradient-to-r from-blue-500 to-indigo-500
            transition-all duration-300 rounded-full ${
              activeSection === item.id ? "w-8" : "w-0 group-hover:w-8"
            }`}
        />
      </a>
    ))}
  </div>
));

NavItems.displayName = "NavItems";
export default NavItems;
