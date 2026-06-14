import { LeaderboardTable } from '@/components/leaderboard/leaderboard-table';
import { GlassPanel, Shell } from '@/components/ui/shell';

export default function LeaderboardPage() {
  return (
    <Shell className="py-8 sm:py-10">
      <div className="mb-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Leaderboards</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">Fast, clear, obsession-friendly ranking surfaces.</h1>
          <p className="text-white/62">
            Future data should read from a cached leaderboard view for fast updates while the scoring worker keeps totals and ranks fresh in the background.
          </p>
        </div>
        <GlassPanel>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Scopes</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Global', 'Country', 'Mini-league'].map((scope) => (
              <span key={scope} className="rounded-full border border-white/10 px-3 py-2 text-sm text-white/72">
                {scope}
              </span>
            ))}
          </div>
        </GlassPanel>
      </div>
      <LeaderboardTable />
    </Shell>
  );
}
