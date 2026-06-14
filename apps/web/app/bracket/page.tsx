import { GroupCard } from '@/components/bracket/group-card';
import { GlassPanel, Shell } from '@/components/ui/shell';
import { bracketGroups } from '@/lib/mock-data';

export default function BracketPage() {
  return (
    <Shell className="py-8 sm:py-10">
      <div className="mb-6 max-w-3xl space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Bracket builder</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white">Build the spine of your tournament story.</h1>
        <p className="text-white/62">
          v1 starts fast with group-focused entry while keeping the experience ready for knockout expansion, best-third logic, and champion-path visuals.
        </p>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
          {bracketGroups.map((group) => (
            <GroupCard key={group.group} group={group.group} teams={group.teams} />
          ))}
        </div>
        <GlassPanel className="h-fit">
          <p className="text-sm uppercase tracking-[0.24em] text-white/45">UX intent</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">One screen, one task.</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-white/64">
            <li>• Focused entry flow with clear lock messaging</li>
            <li>• High-contrast team cards with touch-friendly targets</li>
            <li>• Progressive disclosure for best-third and knockout complexity</li>
            <li>• Future-ready Champion’s Path animation zone</li>
          </ul>
        </GlassPanel>
      </div>
    </Shell>
  );
}
