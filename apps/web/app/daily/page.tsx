import { QuestionCard } from '@/components/daily/question-card';
import { GlassPanel, Shell } from '@/components/ui/shell';
import { todayQuestions } from '@/lib/mock-data';

export default function DailyPage() {
  return (
    <Shell className="py-8 sm:py-10">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Daily picks</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">The retention loop that static brackets miss.</h1>
          <p className="text-white/62">
            Every match-day becomes personally relevant with 1–2 quick bonus questions that lock at kickoff and settle through the same scoring engine.
          </p>
        </div>
        <GlassPanel className="min-w-[260px]">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Today’s pulse</p>
          <p className="mt-3 text-3xl font-semibold text-white">2 live bonuses</p>
          <p className="mt-2 text-sm text-white/55">Fast answer time. Strong repeat habit. High social pressure.</p>
        </GlassPanel>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {todayQuestions.map((question) => (
          <QuestionCard key={question.title} {...question} />
        ))}
      </div>
    </Shell>
  );
}
