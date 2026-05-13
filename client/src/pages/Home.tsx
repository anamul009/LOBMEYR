import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { Menu, X, MapPin, Clock, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const BASE = import.meta.env.BASE_URL;
const IMAGES = {
  hero: `${BASE}assets/hero.png`,
  wine: `${BASE}assets/wine.png`,
  sake: `${BASE}assets/sake.png`,
  salon: `${BASE}assets/salon.png`,
  glass: `${BASE}assets/glass.png`,
  counterInterior: `${BASE}assets/salon.png`,
  barCounterLight: `${BASE}assets/glass.png`,
};

const NAV_ITEMS = [
  { id: "hero", label: "HOME" },
  { id: "concept", label: "CONCEPT" },
  { id: "event", label: "EVENT" },
  { id: "floor", label: "FLOOR" },
  { id: "menu", label: "MENU" },
  { id: "performer", label: "PERFORMER" },
  { id: "contact", label: "CONTACT" },
];

// ===== UTILITY COMPONENTS =====

function ParallaxImage({ src, alt, speed = 0.15, brightness = 0.4, className = "" }: {
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

function StaggerText({ text, className = "", delay = 0, staggerDelay = 0.03 }: {
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

function FadeInSection({ children, className = "", delay = 0, direction = "up" }: {
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

function GoldLine({ className = "", width = "w-16" }: { className?: string; width?: string }) {
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

function GoldEmblem({ size = 48 }: { size?: number }) {
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

function FloatingParticles() {
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

function NordicDivider() {
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

function GrainOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='${opacity}'/%3E%3C/svg%3E")`,
      backgroundSize: "128px 128px",
    }} />
  );
}

// ===== NAVIGATION =====

function Navigation({ activeSection, onNavigate }: {
  activeSection: string; onNavigate: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNav = NAV_ITEMS.slice(1);

  const handleComingSoon = () => {
    toast("準備中です", { description: "このページは近日公開予定です。" });
  };

  return (
    <>
      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-[#c5a55a]/5" : "bg-transparent"
        }`}>
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <button onClick={() => onNavigate("hero")} className="flex items-center gap-3 group" aria-label="LOBMEYRトップへ">
            <span className="text-xl md:text-2xl tracking-[0.35em] text-[#f0ebe3] group-hover:text-[#c5a55a] transition-colors duration-500"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
              LOBMEYR
            </span>
          </button>

          <nav className="hidden xl:flex items-center gap-8" aria-label="メインナビゲーション">
            {mainNav.map((item) => (
              <button key={item.id} onClick={() => onNavigate(item.id)} className="relative group">
                <span className={`text-[11px] tracking-[0.25em] transition-all duration-500 ${
                  activeSection === item.id ? "text-[#c5a55a]" : "text-[#f0ebe3]/60 group-hover:text-[#f0ebe3]"
                }`} style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                  {item.label}
                </span>
                <motion.div className="absolute -bottom-1 left-0 right-0 h-px bg-[#c5a55a]"
                  initial={false} animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: "center" }} />
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
            className="xl:hidden text-[#f0ebe3] hover:text-[#c5a55a] transition-colors duration-300">
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[9px] tracking-[0.3em] text-[#f0ebe3]/60"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                {isOpen ? "CLOSE" : "MENU"}
              </span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-[#0d0d0d]/98 backdrop-blur-2xl flex flex-col items-start justify-center px-12 md:px-20"
            role="dialog" aria-modal="true" aria-label="ナビゲーションメニュー">
            <button onClick={() => setIsOpen(false)} aria-label="メニューを閉じる"
              className="absolute top-5 right-6 flex flex-col items-center gap-1 text-[#f0ebe3]">
              <X size={24} />
              <span className="text-[9px] tracking-[0.3em]" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>CLOSE</span>
            </button>

            <nav className="flex flex-col gap-6 mb-16" aria-label="モバイルナビゲーション">
              {NAV_ITEMS.map((item, i) => (
                <motion.button key={item.id}
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => { onNavigate(item.id); setIsOpen(false); }}
                  className={`text-left transition-all duration-500 ${
                    activeSection === item.id ? "text-[#c5a55a]" : "text-[#f0ebe3]/80 hover:text-[#f0ebe3]"
                  }`}
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.8rem", letterSpacing: "0.15em" }}>
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              {["COMPANY", "RECRUIT", "PRIVACY POLICY"].map((label, i) => (
                <motion.button key={label}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                  onClick={handleComingSoon}
                  className="text-left text-[#f0ebe3]/40 hover:text-[#f0ebe3]/70 transition-colors duration-300"
                  style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "0.75rem", letterSpacing: "0.2em" }}>
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SideDots({ activeSection, onNavigate }: {
  activeSection: string; onNavigate: (id: string) => void;
}) {
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-3" aria-label="セクションナビゲーション">
      {NAV_ITEMS.map((item) => (
        <button key={item.id} onClick={() => onNavigate(item.id)}
          className="group flex items-center gap-3 justify-end" title={item.label} aria-label={`${item.label}へ移動`}>
          <motion.span className={`text-[9px] tracking-[0.2em] ${
            activeSection === item.id ? "text-[#c5a55a]" : "text-[#f0ebe3]/40"
          }`} style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
            initial={false} animate={{ opacity: activeSection === item.id ? 1 : 0, x: activeSection === item.id ? 0 : 10 }}
            whileHover={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            {item.label}
          </motion.span>
          <motion.div className="rounded-full border" initial={false}
            animate={{
              width: activeSection === item.id ? 10 : 6,
              height: activeSection === item.id ? 10 : 6,
              backgroundColor: activeSection === item.id ? "#c5a55a" : "transparent",
              borderColor: activeSection === item.id ? "#c5a55a" : "rgba(240,235,227,0.25)",
            }}
            whileHover={{ borderColor: "rgba(240,235,227,0.6)" }}
            transition={{ duration: 0.5 }} />
        </button>
      ))}
    </nav>
  );
}

// ===== HERO SECTION =====

function HeroSection() {
  const [phase, setPhase] = useState<"curtain" | "forest" | "slideshow">("curtain");
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const [textRevealed, setTextRevealed] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const heroImages = [IMAGES.counterInterior, IMAGES.glass, IMAGES.barCounterLight];

  useEffect(() => {
    const t1 = setTimeout(() => setCurtainOpen(true), 800);
    const t2 = setTimeout(() => setTextRevealed(true), 1800);
    const t3 = setTimeout(() => setPhase("forest"), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (phase !== "forest") return;
    const timer = setTimeout(() => setPhase("slideshow"), 3000);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "slideshow") return;
    const interval = setInterval(() => setCurrentBg((prev) => (prev + 1) % heroImages.length), 5000);
    return () => clearInterval(interval);
  }, [phase, heroImages.length]);

  return (
    <section id="hero" ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="" role="presentation" className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5) contrast(1.1) saturate(0.85)" }} />
        </div>

        <AnimatePresence mode="sync">
          {phase === "slideshow" && heroImages.map((img, idx) => (
            idx === currentBg && (
              <motion.div key={`img-${idx}`} className="absolute inset-0 z-[1]"
                initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}>
                <img src={img} alt="" role="presentation" className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.5) contrast(1.1) saturate(0.9)" }} />
              </motion.div>
            )
          ))}
        </AnimatePresence>

        <div className="absolute inset-0 z-[2]" aria-hidden="true" style={{
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(8,8,8,0.55) 100%)",
        }} />
        <GrainOverlay opacity={0.03} />
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-[#080808]/30 via-transparent to-[#080808]/50" aria-hidden="true" />

        <motion.div className="absolute inset-0 z-[2] pointer-events-none" aria-hidden="true"
          animate={{
            background: [
              "linear-gradient(120deg, transparent 0%, rgba(197,165,90,0.03) 30%, transparent 60%)",
              "linear-gradient(120deg, transparent 40%, rgba(197,165,90,0.06) 60%, transparent 90%)",
              "linear-gradient(120deg, transparent 0%, rgba(197,165,90,0.03) 30%, transparent 60%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>

      <motion.div className="absolute inset-0 z-[20] pointer-events-none flex" aria-hidden="true">
        <motion.div className="w-1/2 h-full bg-[#080808]"
          animate={{ x: curtainOpen ? "-100%" : "0%" }}
          transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }} />
        <motion.div className="w-1/2 h-full bg-[#080808]"
          animate={{ x: curtainOpen ? "100%" : "0%" }}
          transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }} />
      </motion.div>

      <AnimatePresence>
        {curtainOpen && phase === "curtain" && (
          <motion.div className="absolute inset-0 z-[19] pointer-events-none" aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 2, times: [0, 0.3, 1] }}>
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 50%)",
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingParticles />

      <motion.div className="absolute top-[12%] left-0 right-0 h-px z-[4]" aria-hidden="true"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(197,165,90,0.06) 30%, rgba(197,165,90,0.06) 70%, transparent 95%)" }}
        initial={{ scaleX: 0 }} animate={textRevealed ? { scaleX: 1 } : {}}
        transition={{ duration: 2.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} />
      <motion.div className="absolute bottom-[12%] left-0 right-0 h-px z-[4]" aria-hidden="true"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(197,165,90,0.06) 30%, rgba(197,165,90,0.06) 70%, transparent 95%)" }}
        initial={{ scaleX: 0 }} animate={textRevealed ? { scaleX: 1 } : {}}
        transition={{ duration: 2.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }} />

      <motion.div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ opacity: heroOpacity, y: textY }}>

        <motion.div initial={{ opacity: 0, scale: 0.3 }}
          animate={textRevealed ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} className="mb-10 relative">
          <motion.div animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
            <GoldEmblem size={80} />
          </motion.div>
          <div className="absolute inset-0 -m-4 rounded-full blur-xl" aria-hidden="true"
            style={{ background: "radial-gradient(circle, rgba(197,165,90,0.12) 0%, transparent 70%)" }} />
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h1 className="text-5xl md:text-7xl lg:text-[7rem] text-[#f0ebe3] tracking-[0.5em] md:tracking-[0.6em]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            initial={{ y: "120%" }} animate={textRevealed ? { y: "0%" } : {}}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            LOBMEYR
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.p className="text-[#c5a55a]/70 text-xs md:text-sm tracking-[0.6em] mb-14"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
            initial={{ y: "120%" }} animate={textRevealed ? { y: "0%" } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            MEMBER'S SALON
          </motion.p>
        </div>

        <motion.div className="mb-14" initial={{ opacity: 0, scaleX: 0 }}
          animate={textRevealed ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}>
          <div className="w-28 h-px mx-auto relative">
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, #c5a55a, transparent)" }} />
            <div className="absolute inset-0 blur-md" style={{ background: "linear-gradient(90deg, transparent, #c5a55a40, transparent)" }} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }}
          animate={textRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-[#f0ebe3]/55 text-sm md:text-base tracking-[0.25em] leading-relaxed"
            style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
            選ばれし方だけが集う、静寂のサロン
          </p>
        </motion.div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" aria-hidden="true"
          initial={{ opacity: 0 }} animate={textRevealed ? { opacity: 1 } : {}}
          transition={{ delay: 2.5, duration: 1 }}>
          <motion.div className="flex flex-col items-center gap-3"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
            <span className="text-[9px] tracking-[0.4em] text-[#f0ebe3]/25"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>SCROLL</span>
            <ChevronDown size={14} className="text-[#c5a55a]/35" strokeWidth={1} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ===== CONCEPT =====

function ConceptSection() {
  return (
    <section id="concept" className="relative min-h-screen w-full overflow-hidden">
      <ParallaxImage src={IMAGES.glass} alt="クリスタルグラス" speed={0.12} brightness={0.22} />
      <GrainOverlay opacity={0.04} />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#080808]/70 via-[#080808]/40 to-[#080808]/70" aria-hidden="true" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-28">
        <div className="max-w-3xl text-center">
          <FadeInSection>
            <p className="text-[#c5a55a] text-xs tracking-[0.5em] mb-5"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>CONCEPT</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#f0ebe3] mb-3 tracking-[0.12em]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              <StaggerText text="Silence & Elegance" staggerDelay={0.04} />
            </h2>
            <p className="text-[#f0ebe3]/35 text-sm tracking-[0.2em] mt-2"
              style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>コンセプト</p>
          </FadeInSection>

          <NordicDivider />

          <FadeInSection delay={0.4}>
            <p className="text-[#f0ebe3]/80 text-base md:text-lg leading-[2.4] tracking-wide mb-10"
              style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
              静寂の中に、本物だけが放つ光がある。
            </p>
          </FadeInSection>

          <FadeInSection delay={0.6}>
            <p className="text-[#f0ebe3]/50 text-sm md:text-base leading-[2.6] tracking-wide"
              style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}>
              LOBMEYRは、ウィーン王室御用達の名門クリスタルグラスで<br className="hidden md:block" />
              貴重なナチュールワインと厳選された日本酒を愉しむ、<br className="hidden md:block" />
              会員制のラグジュアリーサロンです。
            </p>
          </FadeInSection>

          <FadeInSection delay={0.9}>
            <p className="text-[#f0ebe3]/40 text-sm md:text-base leading-[2.6] tracking-wide mt-8"
              style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}>
              二百年の伝統が紡ぐクリスタルの輝きと、<br className="hidden md:block" />
              自然が育んだ酒の真髄が出会う場所。<br className="hidden md:block" />
              ここでは、時間さえも贅沢に流れます。
            </p>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ===== EVENT =====

function EventSection() {
  const newsItems = [
    { date: "2026.04.20", category: "EVENT", title: "春のナチュールワイン会 ― ロワール特集", desc: "フランス・ロワール地方の造り手を迎えた特別テイスティングイベント。限定8名様。" },
    { date: "2026.04.10", category: "NEW ARRIVAL", title: "ジョージア産クヴェヴリワイン入荷", desc: "8000年の歴史を持つクヴェヴリ製法で醸された希少なアンバーワインが入荷いたしました。" },
    { date: "2026.03.28", category: "SAKE", title: "十四代 龍泉 — 特別開栓のご案内", desc: "入手困難な十四代 龍泉を会員様限定で特別開栓いたします。" },
    { date: "2026.03.15", category: "EVENT", title: "日本酒と和食のマリアージュディナー", desc: "香川の食材と厳選日本酒のペアリングディナー。ゲストシェフを迎えた一夜限りの饗宴。" },
    { date: "2026.03.01", category: "INFO", title: "4月の営業スケジュール", desc: "4月の営業日・特別イベントのスケジュールを更新いたしました。" },
  ];

  return (
    <section id="event" className="relative min-h-screen w-full overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #c5a55a 0.4px, transparent 0)`,
        backgroundSize: "60px 60px",
      }} />
      <GrainOverlay opacity={0.02} />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-28">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-16">
            <FadeInSection>
              <p className="text-[#c5a55a] text-xs tracking-[0.5em] mb-5"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>EVENT</p>
              <h2 className="text-3xl md:text-5xl text-[#f0ebe3] mb-3 tracking-[0.12em]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                <StaggerText text="News & Events" staggerDelay={0.05} />
              </h2>
              <p className="text-[#f0ebe3]/35 text-sm tracking-[0.2em]"
                style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>新着情報</p>
            </FadeInSection>
            <NordicDivider />
          </div>

          <div className="space-y-0">
            {newsItems.map((item, i) => (
              <FadeInSection key={i} delay={0.15 * i}>
                <motion.div
                  className="group border-t border-[#c5a55a]/8 py-8 md:py-10 cursor-pointer"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="flex items-center gap-4 md:w-56 shrink-0">
                      <span className="text-[#f0ebe3]/35 text-xs tracking-[0.1em]"
                        style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                        {item.date}
                      </span>
                      <span className="text-[#c5a55a]/70 text-[10px] tracking-[0.15em] border border-[#c5a55a]/20 px-3 py-1"
                        style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                        {item.category}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-[#f0ebe3]/85 text-base md:text-lg tracking-wide mb-2 group-hover:text-[#c5a55a] transition-colors duration-500"
                        style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 400 }}>
                        {item.title}
                      </h3>
                      <p className="text-[#f0ebe3]/35 text-sm leading-[2] tracking-wide"
                        style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}>
                        {item.desc}
                      </p>
                    </div>

                    <div className="hidden md:flex items-center shrink-0">
                      <motion.div className="text-[#c5a55a]/20 group-hover:text-[#c5a55a]/60 transition-colors duration-500" aria-hidden="true"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                        <ArrowRight size={16} strokeWidth={1} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
            <div className="border-t border-[#c5a55a]/8" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== FLOOR =====

function FloorSection() {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const salonRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: salonRef, offset: ["start end", "end start"] });
  const photoScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  const areas = [
    { id: "lounge", label: "ラウンジ", labelEn: "Lounge",
      desc: "L字型のソファが配された寛ぎの空間。親しい方との語らいに。",
      path: "M 5 5 L 50 5 L 50 35 L 35 35 L 35 55 L 5 55 Z" },
    { id: "counter", label: "カウンター", labelEn: "Counter",
      desc: "バーテンダーとの対話を愉しむカウンター席。一人の贅沢な時間に。",
      path: "M 55 5 L 95 5 L 95 55 L 55 55 Z" },
    { id: "dining", label: "ダイニング", labelEn: "Dining",
      desc: "斜めに配されたテーブルで、特別なディナーを。最大6名様まで。",
      path: "M 5 60 L 65 60 L 65 95 L 5 95 Z" },
  ];

  return (
    <section id="floor" ref={salonRef} className="relative w-full overflow-hidden">
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <motion.img
          src={IMAGES.counterInterior}
          alt="LOBMEYRサロン内観"
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ scale: photoScale, filter: "brightness(0.55) contrast(1.1) saturate(0.9)" }}
        />
        <GrainOverlay opacity={0.03} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/40 via-transparent to-[#080808]" aria-hidden="true" />

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <FadeInSection>
              <p className="text-[#c5a55a] text-xs tracking-[0.5em] mb-5"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>FLOOR</p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#f0ebe3] mb-3 tracking-[0.12em]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                <StaggerText text="The Space" staggerDelay={0.06} />
              </h2>
              <p className="text-[#f0ebe3]/35 text-sm tracking-[0.2em]"
                style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>空間</p>
            </FadeInSection>
          </div>
        </div>
      </div>

      <div className="relative bg-[#080808] px-6 py-20 md:py-28">
        <GrainOverlay opacity={0.02} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <FadeInSection>
            <p className="text-[#f0ebe3]/70 text-base md:text-lg leading-[2.2] tracking-wide text-center mb-16"
              style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
              特別な方だけが知る、隠れ家のような空間。
            </p>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <div className="w-full lg:w-1/2 relative">
                <div className="relative bg-[#0d0d0d]/60 backdrop-blur-sm border border-[#c5a55a]/10 rounded-sm p-6 md:p-8">
                  <p className="text-[#c5a55a]/50 text-[10px] tracking-[0.3em] mb-4 text-center"
                    style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>FLOOR MAP</p>
                  <svg viewBox="0 0 100 100" className="w-full" role="img" aria-label="フロアマップ" style={{ maxWidth: "400px", margin: "0 auto", display: "block" }}>
                    <rect x="2" y="2" width="96" height="96" fill="none" stroke="#c5a55a" strokeWidth="0.3" opacity="0.2" rx="1" />
                    {[20, 40, 60, 80].map((v) => (
                      <g key={v}>
                        <line x1={v} y1="2" x2={v} y2="98" stroke="#c5a55a" strokeWidth="0.1" opacity="0.1" />
                        <line x1="2" y1={v} x2="98" y2={v} stroke="#c5a55a" strokeWidth="0.1" opacity="0.1" />
                      </g>
                    ))}
                    {areas.map((area) => (
                      <motion.path key={area.id} d={area.path}
                        fill={activeArea === area.id ? "rgba(197,165,90,0.15)" : "rgba(197,165,90,0.04)"}
                        stroke="#c5a55a" strokeWidth={activeArea === area.id ? "0.6" : "0.3"}
                        opacity={activeArea === area.id ? 1 : 0.5}
                        className="cursor-pointer"
                        onMouseEnter={() => setActiveArea(area.id)}
                        onMouseLeave={() => setActiveArea(null)}
                        onClick={() => setActiveArea(activeArea === area.id ? null : area.id)}
                        whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }}
                        role="button" aria-label={area.label} tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && setActiveArea(activeArea === area.id ? null : area.id)}
                      />
                    ))}
                    <text x="22" y="30" fill="#c5a55a" fontSize="3.5" fontFamily="'Lato', sans-serif" fontWeight="300" opacity="0.7" textAnchor="middle">LOUNGE</text>
                    <text x="75" y="30" fill="#c5a55a" fontSize="3.5" fontFamily="'Lato', sans-serif" fontWeight="300" opacity="0.7" textAnchor="middle">COUNTER</text>
                    <text x="35" y="80" fill="#c5a55a" fontSize="3.5" fontFamily="'Lato', sans-serif" fontWeight="300" opacity="0.7" textAnchor="middle">DINING</text>
                  </svg>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <AnimatePresence mode="wait">
                  {activeArea ? (
                    <motion.div key={activeArea}
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                      {areas.filter(a => a.id === activeArea).map((area) => (
                        <div key={area.id}>
                          <p className="text-[#c5a55a] text-xs tracking-[0.4em] mb-3"
                            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>{area.labelEn.toUpperCase()}</p>
                          <h3 className="text-2xl md:text-3xl text-[#f0ebe3] mb-4 tracking-[0.1em]"
                            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>{area.label}</h3>
                          <div className="w-8 h-px bg-[#c5a55a]/40 mb-6" />
                          <p className="text-[#f0ebe3]/55 text-sm leading-[2.2] tracking-wide"
                            style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}>{area.desc}</p>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}>
                      <p className="text-[#f0ebe3]/50 text-sm md:text-base leading-[2.6] tracking-wide"
                        style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}>
                        落ち着いた照明に照らされた空間には、<br className="hidden md:block" />
                        ロブマイヤーのクリスタルグラスが静かに輝いています。<br /><br />
                        ウィーンの伝統と日本の美意識が融合した<br className="hidden md:block" />
                        インテリアの中で、<br className="hidden md:block" />
                        大切な方との語らいや、<br className="hidden md:block" />
                        自分だけの至福の時間をお過ごしください。
                      </p>
                      <p className="text-[#c5a55a]/30 text-xs tracking-[0.2em] mt-8"
                        style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                        &#8592; フロアマップのエリアをタッチしてください
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ===== MENU =====

function MenuSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);

  return (
    <section id="menu" ref={ref} className="relative w-full overflow-hidden">
      <div className="relative min-h-screen flex flex-col lg:flex-row items-center bg-[#080808]">
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen relative overflow-hidden">
          <motion.img
            src={IMAGES.wine}
            alt="ナチュールワイン"
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ scale: imgScale, filter: "brightness(0.75) contrast(1.05) saturate(0.9)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080808]/80 hidden lg:block" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808]/90 lg:hidden" aria-hidden="true" />
          <motion.div className="absolute bottom-0 right-0 w-px h-0 bg-gradient-to-t from-[#c5a55a]/30 to-transparent hidden lg:block" aria-hidden="true"
            whileInView={{ height: "40%" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-0">
          <div className="max-w-md">
            <FadeInSection direction="right">
              <p className="text-[#c5a55a] text-xs tracking-[0.5em] mb-5"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>MENU</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#f0ebe3] mb-3 tracking-[0.08em]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                <StaggerText text="Natural Wine" staggerDelay={0.05} />
              </h2>
              <p className="text-[#f0ebe3]/35 text-sm tracking-[0.2em]"
                style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>ナチュールワイン</p>
            </FadeInSection>

            <FadeInSection delay={0.3} direction="right">
              <div className="my-9 flex items-center">
                <motion.div className="h-px bg-gradient-to-r from-[#c5a55a] to-transparent"
                  initial={{ width: 0 }} whileInView={{ width: "3rem" }} viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }} />
              </div>
            </FadeInSection>

            <FadeInSection delay={0.5} direction="right">
              <p className="text-[#f0ebe3]/75 text-base leading-[2.4] tracking-wide mb-8"
                style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
                自然への敬意から生まれた、<br />生きたワインの世界。
              </p>
            </FadeInSection>

            <FadeInSection delay={0.7} direction="right">
              <p className="text-[#f0ebe3]/45 text-sm leading-[2.4] tracking-wide"
                style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}>
                化学的な介入を極力排し、ぶどう本来の力で醸されたナチュールワイン。
                フランス、イタリア、ジョージアなど世界各地から、
                造り手の哲学が宿る希少なキュヴェを厳選しています。
                ロブマイヤーのバレリーナグラスが、
                その繊細な香りと味わいを最大限に引き出します。
              </p>
            </FadeInSection>
          </div>
        </div>
      </div>

      <div className="relative min-h-screen flex flex-col-reverse lg:flex-row items-center bg-[#080808]">
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-0">
          <div className="max-w-md lg:text-right">
            <FadeInSection direction="left">
              <p className="text-[#c5a55a] text-xs tracking-[0.5em] mb-5"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>SAKE</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#f0ebe3] mb-3 tracking-[0.08em]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                <StaggerText text="Japanese Sake" staggerDelay={0.05} />
              </h2>
              <p className="text-[#f0ebe3]/35 text-sm tracking-[0.2em]"
                style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>日本酒</p>
            </FadeInSection>

            <FadeInSection delay={0.3} direction="left">
              <div className="my-9 flex items-center lg:justify-end">
                <motion.div className="h-px bg-gradient-to-l from-[#c5a55a] to-transparent"
                  initial={{ width: 0 }} whileInView={{ width: "3rem" }} viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }} />
              </div>
            </FadeInSection>

            <FadeInSection delay={0.5} direction="left">
              <p className="text-[#f0ebe3]/75 text-base leading-[2.4] tracking-wide mb-8"
                style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
                米と水と麹が織りなす、<br />日本の風土の結晶。
              </p>
            </FadeInSection>

            <FadeInSection delay={0.7} direction="left">
              <p className="text-[#f0ebe3]/45 text-sm leading-[2.4] tracking-wide"
                style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}>
                全国の蔵元から選び抜いた、入手困難な銘酒の数々。
                純米大吟醸から熟成古酒まで、
                日本酒の奥深い世界をご堪能いただけます。
                ロブマイヤーのクリスタルグラスで味わう日本酒は、
                新たな感動をもたらします。
              </p>
            </FadeInSection>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen relative overflow-hidden">
          <motion.img
            src={IMAGES.sake}
            alt="プレミアム日本酒"
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ scale: imgScale, filter: "brightness(0.75) contrast(1.05) saturate(0.9)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#080808]/80 hidden lg:block" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 to-transparent lg:hidden" aria-hidden="true" />
          <motion.div className="absolute bottom-0 left-0 w-px h-0 bg-gradient-to-t from-[#c5a55a]/30 to-transparent hidden lg:block" aria-hidden="true"
            whileInView={{ height: "40%" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} />
        </div>
      </div>
    </section>
  );
}

// ===== PERFORMER =====

function PerformerSection() {
  return (
    <section id="performer" className="relative min-h-[80vh] w-full overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #c5a55a 0.4px, transparent 0)`,
        backgroundSize: "48px 48px",
      }} />
      <GrainOverlay opacity={0.02} />

      <div className="relative z-10 min-h-[80vh] flex items-center justify-center px-6 py-28">
        <div className="max-w-3xl text-center">
          <FadeInSection>
            <p className="text-[#c5a55a] text-xs tracking-[0.5em] mb-5"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>PERFORMER</p>
            <h2 className="text-3xl md:text-5xl text-[#f0ebe3] mb-3 tracking-[0.12em]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              <StaggerText text="Our Artisan" staggerDelay={0.05} />
            </h2>
            <p className="text-[#f0ebe3]/35 text-sm tracking-[0.2em]"
              style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>パフォーマー</p>
          </FadeInSection>

          <NordicDivider />

          <FadeInSection delay={0.4}>
            <p className="text-[#f0ebe3]/70 text-base md:text-lg leading-[2.4] tracking-wide mb-8"
              style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
              一杯のグラスに、物語を注ぐ。
            </p>
          </FadeInSection>

          <FadeInSection delay={0.6}>
            <p className="text-[#f0ebe3]/45 text-sm md:text-base leading-[2.6] tracking-wide"
              style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}>
              ソムリエ、バーテンダー、利き酒師の資格を持つスタッフが、<br className="hidden md:block" />
              お客様の好みや気分に合わせて最適な一杯をご提案いたします。<br className="hidden md:block" />
              ロブマイヤーのグラスの特性を熟知した上で、<br className="hidden md:block" />
              ワインや日本酒のポテンシャルを最大限に引き出す<br className="hidden md:block" />
              サービスをお約束いたします。
            </p>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ===== CONTACT =====

function ContactSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="contact" ref={ref} className="relative min-h-screen w-full overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #c5a55a 0.4px, transparent 0)`,
        backgroundSize: "48px 48px",
      }} />
      <GrainOverlay opacity={0.03} />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-28">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-16">
            <FadeInSection>
              <p className="text-[#c5a55a] text-xs tracking-[0.5em] mb-5"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>CONTACT</p>
              <h2 className="text-3xl md:text-5xl text-[#f0ebe3] mb-3 tracking-[0.12em]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                <StaggerText text="Information" staggerDelay={0.05} />
              </h2>
              <p className="text-[#f0ebe3]/35 text-sm tracking-[0.2em]"
                style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>店舗情報</p>
            </FadeInSection>
            <NordicDivider />
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
            <FadeInSection delay={0.3} direction="left" className="w-full lg:w-1/2">
              <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-sm">
                <motion.img
                  src={IMAGES.barCounterLight}
                  alt="LOBMEYRバーカウンター"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ y: photoY, filter: "brightness(0.8) contrast(1.05) saturate(0.95)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/50 via-transparent to-[#080808]/15" aria-hidden="true" />
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#c5a55a]/20" aria-hidden="true" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#c5a55a]/20" aria-hidden="true" />
              </div>
            </FadeInSection>

            <FadeInSection delay={0.5} direction="right" className="w-full lg:w-1/2 flex items-center">
              <div className="w-full">
                <div className="mb-12">
                  <motion.div className="flex justify-start mb-5"
                    whileInView={{ rotate: [0, 360] }} viewport={{ once: true }}
                    transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}>
                    <GoldEmblem size={44} />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl text-[#f0ebe3] tracking-[0.3em] mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>LOBMEYR</h3>
                  <p className="text-[#c5a55a]/60 text-xs tracking-[0.35em]"
                    style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>MEMBER'S SALON</p>
                </div>

                <address className="not-italic space-y-8">
                  {[
                    { icon: <MapPin size={15} strokeWidth={1.5} />,
                      content: <>〒760-0054<br />香川県高松市瓦町1-2-4<br />グルメ館 3F</> },
                    { icon: <Clock size={15} strokeWidth={1.5} />,
                      content: "完全予約制・会員制" },
                    { icon: <Phone size={15} strokeWidth={1.5} />,
                      content: <>会員様専用のご連絡先は<br />入会時にご案内いたします</> },
                  ].map((item, i) => (
                    <FadeInSection key={i} delay={0.6 + i * 0.15}>
                      <div className="flex items-start gap-6">
                        <div className="text-[#c5a55a]/60 mt-1.5 shrink-0" aria-hidden="true">{item.icon}</div>
                        <p className="text-[#f0ebe3]/60 text-sm leading-[2] tracking-wide"
                          style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>{item.content}</p>
                      </div>
                    </FadeInSection>
                  ))}
                </address>

                <div className="mt-12 mb-8"><GoldLine width="w-full" className="opacity-20" /></div>

                <FadeInSection delay={1}>
                  <p className="text-[#f0ebe3]/30 text-xs leading-[2.2] tracking-wide"
                    style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}>
                    ご入会をご希望の方は、<br />会員様からのご紹介が必要となります。
                  </p>
                </FadeInSection>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== FOOTER =====

