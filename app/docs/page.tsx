import Link from "next/link";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { baseUrl, createMetadata } from "@/lib/metadata";
import { cityCards } from "@/lib/site-config";

const docsTitle = "NestHub 文档目录";
const docsDescription =
	"NestHub 按避坑指南和北京、上海、广州、杭州、深圳、南京、成都、武汉城市入口组织租房决策内容，适合新入职、实习和搬家人群快速找到办公区、通勤与签约检查清单。";
const docsUrl = new URL("/docs", baseUrl).toString();

const sections = [
	{
		title: "避坑指南",
		description: "把租前准备、看房、签约、入住和维权串起来，作为所有城市的统一入口。",
		href: "/docs/avoid-pitfalls",
	},
];

const docsJsonLd = [
	{
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: docsTitle,
		description: docsDescription,
		url: docsUrl,
		inLanguage: "zh-CN",
		isPartOf: {
			"@type": "WebSite",
			name: "NestHub",
			url: baseUrl.toString(),
		},
	},
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "NestHub",
				item: baseUrl.toString(),
			},
			{
				"@type": "ListItem",
				position: 2,
				name: docsTitle,
				item: docsUrl,
			},
		],
	},
	{
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "NestHub 租房指南公开入口",
		itemListElement: [...sections, ...cityCards].map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.title,
			url: new URL(item.href, baseUrl).toString(),
			description: item.description,
		})),
	},
];

function serializeJsonLd(jsonLd: unknown) {
	return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}

export default function DocsIndexPage() {
	return (
		<DocsPage breadcrumb={{ enabled: false }}>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: serializeJsonLd(docsJsonLd) }}
			/>
			<DocsTitle>{docsTitle}</DocsTitle>
			<DocsDescription>
				先看避坑指南，再按城市进入对应的办公区和通勤带页面。
			</DocsDescription>
			<DocsBody>
				<div className="space-y-8 not-prose">
					<section>
						<h2 className="text-lg font-semibold">开始阅读</h2>
						<p className="mt-2 text-sm leading-6 text-muted-foreground">
							如果你是第一次用这个站点，先读避坑指南，再进入城市页。
						</p>
						<div className="mt-4 grid gap-4 md:grid-cols-2">
							{sections.map((section) => (
								<Link
									key={section.href}
									href={section.href}
									className="rounded-2xl border border-border bg-background p-5 transition hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm"
								>
									<h2 className="text-base font-semibold">{section.title}</h2>
									<p className="mt-2 text-sm leading-6 text-muted-foreground">
										{section.description}
									</p>
								</Link>
							))}
						</div>
					</section>

					<section>
						<h2 className="text-lg font-semibold">按城市进入</h2>
						<p className="mt-2 text-sm leading-6 text-muted-foreground">
							顶栏和这里保持一致，只按城市一级入口组织，不在顶部展开公司子项。
						</p>
						<div className="mt-4 grid gap-4 md:grid-cols-2">
							{cityCards.map((city) => (
								<Link
									key={city.href}
									href={city.href}
									className="rounded-2xl border border-border bg-background p-5 transition hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm"
								>
									<h2 className="text-base font-semibold">{city.title}</h2>
									<p className="mt-2 text-sm leading-6 text-muted-foreground">
										{city.description}
									</p>
								</Link>
							))}
						</div>
					</section>
				</div>
			</DocsBody>
		</DocsPage>
	);
}

export const metadata = createMetadata({
	title: docsTitle,
	description: docsDescription,
	alternates: {
		canonical: "/docs",
	},
	openGraph: {
		title: docsTitle,
		description: docsDescription,
		type: "website",
		url: docsUrl,
	},
	twitter: {
		card: "summary_large_image",
		title: docsTitle,
		description: docsDescription,
	},
});
