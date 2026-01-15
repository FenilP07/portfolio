import React from 'react';
import { Mail, FileText } from 'lucide-react';

 const CTAButtons = ({ className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <a href="mailto:contact@example.com" className="group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105">
      <Mail size={16} />
      <span>Contact</span>
    </a>
    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 text-sm font-medium hover:bg-white/5 hover:text-white transition-all duration-300">
      <FileText size={16} />
      <span>Resume</span>
    </a>
  </div>
);

export default CTAButtons;
