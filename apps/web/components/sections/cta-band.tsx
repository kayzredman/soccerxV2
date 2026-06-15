"use client";

import { motion } from "motion/react";
import { Shell } from "@/components/ui/shell";
import { SparklesCore } from "@/components/ui/sparkles";
import Link from "next/link";

export function CtaBand() {
  return (
    <Shell className="py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className="glass glow relative overflow-hidden p-10 sm:p-16 text-center"
      >
        <div className="absolute inset-0 pointer-events-none">
          <SparklesCore id="cta-sparkles" background="transparent" minSize={0.3} maxSize={0.8} particleDensity={20} particleColor="#3b82f6" />
        </div>
        <div className="relative">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to play?</h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto">
            Sign up free. Build your bracket before the first whistle. Compete with friends and the world.
          </p>
          <div className="mt-8">
            <Link href="/bracket"
              className="inline-block rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 px-10 py-4 text-sm font-bold text-white shadow-xl shadow-brand-500/25 transition-all hover:shadow-brand-500/40 hover:scale-[1.02]"
            >Start Your Bracket</Link>
          </div>
        </div>
      </motion.div>
    </Shell>
  );
}
