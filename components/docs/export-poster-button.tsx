"use client";

import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import { useState } from "react";

function safeName(input: string) {
	return input
		.toLowerCase()
		.replace(/[^a-z0-9\u4e00-\u9fa5]+/gi, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 80);
}

export function ExportPosterButton({
	title,
}: {
	title: string;
}) {
	const [loading, setLoading] = useState(false);

	return (
		<button
			type="button"
			className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-fd-accent/70 disabled:opacity-50"
			disabled={loading}
			onClick={async () => {
				const article = document.querySelector("article");
				if (!article) return;

				setLoading(true);
				const previousWidth = (article as HTMLElement).style.width;
				const previousMaxWidth = (article as HTMLElement).style.maxWidth;
				const previousMargin = (article as HTMLElement).style.margin;
				const previousPadding = (article as HTMLElement).style.padding;
				const previousBackground = document.body.style.background;

				try {
					document.body.style.background = "#ffffff";
					(article as HTMLElement).style.width = "600px";
					(article as HTMLElement).style.maxWidth = "600px";
					(article as HTMLElement).style.margin = "0 auto";
					(article as HTMLElement).style.padding = "24px";

					const dataUrl = await toPng(article as HTMLElement, {
						cacheBust: true,
						pixelRatio: 2,
						backgroundColor: "#ffffff",
						canvasWidth: 600,
					});

					const a = document.createElement("a");
					a.href = dataUrl;
					a.download = `${safeName(title || "poster")}-600x800.png`;
					a.click();
				} finally {
					(article as HTMLElement).style.width = previousWidth;
					(article as HTMLElement).style.maxWidth = previousMaxWidth;
					(article as HTMLElement).style.margin = previousMargin;
					(article as HTMLElement).style.padding = previousPadding;
					document.body.style.background = previousBackground;
					setLoading(false);
				}
			}}
		>
			<Download className="size-4" />
			{loading ? "Exporting..." : "Export 600×800（旧）"}
		</button>
	);
}
