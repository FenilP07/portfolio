import React from "react";
import NavItems from "./NavItems";
import SocialIcons from "./SocialIcons";
import CTAButtons from "./CTAButtons";

import { Mail, FileText } from "lucide-react";

 const MobileMenu = ({
  menuOpen,
  navItems,
  activeSection,
  setMenuOpen,
}) => (
  <div
    className={`fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 z-40 transition-all duration-500 md:hidden ${
      menuOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }`}
  >
    <div className="relative flex flex-col items-center justify-center h-full gap-6 px-6">
      <div className="mb-8">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-4 mx-auto">
          <span className="font-bold text-white text-2xl">F</span>
        </div>
        <h3 className="text-2xl font-bold text-white text-center">Fenil</h3>
        <p className="text-slate-400 text-sm text-center mt-1">
          Full-Stack Developer
        </p>
      </div>

      {navItems.map((item, index) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`group relative text-xl font-medium transition-all duration-300 ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          } ${
            activeSection === item.id
              ? "text-white"
              : "text-slate-400 hover:text-white"
          }`}
          style={{ transitionDelay: menuOpen ? `${index * 50}ms` : "0ms" }}
          onClick={() => setMenuOpen(false)}
        >
          {item.name}
          <span
            className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 rounded-full ${
              activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </a>
      ))}

      <CTAButtons className="pt-10 flex flex-col gap-4 items-center" />

      <div className="flex gap-6 pt-10">
        <SocialIcons size={22} />
      </div>
    </div>
  </div>
);

export default MobileMenu