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
import { ExportPosterButton } from "@/components/docs/export-poster-button";
import { Callout } from "@/components/ui/callout";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";

export default async function Page({
	params,
}: {
	params: Promise<{ slug?: string[] }>;
}) {
	const { slug } = await params;
	const normalizedSlug = !slug || slug.length === 0 ? ["nesthub"] : slug;
	const page = source.getPage(normalizedSlug);

	if (!page) {
		return notFound();
	}

	const { body: MDX, toc } = await page.data.load();

	return (
		<DocsPage
			toc={toc}
			full={false}
			tableOfContent={{
				style: "clerk",
			}}
			breadcrumb={{ enabled: false }}
			editOnGithub={{
				owner: "better-auth",
				repo: "better-auth",
				sha: "main",
				path: `docs/content/docs/${page.path}`,
			}}
		>
			<div className="flex items-center justify-between gap-4">
				<DocsTitle className="mb-0">{page.data.title}</DocsTitle>
				<div className="flex items-center gap-2">{page.url === "/docs/ai-card/asi" ? <Link className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-fd-accent/70" href="/docs/ai-card/asi/export">ASI Story Cards</Link> : null}<ExportPosterButton title={page.data.title} /></div>
			</div>
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
	params: Promise<{ slug?: string[] }>;
}) {
	const { slug } = await params;
	const normalizedSlug = !slug || slug.length === 0 ? ["nesthub"] : slug;
	const page = source.getPage(normalizedSlug);
	if (!page) return notFound();

	return createMetadata({
		title: page.data.title,
		description: page.data.description,
		openGraph: {
			title: page.data.title,
			description: page.data.description,
			type: "article",
		},
		twitter: {
			card: "summary_large_image",
			title: page.data.title,
			description: page.data.description,
		},
	});
}
