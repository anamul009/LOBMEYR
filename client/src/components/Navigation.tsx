import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";
import { NAV_ITEMS } from "../lib/constants";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const mainNav = NAV_ITEMS.slice(1);

  const handleComingSoon = () => {
    toast("準備中です", { description: "このページは近日公開予定です。" });
  };

  return (
    <>
      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <Link href="/" className="flex items-center gap-3 group" aria-label="LOBMEYRトップへ">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="LOBMEYR"
              className="h-32 md:h-40 w-auto object-contain transition-opacity duration-500 group-hover:opacity-80"
            />
          </Link>

          <nav className="hidden xl:flex items-center gap-8" aria-label="メインナビゲーション">
            {mainNav.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.id} href={item.path} className="relative group cursor-pointer block">
                  <span className={`text-[11px] tracking-[0.25em] transition-all duration-500 ${
                    isActive ? "text-[#c5a55a]" : "text-[#f0ebe3]/60 group-hover:text-[#f0ebe3]"
                  }`} style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                    {item.label}
                  </span>
                  <motion.div className="absolute -bottom-1 left-0 right-0 h-px bg-[#c5a55a]"
                    initial={false} animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: "center" }} />
                </Link>
              );
            })}
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
<nav className="flex flex-col gap-6 mb-16" aria-label="モバイルナビゲーション">
              {NAV_ITEMS.map((item, i) => {
                const isActive = location === item.path;
                return (
                  <Link key={item.id} href={item.path} onClick={() => setIsOpen(false)}>
                    <motion.span
                      initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={`block text-left transition-all duration-500 cursor-pointer ${
                        isActive ? "text-[#c5a55a]" : "text-[#f0ebe3]/80 hover:text-[#f0ebe3]"
                      }`}
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.8rem", letterSpacing: "0.15em" }}>
                      {item.label}
                    </motion.span>
                  </Link>
                );
              })}
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

export function SideDots() {
  const [location] = useLocation();

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-3" aria-label="セクションナビゲーション">
      {NAV_ITEMS.map((item) => {
        const isActive = location === item.path;
        return (
          <Link key={item.id} href={item.path} className="group flex items-center gap-3 justify-end cursor-pointer" title={item.label} aria-label={`${item.label}へ移動`}>
            <motion.span className={`text-[9px] tracking-[0.2em] ${
              isActive ? "text-[#c5a55a]" : "text-[#f0ebe3]/40"
            }`} style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
              initial={false} animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
              whileHover={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              {item.label}
            </motion.span>
            <motion.div className="rounded-full border" initial={false}
              animate={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                backgroundColor: isActive ? "#c5a55a" : "transparent",
                borderColor: isActive ? "#c5a55a" : "rgba(240,235,227,0.25)",
              }}
              whileHover={{ borderColor: "rgba(240,235,227,0.6)" }}
              transition={{ duration: 0.5 }} />
          </Link>
        );
      })}
    </nav>
  );
}
