import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { GrainOverlay, FadeInSection, GoldLine } from "../components/shared";
import { EVENTS, IMAGES } from "../lib/constants";
import NotFound from "./NotFound";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const event = EVENTS.find((e) => e.id === id);

  if (!event) return <NotFound />;

  const heroImage = IMAGES[event.image as keyof typeof IMAGES] ?? IMAGES.wine;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #c5a55a 0.4px, transparent 0)`,
        backgroundSize: "60px 60px",
      }} />
      <GrainOverlay opacity={0.02} />

      <div className="relative h-[45vh] md:h-[55vh] overflow-hidden">
        <img
          src={heroImage}
          alt={event.title}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45) contrast(1.05) saturate(0.85)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" aria-hidden="true" />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 px-6 text-center">
          <FadeInSection>
            <span className="text-[#c5a55a]/70 text-[10px] tracking-[0.25em] border border-[#c5a55a]/25 px-4 py-1.5 mb-6 inline-block"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              {event.category}
            </span>
            <h1 className="text-2xl md:text-4xl lg:text-5xl text-[#f0ebe3] tracking-[0.08em] leading-snug"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              {event.title}
            </h1>
            <p className="text-[#f0ebe3]/35 text-xs tracking-[0.2em] mt-4"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              {event.date}
            </p>
          </FadeInSection>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <FadeInSection delay={0.1}>
          <p className="text-[#f0ebe3]/55 text-base leading-[2.4] tracking-wide mb-12"
            style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
            {event.desc}
          </p>
          <GoldLine width="w-16" className="mb-12" />
        </FadeInSection>

        <div className="space-y-12">
          {event.fullContent.map((section, i) => (
            <FadeInSection key={i} delay={0.15 + i * 0.1}>
              <div>
                <h2 className="text-[#c5a55a] text-xs tracking-[0.35em] mb-5"
                  style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                  {section.heading}
                </h2>
                <p className="text-[#f0ebe3]/65 text-sm leading-[2.4] tracking-wide whitespace-pre-line"
                  style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
                  {section.body}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.5}>
          <div className="mt-20 pt-10 border-t border-[#c5a55a]/10">
            <Link href="/event">
              <motion.div
                className="group flex items-center gap-3 text-[#f0ebe3]/40 hover:text-[#c5a55a] transition-colors duration-500 cursor-pointer"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.3 }}>
                <ArrowLeft size={14} strokeWidth={1.5} />
                <span className="text-xs tracking-[0.25em]"
                  style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                  BACK TO EVENTS
                </span>
              </motion.div>
            </Link>

          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
