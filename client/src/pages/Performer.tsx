import { GrainOverlay, FadeInSection, StaggerText, NordicDivider } from "../components/shared";

export default function Performer() {
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
