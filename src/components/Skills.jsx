// Skills.js - Improved with snappier animations and better performance
import { Code2, Wrench, Sparkles, Rocket, Eraser } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const skillCategories = [
  {
    title: "Core Technologies",
    icon: Code2,
    gradient: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", level: 90 },
      { name: "Node.js", level: 95 },
      { name: "Express.js", level: 95 },
      { name: "MongoDB", level: 70 },
      { name: "Socket.IO", level: 75 },
      { name: "Redis", level: 70 },
      { name: "GraphQL", level: 65 },
      { name: "RestAPI", level: 95 },
    ],
  },
  {
    title: "Tools & Workflow",
    icon: Wrench,
    gradient: "from-purple-500 to-pink-500",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "Figma", level: 70 },
      { name: "Zustand", level: 95 },
      { name: "Jira / Agile", level: 80 },
      { name: "Postman / API Testing", level: 75 },
      { name: "Eraser", level: 60 },
    ],
  },
  {
    title: "Learning Next",
    icon: Rocket,
    gradient: "from-emerald-500 to-teal-500",
    skills: [
      { name: "Next.js", level: 50 },
      { name: "GraphQL Advanced", level: 50 },
      { name: "Serverless / Cloud Functions", level: 45 },
      { name: "Docker / Containers", level: 40 },
      { name: "CI/CD Pipelines", level: 40 },
      { name: "TypeScript", level: 75 },
    ],
  },
];

const stats = [
  { number: "15+", label: "Technologies" },
  { number: "10+", label: "Projects" },
  { number: "2+", label: "Years Learning" },
  { number: "100%", label: "Passion" },
];

// Optimized Skill Bar Component with snappier animations
const SkillBar = ({ name, level, gradient, delay }) => {
  const barRef = useRef(null);
  const shimmerRef = useRef(null);
  const percentRef = useRef(null);
  const isInView = useInView(barRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && barRef.current) {
      const tl = gsap.timeline();

      // Faster, snappier bar fill animation
      tl.fromTo(
        barRef.current,
        { width: "0%" },
        {
          width: `${level}%`,
          duration: 0.8,
          delay: delay,
          ease: "power3.out",
        },
      );

      // Synchronized percentage counter
      tl.fromTo(
        percentRef.current,
        { textContent: 0 },
        {
          textContent: level,
          duration: 0.8,
          snap: { textContent: 1 },
          ease: "power3.out",
        },
        delay,
      );

      // Quick shimmer effect
      tl.fromTo(
        shimmerRef.current,
        { x: "-100%", opacity: 0 },
        {
          x: "200%",
          opacity: 1,
          duration: 0.6,
          ease: "power2.inOut",
        },
        delay + 0.5,
      );
    }
  }, [isInView, level, delay]);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-200 font-medium text-sm tracking-wide">
          {name}
        </span>
        <span className="text-slate-400 text-sm font-bold tabular-nums">
          <span ref={percentRef}>0</span>%
        </span>
      </div>
      <div className="h-2.5 bg-slate-800/80 rounded-full overflow-hidden relative shadow-inner">
        <div
          ref={barRef}
          className={`h-full bg-gradient-to-r ${gradient} rounded-full relative shadow-lg transition-all duration-200`}
          style={{ width: "0%" }}
        >
          {/* Shimmer overlay */}
          <div
            ref={shimmerRef}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0"
            style={{ transform: "translateX(-100%)" }}
          />
        </div>
        {/* Glow effect on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300 pointer-events-none`}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const circleRef1 = useRef(null);
  const circleRef2 = useRef(null);

  useEffect(() => {
    // Slower, more subtle floating animation for background
    gsap.to(circleRef1.current, {
      y: 30,
      x: 20,
      scale: 1.05,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(circleRef2.current, {
      y: -30,
      x: -20,
      scale: 1.08,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="skills"
      className="relative py-24 px-6 bg-slate-900 overflow-hidden"
    >
      {/* Background Circles - Subtle animation */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div
          ref={circleRef1}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
        />
        <div
          ref={circleRef2}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-blue-300 uppercase tracking-wide">
              Expertise
            </span>
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
              className="relative group bg-slate-800/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-slate-600/80 hover:-translate-y-1"
              variants={cardVariants}
            >
              {/* Gradient overlay on hover - faster transition */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Header */}
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transition-transform duration-200`}
                  whileHover={{
                    rotate: 5,
                    scale: 1.05,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={24} className="text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4 relative z-10">
                {skills.map(({ name, level }, j) => (
                  <SkillBar
                    key={j}
                    name={name}
                    level={level}
                    gradient={gradient}
                    delay={j * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {stats.map(({ number, label }, i) => (
            <motion.div
              key={i}
              className="relative group text-center p-6 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:border-blue-500/40 transition-all duration-200 overflow-hidden hover:-translate-y-1 cursor-default"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {number}
                </div>
                <div className="text-slate-400 text-xs md:text-sm font-medium uppercase tracking-wider">
                  {label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
