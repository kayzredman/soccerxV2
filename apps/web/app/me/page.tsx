import { GlassPanel, Shell } from '@/components/ui/shell';

export default function MePage() {
  return (
    <Shell className="py-8 sm:py-10">
      <div className="mb-6 max-w-3xl space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-brand-300">My Game</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white">A player dashboard that explains progress, locks, and momentum.</h1>
        <p className="text-white/62">
          This surface is ready to show upcoming locks, score event history, points by day, and a social share panel without turning into a cluttered dashboard.
        </p>
      </div>
      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassPanel>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">My score</p>
          <p className="mt-3 text-5xl font-semibold text-white">642</p>
          <p className="mt-2 text-sm text-brand-300">+25 pending if tonight lands</p>
          <div className="mt-6 space-y-3 text-sm text-white/64">
            <div className="flex justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3"><span>Global rank</span><span>#118</span></div>
            <div className="flex justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3"><span>Country rank</span><span>#14</span></div>
            <div className="flex justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3"><span>Mini-league rank</span><span>#2</span></div>
          </div>
        </GlassPanel>
        <GlassPanel>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">What comes next</p>
          <div className="mt-5 space-y-4">
            {[
              ['Next lock', 'Spain vs Brazil · 18:00 UTC'],
              ['Pending settlement', '2 daily picks'],
              ['Share surface', 'Generate OG card after today’s scoring'],
              ['Archetype', 'Reveal after group-stage lock']
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/38">{label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </Shell>
  );
}
