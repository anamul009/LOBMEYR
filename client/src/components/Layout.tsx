import React from "react";
import { Navigation, SideDots } from "./Navigation";
import { Footer } from "./Footer";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Navigation />
      <SideDots />
      
      <main className="flex-grow relative">
        <motion.div
          key={location}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
