import { Shell } from "@/components/ui/shell";
import { RankList } from "@/components/leaderboard/rank-list";

export default function LeaderboardPage() {
  return (
    <Shell className="py-10">
      <div className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-400 font-semibold">Leaderboards</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Global Rankings</h1>
        <p className="text-white/40">Updated every 60 seconds during live matches.</p>
      </div>
      <RankList />
    </Shell>
  );
}
