import { motion } from "framer-motion";
import { toast } from "sonner";
import { GoldLine } from "./shared";

export function Footer() {
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
