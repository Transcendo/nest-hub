import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://transcendo.github.io/nest-hub";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const basePages: MetadataRoute.Sitemap = [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1.0,
		},
	];

	const docPages: MetadataRoute.Sitemap = await Promise.all(
		source.getPages().map(async (page) => {
			const { lastModified } = await page.data.load();
			return {
				url: `${BASE_URL}${page.url}`,
				lastModified: lastModified ? new Date(lastModified) : new Date(),
				changeFrequency: "weekly",
				priority: 0.7,
			};
		}),
	);

	return [...basePages, ...docPages];
}
