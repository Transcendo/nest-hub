import Link from "next/link";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { createMetadata } from "@/lib/metadata";

const sections = [
	{
		title: "租房必看",
		description: "先看签约和避坑清单，再去看具体区域。",
		href: "/docs/mandatory-read",
	},
	{
		title: "北京地区指南",
		description: "按北京办公区和通勤带查看租房建议。",
		href: "/docs/regional-guides/beijing",
	},
	{
		title: "北京京东租房指南",
		description: "围绕京东总部、经海路、次渠和亦庄线的租房建议。",
		href: "/docs/regional-guides/beijing/jd-headquarters-renting-guide",
	},
	{
		title: "北京区域地图",
		description: "先看地铁、产业区和通勤带，再决定在哪儿租。",
		href: "/docs/regional-guides/beijing/bytedance-area-map",
	},
];

export default function DocsIndexPage() {
	return (
		<DocsPage breadcrumb={{ enabled: false }}>
			<DocsTitle>NestHub 文档目录</DocsTitle>
			<DocsDescription>
				先看基础避坑，再按地区和办公区筛选具体租房方案。
			</DocsDescription>
			<DocsBody>
				<div className="grid gap-4 md:grid-cols-2 not-prose">
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
			</DocsBody>
		</DocsPage>
	);
}

export const metadata = createMetadata({
	title: "文档目录",
	description: "NestHub 的租房避坑、区域判断和北京办公区租房指南目录。",
});
