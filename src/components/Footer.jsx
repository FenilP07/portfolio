import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, FileText, ArrowUp, MapPin } from 'lucide-react';
import Logo from '../components/Navbar/Logo'; 

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(() => {
    // Fade in entire footer smoothly
    gsap.from(footerRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
      },
    });
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const professionalLinks = [
    { icon: Github, href: 'https://github.com/YOUR_USERNAME', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/YOUR_PROFILE', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@yourdomain.com', label: 'Email' },
    { icon: FileText, href: '/resume.pdf', label: 'Resume' },
  ];

  const technologies = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Node.js', 'MongoDB'];

  return (
    <footer
      ref={footerRef}
      className="relative bg-slate-950 text-slate-300 overflow-hidden border-t border-slate-800/50"
    >
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-4 flex flex-col items-start">
            <Logo /> {/* Replace static brand with dynamic Logo */}
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Building scalable web applications and digital experiences with modern technologies. Based in Toronto, delivering quality solutions worldwide.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin size={14} className="text-blue-400" />
              <span>Greater Toronto Area, ON</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold mb-2">Navigation</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Technologies */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold mb-2">Connect</h4>
            <div className="flex items-center gap-3">
              {professionalLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors duration-300"
                    aria-label={link.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                {technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-700/20 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Fenil. Built with React & Tailwind CSS.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 flex items-center justify-center transition-transform duration-300 hover:scale-105"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
