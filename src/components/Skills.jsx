// Skills.js - Enhanced with Framer Motion + GSAP
import { Code2, Wrench, Sparkles, Rocket } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    gradient: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", level: 90 },
      { name: "JavaScript (ES6+)", level: 85 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "Tailwind CSS", level: 88 },
      { name: "GSAP Animations", level: 75 },
    ]
  },
  {
    title: "Tools & Workflow",
    icon: Wrench,
    gradient: "from-purple-500 to-pink-500",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "Vite", level: 80 },
      { name: "Responsive Design", level: 90 },
      { name: "Figma Basics", level: 70 },
      { name: "VS Code", level: 95 },
    ]
  },
  {
    title: "Learning Next",
    icon: Rocket,
    gradient: "from-emerald-500 to-teal-500",
    skills: [
      { name: "TypeScript", level: 60 },
      { name: "Node.js & Express", level: 50 },
      { name: "State Management", level: 65 },
      { name: "Next.js", level: 45 },
      { name: "MongoDB", level: 40 },
    ]
  },
];

const stats = [
  { number: "15+", label: "Technologies" },
  { number: "10+", label: "Projects" },
  { number: "2+", label: "Years Learning" },
  { number: "100%", label: "Passion" },
];

// Animated Skill Bar Component
const SkillBar = ({ name, level, gradient, delay }) => {
  const barRef = useRef(null);
  const isInView = useInView(barRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.2,
          delay: delay,
          ease: 'power3.out'
        }
      );
    }
  }, [isInView, level, delay]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-slate-300 font-medium text-sm">{name}</span>
        <span className="text-slate-500 text-xs font-semibold">{level}%</span>
      </div>
      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const circleRef1 = useRef(null);
  const circleRef2 = useRef(null);

  useEffect(() => {
    // GSAP floating animation for background circles
    gsap.to(circleRef1.current, {
      y: 30,
      x: 20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(circleRef2.current, {
      y: -30,
      x: -20,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id="skills" className="relative py-24 px-6 bg-slate-900 overflow-hidden">
      {/* Background Circles - Animated with GSAP */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div
          ref={circleRef1}
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500/30 rounded-full blur-2xl"
        />
        <div
          ref={circleRef2}
          className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-2xl"
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-blue-300 uppercase tracking-wide">Expertise</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-2">
            Skills & Technologies
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto">
            Tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map(({ title, icon: Icon, gradient, skills }, i) => (
            <motion.div
              key={i}
              className="relative group bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 overflow-hidden transition hover:shadow-lg hover:border-slate-600/80"
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon size={24} className="text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
              </div>

              {/* Skills List - Animated with GSAP */}
              <div className="space-y-4">
                {skills.map(({ name, level }, j) => (
                  <SkillBar
                    key={j}
                    name={name}
                    level={level}
                    gradient={gradient}
                    delay={j * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map(({ number, label }, i) => (
            <motion.div
              key={i}
              className="text-center p-4 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:border-slate-600/50 transition-transform duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (i * 0.1), duration: 0.4 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">
                {number}
              </div>
              <div className="text-slate-400 text-xs md:text-sm font-medium">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;