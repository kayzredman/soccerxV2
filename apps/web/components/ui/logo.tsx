export function Logo() {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-brand">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(183,255,102,0.9),transparent_35%),radial-gradient(circle_at_70%_30%,rgba(94,234,212,0.9),transparent_35%),radial-gradient(circle_at_50%_72%,rgba(155,140,255,0.8),transparent_30%)]" />
      </div>
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-white/45">SoccerX</p>
        <p className="text-lg font-semibold tracking-tight text-white">39-day football game</p>
      </div>
    </div>
  );
}
