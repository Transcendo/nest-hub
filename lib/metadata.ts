import type { Metadata } from "next";
import { productionSiteUrl } from "@/lib/site-constants";

const absoluteAsset = (assetPath: string) =>
	`${baseUrl.toString().replace(/\/$/, "")}${assetPath}`;

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		metadataBase: baseUrl,
		manifest: absoluteAsset("/favicon/site.webmanifest"),
		openGraph: {
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			url: baseUrl,
			images: absoluteAsset("/og.png"),
			siteName: "NestHub",
			...override.openGraph,
		},
		twitter: {
			card: "summary_large_image",
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			images: absoluteAsset("/og.png"),
			...override.twitter,
		},
		icons: {
			icon: [
				{
					url: absoluteAsset("/branding/nest-hub-logo.svg"),
					sizes: "any",
					type: "image/svg+xml",
				},
				{
					url: absoluteAsset("/favicon/favicon-32x32.png"),
					sizes: "32x32",
					type: "image/png",
				},
				{
					url: absoluteAsset("/favicon/favicon-16x16.png"),
					sizes: "16x16",
					type: "image/png",
				},
			],
			apple: absoluteAsset("/favicon/apple-touch-icon.png"),
		},
	};
}

export const baseUrl =
	process.env.NODE_ENV === "development"
		? new URL("http://localhost:3000")
		: new URL(process.env.NEXT_PUBLIC_SITE_URL || productionSiteUrl);
