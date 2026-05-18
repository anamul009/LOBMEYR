import { ParallaxImage, GrainOverlay, FadeInSection, StaggerText, NordicDivider } from "../components/shared";
import { IMAGES } from "../lib/constants";

export default function Concept() {
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
