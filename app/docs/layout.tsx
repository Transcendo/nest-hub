import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import type { PageEntry } from "./provider";
import { DocsProvider } from "./provider";

const allPages: PageEntry[] = source.getPages().map((page) => ({
	name: page.data.title,
	url: page.url,
}));

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<DocsProvider pages={allPages}>
			<DocsLayout
				tree={source.pageTree}
				nav={{ enabled: false }}
				searchToggle={{ enabled: true }}
				themeSwitch={{ enabled: false }}
				sidebar={{ enabled: true }}
				containerProps={{
					className: "docs-layout",
				}}
			>
				{children}
			</DocsLayout>
		</DocsProvider>
	);
}
