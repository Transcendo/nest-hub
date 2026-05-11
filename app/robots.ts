import type { MetadataRoute } from "next";
import { productionSiteUrl } from "@/lib/site-constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || productionSiteUrl;
const aiDiscoveryUserAgents = [
	"OAI-SearchBot",
	"ChatGPT-User",
	"GPTBot",
	"PerplexityBot",
	"ClaudeBot",
	"Claude-User",
	"Google-Extended",
] as const;

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/"],
			},
			...aiDiscoveryUserAgents.map((userAgent) => ({
				userAgent,
				allow: "/",
				disallow: ["/api/"],
			})),
		],
		sitemap: `${siteUrl}/sitemap.xml`,
		host: siteUrl,
	};
}
