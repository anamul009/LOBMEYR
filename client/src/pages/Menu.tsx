import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInSection, StaggerText } from "../components/shared";
import { IMAGES } from "../lib/constants";

export default function Menu() {
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
