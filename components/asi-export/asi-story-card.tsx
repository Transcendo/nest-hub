import type { ReactNode } from 'react';
import type { AsiSlide } from '@/lib/asi-export/cards';

function CardShell({
  children,
  kicker,
  index,
  total,
  dark = false,
}: {
  children: ReactNode;
  kicker: string;
  index: number;
  total: number;
  dark?: boolean;
}) {
  return (
    <section
      data-export-card
      className={`relative h-[800px] w-[600px] overflow-hidden rounded-[32px] border shadow-2xl ${dark ? 'border-white/10 bg-[#0b1020] text-white' : 'border-black/8 bg-[#fcfcfd] text-[#0f172a]'}`}
    >
      {children}
      <div className={`absolute left-0 right-0 top-0 flex items-center justify-between px-8 pt-7 text-[11px] uppercase tracking-[0.22em] ${dark ? 'text-white/55' : 'text-black/45'}`}>
        <span>{kicker}</span>
        <span>{String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
      </div>
    </section>
  );
}

export function AsiStoryCardView({ slide, index, total }: { slide: AsiSlide; index: number; total: number }) {
  if (slide.type === 'cover') {
    return (
      <CardShell kicker={slide.kicker} index={index} total={total} dark>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.45),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.40),transparent_36%),linear-gradient(180deg,#0b1020_0%,#121a33_100%)]" />
        <div className="relative flex h-full flex-col justify-between p-10 pt-24">
          <div className="space-y-5">
            {slide.eyebrow ? <p className="text-sm uppercase tracking-[0.18em] text-white/60">{slide.eyebrow}</p> : null}
            <h2 className="max-w-[500px] text-[42px] font-semibold leading-[1.08] tracking-[-0.04em] text-white">{slide.title}</h2>
            <p className="max-w-[460px] text-[20px] leading-8 text-white/74">{slide.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/7 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">核心词</p>
              <p className="mt-2 text-lg font-medium text-white">Superintelligence</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/7 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">当前状态</p>
              <p className="mt-2 text-lg font-medium text-white">尚未被公开证实实现</p>
            </div>
          </div>
        </div>
      </CardShell>
    );
  }

  if (slide.type === 'definition') {
    return (
      <CardShell kicker={slide.kicker} index={index} total={total}>
        <div className="relative flex h-full flex-col p-10 pt-24">
          <div className="space-y-5">
            <div className="inline-flex rounded-full bg-[#e8f0ff] px-3 py-1 text-xs font-medium text-[#2854c5]">一句话理解</div>
            <h2 className="text-[34px] font-semibold leading-[1.15] tracking-[-0.03em]">{slide.title}</h2>
            <p className="text-[18px] leading-8 text-black/72">{slide.definition}</p>
          </div>
          <div className="mt-7 grid gap-4">
            {slide.notes.map((note) => (
              <div key={note} className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm">
                <p className="text-[17px] leading-7 text-black/82">{note}</p>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-6 text-sm text-black/45">ASI / Definition Card</div>
        </div>
      </CardShell>
    );
  }

  if (slide.type === 'comparison') {
    return (
      <CardShell kicker={slide.kicker} index={index} total={total}>
        <div className="relative flex h-full flex-col p-10 pt-24">
          <div className="space-y-3">
            <h2 className="text-[34px] font-semibold leading-[1.12] tracking-[-0.03em]">{slide.title}</h2>
          </div>
          <div className="mt-8 grid flex-1 grid-cols-2 gap-5">
            <div className="rounded-[24px] border border-[#3b82f6]/18 bg-[#eff6ff] p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-[#3b82f6]">LEFT</p>
              <h3 className="mt-3 text-[28px] font-semibold">{slide.left.title}</h3>
              <div className="mt-5 space-y-3">
                {slide.left.points.map((point) => (
                  <div key={point} className="rounded-xl bg-white/80 px-4 py-3 text-[16px] leading-6 text-black/82">{point}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-[#8b5cf6]/18 bg-[#f5f3ff] p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-[#8b5cf6]">RIGHT</p>
              <h3 className="mt-3 text-[28px] font-semibold">{slide.right.title}</h3>
              <div className="mt-5 space-y-3">
                {slide.right.points.map((point) => (
                  <div key={point} className="rounded-xl bg-white/82 px-4 py-3 text-[16px] leading-6 text-black/82">{point}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardShell>
    );
  }

  if (slide.type === 'reasons') {
    return (
      <CardShell kicker={slide.kicker} index={index} total={total}>
        <div className="relative flex h-full flex-col p-10 pt-24">
          <div className="space-y-3">
            <h2 className="text-[34px] font-semibold leading-[1.12] tracking-[-0.03em]">{slide.title}</h2>
          </div>
          <div className="mt-8 grid gap-4">
            {slide.reasons.map((reason) => (
              <div key={reason.no} className="grid grid-cols-[68px_1fr] gap-4 rounded-[22px] border border-black/8 bg-white p-5 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#111827] text-lg font-semibold text-white">{reason.no}</div>
                <div>
                  <h3 className="text-[20px] font-semibold leading-7">{reason.title}</h3>
                  <p className="mt-1 text-[16px] leading-7 text-black/70">{reason.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardShell>
    );
  }

  if (slide.type === 'faq') {
    return (
      <CardShell kicker={slide.kicker} index={index} total={total} dark>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)]" />
        <div className="absolute left-8 top-24 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/65">Q & A</div>
        <div className="relative flex h-full flex-col p-10 pt-40">
          <h2 className="max-w-[500px] text-[36px] font-semibold leading-[1.15] tracking-[-0.03em] text-white">{slide.question}</h2>
          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
            <p className="text-[20px] leading-8 text-white/82">{slide.answer}</p>
          </div>
          {slide.takeaway ? (
            <div className="mt-5 rounded-[20px] border border-[#60a5fa]/20 bg-[#60a5fa]/12 p-5">
              <p className="text-[16px] leading-7 text-white/85">{slide.takeaway}</p>
            </div>
          ) : null}
          <div className="mt-auto pt-6 text-sm text-white/45">ASI / FAQ Card</div>
        </div>
      </CardShell>
    );
  }

  return (
    <CardShell kicker={slide.kicker} index={index} total={total}>
      <div className="relative flex h-full flex-col p-10 pt-24">
        <div className="rounded-[28px] bg-[linear-gradient(135deg,rgba(59,130,246,0.10),rgba(16,185,129,0.10))] p-8">
          <h2 className="text-[36px] font-semibold leading-[1.15] tracking-[-0.03em]">{slide.title}</h2>
        </div>
        <div className="mt-8 grid gap-4">
          {slide.bullets.map((bullet) => (
            <div key={bullet} className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm">
              <p className="text-[17px] leading-7 text-black/82">{bullet}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-[24px] border border-[#10b981]/15 bg-[#ecfdf5] p-6">
          <p className="text-[18px] font-medium leading-8 text-black/82">{slide.ending}</p>
        </div>
      </div>
    </CardShell>
  );
}
