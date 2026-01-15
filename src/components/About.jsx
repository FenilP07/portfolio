// About.js - Enhanced with Framer Motion
import { MapPin, User, Code, Monitor, Target, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const expertise = [
  { icon: Code, title: "Frontend Development", text: "Modern React, clean component architecture, performance-first UI.", gradient: "from-blue-600 to-cyan-500" },
  { icon: Monitor, title: "UI / UX Engineering", text: "Design systems, accessibility, and intuitive user flows.", gradient: "from-indigo-600 to-purple-500" },
  { icon: Brain, title: "Problem Solving", text: "Turning complex requirements into scalable solutions.", gradient: "from-emerald-600 to-teal-500" },
  { icon: Target, title: "Execution", text: "Shipping reliable features with clarity and ownership.", gradient: "from-orange-500 to-amber-500" },
];

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id="about" className="bg-slate-950 overflow-hidden py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <User size={14} className="text-blue-400" />
            <span className="text-sm tracking-wide text-slate-400 uppercase">About</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Building with intent</h2>
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <MapPin size={16} />
            <span>Greater Toronto Area, Ontario</span>
          </div>
        </motion.header>

        {/* Image + Text */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Profile Card */}
          <motion.div
            className="flex justify-center lg:justify-start"
            variants={itemVariants}
          >
            <div className="relative w-full max-w-md">
              <motion.div
                className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[1px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-3xl bg-slate-900 p-8 text-center">
                  <motion.div
                    className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <Code size={40} className="text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white">Fenil Patel</h3>
                  <p className="text-blue-400 font-medium mt-1 text-sm">Full-Stack Developer</p>
                  <p className="text-slate-400 text-sm mt-1">React • Modern Web • Scalable Systems</p>
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-3 -right-3 bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-1.5 text-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.4, type: "spring" }}
              >
                <div className="text-base font-semibold text-blue-400">3+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Years Experience</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            className="space-y-4 text-slate-300"
            variants={itemVariants}
          >
            <motion.p
              className="text-lg leading-relaxed"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I'm a Full-Stack Developer focused on building scalable, performance-driven web applications with clean architecture and thoughtful user experience.
            </motion.p>
            <motion.p
              className="text-base text-slate-400 leading-relaxed"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              My work spans modern React frontends and robust backend systems, with an emphasis on maintainability, clarity, and real-world usability.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Core Focus */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-6">Core Focus</p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {expertise.map(({ icon: Icon, title, text, gradient }, i) => (
              <motion.div
                key={i}
                className="rounded-xl border border-slate-700 bg-slate-900 p-6 hover:shadow-lg transition-shadow"
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col gap-3 items-start">
                  <motion.div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon size={18} className="text-white" />
                  </motion.div>
                  <h4 className="text-slate-200 font-medium text-base">{title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;