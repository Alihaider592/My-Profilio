"use client";
import React, { useState, useEffect, useRef } from "react";

interface Experience {
  role: string;
  company: string;
  logo: string;
  location: string;
  period: string;
  duration: string;
  description: string[];
  skills: string[];
}

const experiences: Experience[] = [
  {
    role: "Call Center Agent",
    company: "Call Center", 
    logo: "/call.png",
    location: "On-site",
    period: "May 2026 - Present",
    duration: "2 mos",
    description: [
      "Managing inbound and outbound communications while maintaining professional service standards.",
      "Resolving complex customer inquiries efficiently and meeting performance metrics consistently.",
      "Utilizing CRM software and communications equipment to log data accurately."
    ],
    skills: ["Customer Service", "CRM Systems", "Communication", "Problem Solving"]
  },
  {
    role: "Computer Operator",
    company: "The Educators (Hassan Campus)",
    logo: "/Theeducators.png",
    location: "On-site",
    period: "Jan 2026 - June 2026",
    duration: "6 mos",
    description: [
      "Managed academic and administrative databases, generating reports and student records smoothly.",
      "Oversaw daily data processing tasks, maintaining high levels of record accuracy.",
      "Provided troubleshooting and technical support for office computer systems and networks."
    ],
    skills: ["Data Entry", "MS Office", "Database Management", "IT Support"]
  },
  {
    role: "Computer Operator",
    company: "Quaid Educational Complex (Main Campus)",
    logo: "/quiad.png",
    location: "On-site",
    period: "Jan 2026 - June 2026",
    duration: "6 mos",
    description: [
      "Maintained data integrity for institutional records and managed administrative file processing.",
      "Handled official correspondence, documentation scheduling, and campus database entry.",
      "Ensured maximum operational uptime for computing systems across the main campus."
    ],
    skills: ["System Administration", "Documentation", "Data Management"]
  },
  {
    role: "Full Stack Engineer (Contract)",
    company: "Amrood Labs",
    logo: "/Amroodlabs.png",
    location: "Remote / Hybrid",
    period: "Sep 2025 - Dec 2025",
    duration: "4 mos",
    description: [
      "Engineered end-to-end web applications, working with full-stack systems to scale features.",
      "Built resilient server architectures, optimized backend routing, and designed responsive user flows.",
      "Collaborated closely with stakeholders to translate business requirements into feature deployments."
    ],
    skills: ["Full-Stack Dev", "Node.js", "React", "Databases", "APIs"]
  },
  {
    role: "Full Stack Intern",
    company: "Amrood Labs",
    logo: "/Amroodlabs.png",
    location: "Remote / Hybrid",
    period: "June 2025 - Aug 2025",
    duration: "3 mos",
    description: [
      "Assisted senior developers with building backend services and modular UI design layouts.",
      "Participated in agile sprints, bug fixing cycles, and regular code refactoring sessions.",
      "Gained hands-on commercial experience utilizing git version control workflows."
    ],
    skills: ["Git", "JavaScript", "Software Architecture", "Teamwork"]
  },
  {
    role: "Self-Taught Developer / Personal Projects",
    company: "Independent Learning",
    logo: "", 
    location: "Remote",
    period: "Jun 2025 - May 2025",
    duration: "5 mos",
    description: [
      "Learned core principles of software engineering, web development languages, and algorithms.",
      "Designed and deployed multiple responsive personal projects to showcase front-end and back-end integration.",
      "Mastered building architectures from scratch with modern frameworks."
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Algorithms"]
  }
];

export default function HistoryPage() {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const triggerAnimation = () => {
    setIsVisible(true);
  };

  const resetAnimation = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    setIsVisible(false);
  };

  // Intersection Observer for scroll-based tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerAnimation();
          } else {
            resetAnimation();
          }
        });
      },
      { threshold: 0.1 } 
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Trigger animation when navbar link for work history is clicked
  useEffect(() => {
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target && target.getAttribute("href") === "#HistoryPage") {
        setTimeout(() => {
          triggerAnimation();
        }, 100);
      }
    };

    document.querySelectorAll("a[href='#HistoryPage']").forEach((link) => {
      link.addEventListener("click", handleNavClick);
    });

    return () => {
      document.querySelectorAll("a[href='#HistoryPage']").forEach((link) => {
        link.removeEventListener("click", handleNavClick);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="HistoryPage"
      className="min-h-screen bg-black py-20 text-slate-100 font-sans"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Theme Header */}
        <div className={`mb-16 transition-all duration-1000 sm:opacity-100 sm:translate-y-0 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-teal-500 font-mono">
              My Journey
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Work History
          </h2>
          <div className={`h-1 bg-gradient-to-r from-teal-500 to-teal-600 mt-4 rounded-full transition-all duration-1000 delay-300 ${isVisible ? "w-20" : "w-0"}`}></div>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 space-y-12">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`relative pl-8 sm:pl-10 group transition-all duration-1000 sm:opacity-100 sm:translate-x-0 ${
                isVisible ? "translate-x-0 opacity-100" : index % 2 === 0 ? "-translate-x-10 opacity-0" : "translate-x-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }} // Staggers the card animations
            >
              {/* Theme Glowing Timeline Node */}
              <span className="absolute -left-[14px] top-4 flex h-6 w-6 items-center justify-center rounded-full bg-black transition-colors duration-300">
                <span className="absolute inset-0 rounded-full border-2 border-slate-800/80 group-hover:border-teal-500/60 group-hover:shadow-[0_0_12px_3px_rgba(20,184,166,0.3)] transition-all duration-300"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-slate-700 transition-all duration-300 relative group-hover:bg-teal-400 group-hover:scale-110 group-hover:shadow-[0_0_10px_2px_rgba(20,184,166,0.8)]">
                  <span className="absolute inset-0 rounded-full bg-teal-400/50 animate-ping group-hover:opacity-100 opacity-0 transition-opacity"></span>
                </span>
              </span>

              {/* Job Card */}
              <div className="bg-gradient-to-t from-black/10 via-black/10 to-transparent-mute/10 border border-slate-800/80 rounded-xl p-6 hover:border-teal-500/30 transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-teal-950/10">
                {/* Header: Logo, Role, and Period/Duration */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800/60">
                  <div className="flex items-center gap-4">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-[#1f222c] border border-slate-700/50 overflow-hidden shrink-0">
                      {exp.logo ? (
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            const fallback = target.nextElementSibling as HTMLElement;
                            target.style.display = "none";
                            if (fallback) {
                              fallback.style.display = "block";
                            }
                          }}
                        />
                      ) : null}
                      <span className={`${exp.logo ? 'hidden' : 'block'} text-xs font-mono text-teal-500 font-bold`}>
                        {exp.company.substring(0, 2).toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-teal-500 transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-slate-400 font-medium">
                        {exp.company}{" "}
                        <span className="text-slate-600 mx-1">•</span>{" "}
                        <span className="text-xs text-slate-500">
                          {exp.location}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <div className="text-xs font-mono px-3 py-1.5 rounded-md bg-[#1f222c] text-slate-300 border border-slate-800">
                      {exp.period}
                    </div>
                    <div className="text-xs font-mono px-2.5 py-1.5 rounded-md bg-teal-950/40 text-teal-400 border border-teal-500/20 shadow-[0_0_10px_0_rgba(20,184,166,0.05)]">
                      {exp.duration}
                    </div>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-3 text-sm text-slate-400 mb-6">
                  {exp.description.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-teal-500 mt-1.5 shrink-0 text-xs">▪</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#121318] text-slate-300 border border-slate-800 hover:border-teal-500/20 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}