function Footer() {
  const handleComingSoon = () => {
    toast("準備中です", { description: "このページは近日公開予定です。" });
  };

  return (
    <footer className="bg-[#050505] py-16 px-6 relative overflow-hidden">
      <motion.div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c5a55a]/10 to-transparent" aria-hidden="true"
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 2 }} />

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {["COMPANY", "RECRUIT", "PRIVACY POLICY"].map((label) => (
            <button key={label}
              onClick={handleComingSoon}
              className="text-[#f0ebe3]/25 hover:text-[#f0ebe3]/50 text-[10px] tracking-[0.25em] transition-colors duration-300"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              {label}
            </button>
          ))}
        </div>

        <GoldLine className="mb-10" width="w-12" />

        <div className="text-center">
          <p className="text-[#f0ebe3]/20 text-xs tracking-[0.4em] mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>LOBMEYR</p>
          <p className="text-[#f0ebe3]/10 text-[10px] tracking-[0.25em] mb-6"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            MEMBER'S SALON &mdash; TAKAMATSU, KAGAWA
          </p>
          <p className="text-[#f0ebe3]/8 text-[9px] tracking-[0.15em]"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            &copy; {new Date().getFullYear()} LOBMEYR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ===== MAIN PAGE =====

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      <SideDots activeSection={activeSection} onNavigate={handleNavigate} />

      <main>
        <HeroSection />
        <ConceptSection />
        <EventSection />
        <FloorSection />
        <MenuSection />
        <PerformerSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
