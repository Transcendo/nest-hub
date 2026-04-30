import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { docsLayoutProps } from "@/lib/site-config";
import { source } from "@/lib/source";
import type { PageEntry } from "./provider";
import { DocsProvider } from "./provider";

const allPages: PageEntry[] = source.getPages().map((page) => ({
	name: page.data.title ?? page.url,
	url: page.url,
}));

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<DocsProvider pages={allPages}>
			<Suspense>
				<DocsSidebar />
			</Suspense>
			<DocsLayout
				{...docsLayoutProps}
				tree={source.pageTree}
				sidebar={{ enabled: false }}
				containerProps={{
					className: "docs-layout",
				}}
			>
				{children}
				<LegalDisclaimer />
			</DocsLayout>
		</DocsProvider>
	);
}
