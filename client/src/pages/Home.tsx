import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GoldEmblem, FloatingParticles, GrainOverlay } from "../components/shared";
import { IMAGES } from "../lib/constants";

import Concept from "./Concept";
import Event from "./Event";
import Floor from "./Floor";
import Menu from "./Menu";
import Performer from "./Performer";
import Contact from "./Contact";

function HeroSection() {
  const [phase, setPhase] = useState<"curtain" | "forest" | "slideshow">("curtain");
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const [textRevealed, setTextRevealed] = useState(false);
  
  const { scrollYProgress } = useScroll();
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
    <section id="hero" className="relative h-screen w-full overflow-hidden">
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

export default function Home() {
  return (
    <>
      <HeroSection />
      <Concept />
      <Event />
      <Floor />
      <Menu />
      <Performer />
      <Contact showForm={false} />
    </>
  );
}
