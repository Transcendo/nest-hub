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
import { ShanghaiOverview } from "@/components/docs/shanghai-overview";
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
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";

type LoadableDocData = {
	load: () => Promise<{
		body: React.ComponentType<any>;
		toc: unknown;
		lastModified?: string | Date;
	}>;
};

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
	const { body: MDX, toc } = await loadableData.load();
	const title = page.data.title ?? page.url;

	return (
		<DocsPage
			toc={toc}
			full={false}
			tableOfContent={{
				style: "clerk",
			}}
			breadcrumb={{ enabled: false }}
		>
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
						ShanghaiOverview,
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

	return createMetadata({
		title,
		description: page.data.description,
		openGraph: {
			title,
			description: page.data.description,
			type: "article",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: page.data.description,
		},
	});
}
