import { Shell, GlassPanel } from "@/components/ui/shell";

export default function LeaguePage({ params }: { params: { code: string } }) {
  return (
    <Shell className="py-10">
      <div className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-400 font-semibold">Mini-League</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">League: {params.code}</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <GlassPanel>
          <h3 className="text-lg font-bold text-white mb-3">Invite Friends</h3>
          <div className="glass p-4 text-center">
            <p className="text-2xl font-mono font-bold tracking-[0.3em] text-brand-300">{params.code.toUpperCase()}</p>
            <p className="text-xs text-white/30 mt-2">Share this code with friends to join</p>
          </div>
        </GlassPanel>
        <GlassPanel>
          <h3 className="text-lg font-bold text-white mb-3">Members</h3>
          <p className="text-white/40 text-sm">Sign in to view league members and standings.</p>
        </GlassPanel>
      </div>
    </Shell>
  );
}
