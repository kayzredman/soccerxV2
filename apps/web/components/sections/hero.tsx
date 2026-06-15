"use client";

import { motion } from "motion/react";
import { Shell } from "@/components/ui/shell";
import { SparklesCore } from "@/components/ui/sparkles";
import { BlurFade } from "@/components/ui/blur-fade";
import Link from "next/link";

export function HeroSection() {
  return (
    <Shell className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={40}
          particleColor="#60a5fa"
        />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <BlurFade delay={0.1}>
          <div className="mb-5 inline-flex items-center rounded-full border border-brand-400/20 bg-brand-400/10 px-4 py-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-300">World Cup 2026</span>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl leading-[1.1]">
            <span className="gradient-text">Predict.</span>{" "}
            <span className="text-white">Compete.</span>{" "}
            <span className="gradient-text">Dominate.</span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.35}>
          <p className="mt-6 text-lg text-white/45 sm:text-xl max-w-xl mx-auto leading-relaxed">
            The ultimate social prediction game for FIFA World Cup 2026.
            Build your bracket, make daily picks, climb the leaderboard.
          </p>
        </BlurFade>

        <BlurFade delay={0.5}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/bracket"
              className="w-full rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 px-8 py-4 text-center text-sm font-bold text-white shadow-xl shadow-brand-500/25 transition-all hover:shadow-brand-500/40 hover:scale-[1.02] sm:w-auto"
            >
              Build Your Bracket
            </Link>
            <Link href="/matches"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-center text-sm font-semibold text-white/80 transition-all hover:border-white/20 hover:bg-white/[0.06] sm:w-auto"
            >
              See All Matches
            </Link>
          </div>
        </BlurFade>
      </div>
    </Shell>
  );
}
