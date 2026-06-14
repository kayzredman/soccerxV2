'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { heroStats } from '@/lib/mock-data';
import { GlassPanel, Shell } from '@/components/ui/shell';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
};

export function HeroSection() {
  return (
    <Shell className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-hero-radial" />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid items-end gap-6 lg:grid-cols-[1.25fr_0.75fr]"
      >
        <div className="space-y-6">
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70">
            <Sparkles className="h-4 w-4 text-brand-300" />
            Premium match-day UX · Motion-first · Community-built energy
          </motion.div>
          <motion.div variants={item} className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Stop building a bracket. Start building a football game players open every single match-day.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
              SoccerX turns the 2026 World Cup into a social prediction loop with live scoring, daily picks, mini-leagues, and shareable moments.
            </p>
          </motion.div>
          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <Link
              href="/bracket"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
            >
              Start my bracket
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/daily"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/[0.06]"
            >
              View daily picks
            </Link>
          </motion.div>
        </div>
        <motion.div variants={item}>
          <GlassPanel className="overflow-hidden p-0">
            <div className="grid grid-cols-2 border-b border-white/8">
              {heroStats.map((stat) => (
                <div key={stat.label} className="border-r border-white/8 p-5 odd:border-r last:border-r-0">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/40">{stat.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/45">Live game pulse</p>
                  <p className="text-lg font-semibold text-white">England vs Morocco</p>
                </div>
                <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  LIVE · 58'
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-4 rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4">
                <div>
                  <p className="text-sm text-white/45">Your points if Brazil wins tonight</p>
                  <p className="mt-1 text-3xl font-semibold text-white">+25</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/45">Mini-league rank</p>
                  <p className="mt-1 text-3xl font-semibold text-brand-300">#2</p>
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </motion.div>
    </Shell>
  );
}
