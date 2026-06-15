import { Shell } from "@/components/ui/shell";
import { ScoreSummary } from "@/components/me/score-summary";
import { PickHistory } from "@/components/me/pick-history";

export default function MePage() {
  return (
    <Shell className="py-10">
      <div className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-400 font-semibold">My Game</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Your Dashboard</h1>
        <p className="text-white/40">Track your picks, scores, and progress.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1"><ScoreSummary /></div>
        <div className="lg:col-span-2"><PickHistory /></div>
      </div>
    </Shell>
  );
}
