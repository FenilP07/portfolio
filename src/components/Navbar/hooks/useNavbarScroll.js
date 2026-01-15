import { useState, useEffect } from 'react';

export const useNavbarScroll = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      let current = 'home';

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el?.getBoundingClientRect().top <= 180) current = id;
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrolled, activeSection };
};
