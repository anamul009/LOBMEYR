import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { GrainOverlay, FadeInSection, StaggerText, NordicDivider, GoldEmblem, GoldLine } from "../components/shared";
import { IMAGES } from "../lib/constants";

export default function Contact({ showForm = true }: { showForm?: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "b7930356-4ec2-4f22-8d9c-11c8fa78f977");
    formData.append("subject", "【LOBMEYR】ウェブサイトからのお問い合わせ");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        form.reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="relative min-h-screen w-full overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #c5a55a 0.4px, transparent 0)`,
        backgroundSize: "48px 48px",
      }} />
      <GrainOverlay opacity={0.03} />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-28">
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

          <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16 mb-24">
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

          {showForm && <div className="max-w-2xl mx-auto border-t border-[#c5a55a]/10 pt-20">
            <FadeInSection>
              <h3 className="text-[#c5a55a] text-center text-sm tracking-[0.4em] mb-12"
                 style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>INQUIRY FORM</h3>
                 
              <form onSubmit={handleSubmit} className="space-y-8 relative">
                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -top-16 left-0 right-0 flex items-center justify-center gap-3 text-[#c5a55a] bg-[#c5a55a]/10 border border-[#c5a55a]/30 py-3 px-4 rounded-sm"
                    >
                      <CheckCircle2 size={16} />
                      <p className="text-sm tracking-widest" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
                        お問い合わせを送信しました。
                      </p>
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -top-16 left-0 right-0 flex items-center justify-center gap-3 text-red-400 bg-red-400/10 border border-red-400/30 py-3 px-4 rounded-sm"
                    >
                      <AlertCircle size={16} />
                      <p className="text-sm tracking-widest" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
                        送信に失敗しました。時間をおいて再度お試しください。
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="name" className="text-[#f0ebe3]/60 text-xs tracking-[0.2em]" 
                      style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>NAME <span className="text-[#c5a55a]">*</span></label>
                    <input type="text" id="name" name="name" required disabled={isSubmitting}
                      className="w-full bg-[#0d0d0d] border border-[#c5a55a]/20 focus:border-[#c5a55a]/60 text-[#f0ebe3] px-4 py-3 outline-none transition-colors duration-300 disabled:opacity-50"
                      style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}
                      placeholder="お名前" />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-[#f0ebe3]/60 text-xs tracking-[0.2em]" 
                      style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>EMAIL <span className="text-[#c5a55a]">*</span></label>
                    <input type="email" id="email" name="email" required disabled={isSubmitting}
                      className="w-full bg-[#0d0d0d] border border-[#c5a55a]/20 focus:border-[#c5a55a]/60 text-[#f0ebe3] px-4 py-3 outline-none transition-colors duration-300 disabled:opacity-50"
                      style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                      placeholder="mail@example.com" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="subject" className="text-[#f0ebe3]/60 text-xs tracking-[0.2em]" 
                    style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>SUBJECT</label>
                  <input type="text" id="subject" name="subject" disabled={isSubmitting}
                    className="w-full bg-[#0d0d0d] border border-[#c5a55a]/20 focus:border-[#c5a55a]/60 text-[#f0ebe3] px-4 py-3 outline-none transition-colors duration-300 disabled:opacity-50"
                    style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}
                    placeholder="件名" />
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="text-[#f0ebe3]/60 text-xs tracking-[0.2em]" 
                    style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>MESSAGE <span className="text-[#c5a55a]">*</span></label>
                  <textarea id="message" name="message" rows={5} required disabled={isSubmitting}
                    className="w-full bg-[#0d0d0d] border border-[#c5a55a]/20 focus:border-[#c5a55a]/60 text-[#f0ebe3] px-4 py-3 outline-none transition-colors duration-300 resize-y disabled:opacity-50"
                    style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}
                    placeholder="お問い合わせ内容をご記入ください"></textarea>
                </div>

                <div className="pt-4 flex justify-center">
                  <button type="submit" disabled={isSubmitting}
                    className="group relative flex items-center justify-center gap-3 w-full md:w-auto overflow-hidden bg-transparent border border-[#c5a55a]/40 text-[#c5a55a] px-12 py-4 hover:border-[#c5a55a] transition-colors duration-500 disabled:opacity-50 disabled:hover:border-[#c5a55a]/40">
                    <div className="absolute inset-0 bg-[#c5a55a] translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                    <span className="relative z-10 text-xs tracking-[0.3em] group-hover:text-[#080808] transition-colors duration-500"
                      style={{ fontFamily: "'Lato', sans-serif", fontWeight: 400 }}>
                      {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                    </span>
                    {!isSubmitting && <Send size={14} className="relative z-10 group-hover:text-[#080808] transition-colors duration-500" strokeWidth={1.5} />}
                  </button>
                </div>
              </form>
            </FadeInSection>
          </div>}

        </div>
      </div>
    </section>
  );
}
