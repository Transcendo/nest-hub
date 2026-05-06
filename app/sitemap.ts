import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { productionSiteUrl } from "@/lib/site-constants";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || productionSiteUrl;
const CITY_HUB_PATHS = new Set([
	"/docs/beijing",
	"/docs/shanghai",
	"/docs/guangzhou",
	"/docs/hangzhou",
	"/docs/shenzhen",
	"/docs/nanjing",
	"/docs/chengdu",
	"/docs/wuhan",
]);

type LoadablePageData = {
	load: () => Promise<{
		lastModified?: string | Date;
	}>;
};

function getDocSitemapSignals(pageUrl: string): Pick<
	MetadataRoute.Sitemap[number],
	"changeFrequency" | "priority"
> {
	if (CITY_HUB_PATHS.has(pageUrl)) {
		return {
			changeFrequency: "daily",
			priority: 0.9,
		};
	}

	if (pageUrl.startsWith("/docs/avoid-pitfalls")) {
		return {
			changeFrequency: "monthly",
			priority: pageUrl === "/docs/avoid-pitfalls" ? 0.85 : 0.8,
		};
	}

	if (pageUrl.endsWith("-renting-guide")) {
		return {
			changeFrequency: "weekly",
			priority: 0.75,
		};
	}

	return {
		changeFrequency: "weekly",
		priority: 0.7,
	};
}

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
			priority: 0.95,
		},
	];

	const docPages: MetadataRoute.Sitemap = await Promise.all(
		source.getPages().map(async (page) => {
			const loadableData = page.data as typeof page.data & LoadablePageData;
			const { lastModified } = await loadableData.load();
			return {
				url: `${BASE_URL}${page.url}`,
				lastModified: lastModified ? new Date(lastModified) : new Date(),
				...getDocSitemapSignals(page.url),
			};
		}),
	);

	return [...basePages, ...docPages];
}
