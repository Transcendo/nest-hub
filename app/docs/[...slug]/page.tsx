import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/page";
import Link from "next/link";
import { notFound } from "next/navigation";
import { APIMethod } from "@/components/api-method";
import { AvoidPitfallsOverview } from "@/components/docs/avoid-pitfalls-overview";
import {
	ContractGuidePage,
	LivingGuidePage,
	PreparationGuidePage,
	RightsGuidePage,
	TrapsGuidePage,
	ViewingGuidePage,
} from "@/components/docs/avoid-pitfalls-pages";
import { BeijingOverview } from "@/components/docs/beijing-overview";
import { ChengduOverview } from "@/components/docs/chengdu-overview";
import { GuangzhouOverview } from "@/components/docs/guangzhou-overview";
import { HangzhouOverview } from "@/components/docs/hangzhou-overview";
import { NanjingOverview } from "@/components/docs/nanjing-overview";
import { ShanghaiOverview } from "@/components/docs/shanghai-overview";
import { ShenzhenOverview } from "@/components/docs/shenzhen-overview";
import { WuhanOverview } from "@/components/docs/wuhan-overview";
import { Features } from "@/components/docs/features";
import {
	AddToCursor,
	DatabaseTable,
	DividerText,
	Endpoint,
	ForkButton,
	GenerateAppleJwt,
	GenerateSecret,
} from "@/components/docs/mdx-components";
import { Callout } from "@/components/ui/callout";
import { baseUrl, createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";

type LoadableDocData = {
	load: () => Promise<{
		body: React.ComponentType<any>;
		toc: unknown;
		lastModified?: string | Date;
	}>;
};

type JsonLd = Record<string, unknown>;

const segmentLabels: Record<string, string> = {
	docs: "租房指南",
	"avoid-pitfalls": "租房避坑指南",
	contract: "租房合同审查",
	living: "入住与居住检查",
	preparation: "租房准备清单",
	rights: "租客维权指南",
	traps: "租房常见陷阱",
	viewing: "实地看房检查",
	beijing: "北京租房指南",
	chengdu: "成都租房指南",
	guangzhou: "广州租房指南",
	hangzhou: "杭州租房指南",
	nanjing: "南京租房指南",
	shanghai: "上海租房指南",
	shenzhen: "深圳租房指南",
	wuhan: "武汉租房指南",
};

const legacyDocCanonicals: Record<string, string> = {
	"/docs/mandatory-read": "/docs/avoid-pitfalls",
	"/docs/mandatory-read/renting-pitfalls": "/docs/avoid-pitfalls/traps",
};

function formatSchemaDate(value?: string | Date) {
	if (!value) return undefined;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function getBreadcrumbItems(pageUrl: string, title: string) {
	const segments = pageUrl.split("/").filter(Boolean);
	let currentPath = "";

	return [
		{
			"@type": "ListItem",
			position: 1,
			name: "NestHub",
			item: baseUrl.toString(),
		},
		...segments.map((segment, index) => {
			currentPath += `/${segment}`;
			const isCurrentPage = index === segments.length - 1;

			return {
				"@type": "ListItem",
				position: index + 2,
				name: isCurrentPage ? title : (segmentLabels[segment] ?? segment),
				item: new URL(currentPath, baseUrl).toString(),
			};
		}),
	];
}

function isKnownSegmentLabel(value: string | undefined): value is string {
	return Boolean(value);
}

function buildArticleKeywords(pageUrl: string, title: string) {
	const segmentKeywords = pageUrl
		.split("/")
		.filter(Boolean)
		.map((segment) => segmentLabels[segment])
		.filter(isKnownSegmentLabel);

	return Array.from(
		new Set([
			"租房指南",
			"通勤选址",
			"租金预算",
			"看房避坑",
			"合同风险",
			title,
			...segmentKeywords,
		]),
	).join(", ");
}

function buildArticleAbout(pageUrl: string, title: string): JsonLd[] {
	const segmentEntities = pageUrl
		.split("/")
		.filter(Boolean)
		.map((segment) => segmentLabels[segment])
		.filter(isKnownSegmentLabel)
		.map((name) => ({
			"@type": "Thing",
			name,
		}));

	return [
		{
			"@type": "Thing",
			name: title,
		},
		{
			"@type": "Thing",
			name: "租房决策",
		},
		{
			"@type": "Thing",
			name: "通勤选址",
		},
		{
			"@type": "Thing",
			name: "租金预算",
		},
		...segmentEntities,
	];
}

function buildDocPageJsonLd({
	pageUrl,
	title,
	description,
	lastModified,
}: {
	pageUrl: string;
	title: string;
	description?: string;
	lastModified?: string | Date;
}): JsonLd[] {
	const absoluteUrl = new URL(pageUrl, baseUrl).toString();
	const dateModified = formatSchemaDate(lastModified);
	const organization = {
		"@type": "Organization",
		name: "NestHub",
		url: baseUrl.toString(),
	};
	const article: JsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: title,
		description,
		articleSection: pageUrl.startsWith("/docs/avoid-pitfalls")
			? "租房避坑"
			: "城市与公司租房指南",
		keywords: buildArticleKeywords(pageUrl, title),
		about: buildArticleAbout(pageUrl, title),
		inLanguage: "zh-CN",
		isAccessibleForFree: true,
		mainEntityOfPage: absoluteUrl,
		url: absoluteUrl,
		author: organization,
		publisher: organization,
	};

	if (dateModified) {
		article.dateModified = dateModified;
	}

	return [
		article,
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: getBreadcrumbItems(pageUrl, title),
		},
	];
}

