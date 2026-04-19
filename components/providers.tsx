"use client";

import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider>
			<RootProvider theme={{ enabled: false }}>{children}</RootProvider>
		</ThemeProvider>
	);
}
