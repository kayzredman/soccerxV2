import { GlassPanel, Shell } from '@/components/ui/shell';

export default async function LeaguePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  return (
    <Shell className="py-8 sm:py-10">
      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <GlassPanel>
          <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Mini-league</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">League code: {code.toUpperCase()}</h1>
          <p className="mt-3 max-w-2xl text-white/62">
            Invite-only groups are the strongest retention lever in the docs. This page is designed to become a high-frequency social surface with rank swings, share cards, and private league identity.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              ['Members', '24'],
              ['Avg. points', '522'],
              ['Daily activity', '81%']
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">{label}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
        <GlassPanel>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Owner tools</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-white/65">
            <li>• Rename league</li>
            <li>• Regenerate invite code</li>
            <li>• Remove members</li>
            <li>• Keep picks immutable after lock</li>
          </ul>
        </GlassPanel>
      </div>
    </Shell>
  );
}
