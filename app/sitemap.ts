import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { productionSiteUrl } from "@/lib/site-constants";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || productionSiteUrl;
type LoadablePageData = {
	load: () => Promise<{
		lastModified?: string | Date;
	}>;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const now = new Date();
	const basePages: MetadataRoute.Sitemap = [
		{
			url: BASE_URL,
			lastModified: now,
			changeFrequency: "daily",
			priority: 1.0,
		},
		{
			url: `${BASE_URL}/docs`,
			lastModified: now,
			changeFrequency: "daily",
			priority: 0.9,
		},
	];

	const docPages: MetadataRoute.Sitemap = await Promise.all(
		source.getPages().map(async (page) => {
			const loadableData = page.data as typeof page.data & LoadablePageData;
			const { lastModified } = await loadableData.load();
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