function serializeJsonLd(jsonLd: JsonLd[]) {
	return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}) {
	const { slug } = await params;
	const page = source.getPage(slug);

	if (!page) {
		return notFound();
	}

	const loadableData = page.data as typeof page.data & LoadableDocData;
	const { body: MDX, toc, lastModified } = await loadableData.load();
	const title = page.data.title ?? page.url;
	const isLegacyDoc = page.url in legacyDocCanonicals;
	const jsonLd = isLegacyDoc
		? []
		: buildDocPageJsonLd({
				pageUrl: page.url,
				title,
				description: page.data.description,
				lastModified,
			});

	return (
		<DocsPage
			toc={toc}
			full={false}
			tableOfContent={{
				style: "clerk",
			}}
			breadcrumb={{ enabled: false }}
		>
			{jsonLd.length > 0 && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
				/>
			)}
			<DocsTitle>{title}</DocsTitle>
			{page.data.description && (
				<DocsDescription>{page.data.description}</DocsDescription>
			)}
			<DocsBody>
				<MDX
					components={{
						...defaultMdxComponents,
						Step,
						Steps,
						Tab,
						Tabs,
						Accordion,
						Accordions,
						File,
						Files,
						Folder,
						TypeTable,
						APIMethod,
						AvoidPitfallsOverview,
						ContractGuidePage,
						LivingGuidePage,
						PreparationGuidePage,
						RightsGuidePage,
						TrapsGuidePage,
						ViewingGuidePage,
						BeijingOverview,
						GuangzhouOverview,
						HangzhouOverview,
						NanjingOverview,
						ShanghaiOverview,
						ShenzhenOverview,
						ChengduOverview,
						WuhanOverview,
						DatabaseTable,
						ForkButton,
						AddToCursor,
						Features,
						Endpoint,
						GenerateAppleJwt,
						GenerateSecret,
						DividerText,
						Callout: ({
							children,
							type,
							...props
						}: {
							children: React.ReactNode;
							type?: "info" | "warn" | "error" | "success" | "warning";
							[key: string]: any;
						}) => (
							<Callout type={type} {...props}>
								{children}
							</Callout>
						),
						iframe: (props: React.ComponentProps<"iframe">) => (
							<iframe
								title="Embedded content"
								{...props}
								className="w-full h-[500px]"
							/>
						),
						Link: ({
							className,
							...props
						}: React.ComponentProps<typeof Link>) => (
							<Link
								className={cn(
									"font-medium underline underline-offset-4",
									className,
								)}
								{...props}
							/>
						),
					}}
				/>
			</DocsBody>
		</DocsPage>
	);
}

export async function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}) {
	const { slug } = await params;
	const page = source.getPage(slug);
	if (!page) return notFound();
	const title = page.data.title ?? page.url;
	const canonicalPath = legacyDocCanonicals[page.url] ?? page.url;
	const absoluteUrl = new URL(canonicalPath, baseUrl).toString();
	const isLegacyDoc = page.url in legacyDocCanonicals;

	return createMetadata({
		title,
		description: page.data.description,
		alternates: {
			canonical: canonicalPath,
		},
		robots: isLegacyDoc
			? {
					index: false,
					follow: true,
					googleBot: {
						index: false,
						follow: true,
					},
				}
			: undefined,
		openGraph: {
			title,
			description: page.data.description,
			type: "article",
			url: absoluteUrl,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: page.data.description,
		},
	});
}
