import Link from 'next/link';
import { AsiStoryCardView } from '@/components/asi-export/asi-story-card';
import { ExportActions } from '@/components/asi-export/export-actions';
import { asiSlides } from '@/lib/asi-export/cards';

export default function AsiExportPage() {
  return (
    <main className="min-h-screen bg-[#eef2f7] text-black">
      <div className="mx-auto max-w-[1320px] px-6 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.22em] text-black/45">AI Card Studio / curated export</p>
            <h1 className="text-3xl font-semibold tracking-[-0.03em]">ASI Story Cards</h1>
            <p className="max-w-2xl text-sm leading-6 text-black/62">
              面向传播场景重排后的多图卡版本。每张图固定 600×800，按顺序可以连续解释 ASI。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link className="rounded-md border bg-white px-3 py-2 text-sm hover:bg-white/80" href="/docs/ai-card/asi">
              返回正文页
            </Link>
            <ExportActions />
          </div>
        </div>

        <div className="grid justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-2">
          {asiSlides.map((slide, index) => (
            <AsiStoryCardView key={slide.id} slide={slide} index={index} total={asiSlides.length} />
          ))}
        </div>
      </div>
    </main>
  );
}
