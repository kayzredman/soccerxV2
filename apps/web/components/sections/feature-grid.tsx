"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Shell, GlassPanel } from "@/components/ui/shell";

var features = [
  {
    icon: "\u{1F3C6}",
    title: "Bracket Builder",
    description: "Predict group winners, knockout rounds, and the ultimate champion across all 48 teams and 12 groups.",
    href: "/bracket",
    points: "Up to 200pts per correct pick",
  },
  {
    icon: "\u26A1",
    title: "Daily Picks",
    description: "Make match-day predictions: first scorer, final score, red cards. The more you risk, the more you earn.",
    href: "/daily",
    points: "5-15pts per question",
  },
  {
    icon: "\u{1F4CA}",
    title: "Live Leaderboards",
    description: "Compete globally or in private mini-leagues. Watch your rank update in real-time as matches finish.",
    href: "/leaderboard",
    points: "Updated every 60 seconds",
  },
];

export function FeatureGrid() {
  return (
    <Shell className="py-16">
      <div className="grid gap-5 md:grid-cols-3">
        {features.map(function(feature, index) {
          return (
            <BlurFade key={feature.title} delay={0.4 + index * 0.12}>
              <a href={feature.href} className="block h-full">
                <GlassPanel className="h-full group cursor-pointer">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">{feature.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">{feature.description}</p>
                  <div className="flex items-center gap-2 text-xs text-brand-400/70">
                    <span className="h-px flex-1 bg-white/[0.06]" />
                    <span className="uppercase tracking-wider">{feature.points}</span>
                    <span className="h-px flex-1 bg-white/[0.06]" />
                  </div>
                </GlassPanel>
              </a>
            </BlurFade>
          );
        })}
      </div>
    </Shell>
  );
}
