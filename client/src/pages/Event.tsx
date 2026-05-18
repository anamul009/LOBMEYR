import { GrainOverlay, FadeInSection, StaggerText, NordicDivider } from "../components/shared";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Event() {
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
