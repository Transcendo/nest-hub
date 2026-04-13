import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { createMetadata } from "@/lib/metadata";

const fontSans = localFont({
	src: "../assets/Geist.ttf",
	variable: "--font-sans",
});

const fontMono = localFont({
	src: "../assets/GeistMono.ttf",
	variable: "--font-mono",
});

export const metadata: Metadata = createMetadata({
	title: {
		template: "%s | Better Auth",
		default: "Better Auth",
	},
	description: "The Most Comprehensive Authentication Framework",
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
				suppressHydrationWarning
			>
				<Providers>
					<div className="relative min-h-dvh">{children}</div>
				</Providers>
			</body>
		</html>
	);
}
