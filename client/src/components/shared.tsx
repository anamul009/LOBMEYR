import React, { useRef, useMemo } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";

export function ParallaxImage({ src, alt, speed = 0.15, brightness = 0.4, className = "" }: {
  src: string; alt: string; speed?: number; brightness?: number; className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);
  const smoothY = useSpring(y, { stiffness: 50, damping: 30 });
  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-[130%] object-cover absolute -top-[15%]"
        style={{ y: smoothY, filter: `brightness(${brightness}) contrast(1.1)` }}
      />
    </div>
  );
}

export function StaggerText({ text, className = "", delay = 0, staggerDelay = 0.03 }: {
  text: string; className?: string; delay?: number; staggerDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span key={i} initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + i * staggerDelay, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block" style={{ whiteSpace: char === " " ? "pre" : undefined }}>
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function FadeInSection({ children, className = "", delay = 0, direction = "up" }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const initial = direction === "up" ? { opacity: 0, y: 40 }
    : direction === "left" ? { opacity: 0, x: -40 }
    : direction === "right" ? { opacity: 0, x: 40 }
    : { opacity: 0 };
  const animate = direction === "up" ? { opacity: 1, y: 0 }
    : direction === "left" ? { opacity: 1, x: 0 }
    : direction === "right" ? { opacity: 1, x: 0 }
    : { opacity: 1 };
  return (
    <motion.div ref={ref} initial={initial} animate={isInView ? animate : initial}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export function GoldLine({ className = "", width = "w-16" }: { className?: string; width?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className={`flex items-center justify-center ${className}`}>
      <motion.div className={`${width} h-px`}
        style={{ background: "linear-gradient(90deg, transparent, #c5a55a, transparent)" }}
        initial={{ scaleX: 0, opacity: 0 }} animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
    </div>
  );
}

export function GoldEmblem({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="url(#goldGrad)" strokeWidth="0.8" fill="none" opacity="0.7" />
      <circle cx="24" cy="24" r="14" stroke="url(#goldGrad)" strokeWidth="0.5" fill="none" opacity="0.4" />
      <line x1="20" y1="16" x2="20" y2="32" stroke="url(#goldGrad)" strokeWidth="0.8" opacity="0.8" />
      <line x1="20" y1="32" x2="28" y2="32" stroke="url(#goldGrad)" strokeWidth="0.8" opacity="0.8" />
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#d4af37" /><stop offset="50%" stopColor="#c5a55a" /><stop offset="100%" stopColor="#b8963e" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FloatingParticles() {
  const prefersReduced = useMemo(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  const particles = useMemo(() =>
    prefersReduced ? [] : Array.from({ length: 15 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 3 + 1, duration: Math.random() * 15 + 20, delay: Math.random() * 10,
    })), [prefersReduced]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            background: `radial-gradient(circle, rgba(197,165,90,0.6) 0%, transparent 70%)` }}
          animate={{ y: [0, -50, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

export function NordicDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="flex items-center justify-center gap-4 py-8" aria-hidden="true">
      <motion.div className="h-px bg-gradient-to-r from-transparent to-[#c5a55a]/30"
        initial={{ width: 0 }} animate={isInView ? { width: "4rem" } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
      <motion.div className="w-1.5 h-1.5 rotate-45 border border-[#c5a55a]/40"
        initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }} />
      <motion.div className="h-px bg-gradient-to-l from-transparent to-[#c5a55a]/30"
        initial={{ width: 0 }} animate={isInView ? { width: "4rem" } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} />
    </div>
  );
}

export function GrainOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='${opacity}'/%3E%3C/svg%3E")`,
      backgroundSize: "128px 128px",
    }} />
  );
}
