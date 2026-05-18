import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { GrainOverlay, FadeInSection, StaggerText } from "../components/shared";
import { IMAGES } from "../lib/constants";

export default function Floor() {
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
