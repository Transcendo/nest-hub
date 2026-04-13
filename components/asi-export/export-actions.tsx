"use client";

import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { useState } from 'react';

async function downloadNode(node: HTMLElement, filename: string) {
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#ffffff',
    canvasWidth: 600,
    canvasHeight: 800,
  });
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

export function ExportActions() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-fd-accent/70 disabled:opacity-50"
        disabled={loading}
        onClick={async () => {
          const first = document.querySelector<HTMLElement>('[data-export-card]');
          if (!first) return;
          setLoading(true);
          try {
            await downloadNode(first, 'asi-01-cover.png');
          } finally {
            setLoading(false);
          }
        }}
      >
        <Download className="size-4" />
        下载当前首张
      </button>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-fd-accent/70 disabled:opacity-50"
        disabled={loading}
        onClick={async () => {
          const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-export-card]'));
          if (!nodes.length) return;
          setLoading(true);
          try {
            for (let i = 0; i < nodes.length; i++) {
              await downloadNode(nodes[i], `asi-${String(i + 1).padStart(2, '0')}.png`);
              await new Promise((r) => setTimeout(r, 250));
            }
          } finally {
            setLoading(false);
          }
        }}
      >
        <Download className="size-4" />
        {loading ? '导出中...' : '下载全部卡片'}
      </button>
    </div>
  );
}
