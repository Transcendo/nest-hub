import type { Folder, Root } from "fumadocs-core/page-tree";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Building2, FileWarning, Map } from "lucide-react";
import type { ReactNode, SVGProps } from "react";

export interface SubpageItem {
	title: string;
	href?: string;
	icon?: ((props?: SVGProps<any>) => ReactNode) | LucideIcon;
	group?: boolean;
}

export interface ListItem {
	title: string;
	href?: string;
	icon: ((props?: SVGProps<any>) => ReactNode) | LucideIcon;
	group?: boolean;
	separator?: boolean;
	isNew?: boolean;
	subpages?: SubpageItem[];
	external?: boolean;
}

interface Content {
	title: string;
	href?: string;
	expandSectionForPathPrefix?: string;
	Icon: ((props?: SVGProps<any>) => ReactNode) | LucideIcon;
	isNew?: boolean;
	list: ListItem[];
}

function contentToPageTree(content: Content): Folder {
	return {
		type: "folder",
		icon: <content.Icon />,
		name: content.title,
		index: content.href
			? {
					icon: <content.Icon />,
					name: content.title,
					type: "page",
					url: content.href,
				}
			: undefined,
		children: content.list
			.filter((item) => !item.group && (item.href || item.separator))
			.filter((item) => !item.external)
			.map((item) =>
				item.separator
					? ({ type: "separator", name: item.title } as const)
					: ({ type: "page", url: item.href!, name: item.title, icon: <item.icon /> } as const),
			),
	};
}

export function getPageTree(): Root {
	return {
		$id: "root",
		name: "docs",
		children: [
			{
				type: "folder",
				root: true,
				name: "Docs",
				description: "NestHub renting guides.",
				children: contents.map(contentToPageTree),
			},
		],
	};
}

export const contents: Content[] = [
	{
		title: "租房必看",
		expandSectionForPathPrefix: "/docs/mandatory-read",
		Icon: () => <BookOpen className="w-4 h-4 text-current" />,
		list: [
			{
				title: "租房避坑指南",
				href: "/docs/mandatory-read/renting-pitfalls",
				icon: () => <FileWarning className="w-4 h-4 text-current" />,
			},
		],
	},
	{
		title: "按地区看房",
		expandSectionForPathPrefix: "/docs/regional-guides",
		Icon: () => <Map className="w-4 h-4 text-current" />,
		list: [
			{
				title: "北京地区指南",
				href: "/docs/regional-guides/beijing",
				icon: () => <Building2 className="w-4 h-4 text-current" />,
			},
			{
				title: "北京京东租房指南",
				href: "/docs/regional-guides/beijing/jd-headquarters-renting-guide",
				icon: () => <Building2 className="w-4 h-4 text-current" />,
			},
			{
				title: "北京租房指南",
				href: "/docs/regional-guides/beijing/bytedance-renting-guide",
				icon: () => <BookOpen className="w-4 h-4 text-current" />,
			},
			{
				title: "北京区域地图",
				href: "/docs/regional-guides/beijing/bytedance-area-map",
				icon: () => <Map className="w-4 h-4 text-current" />,
			},
		],
	},
];

export const examples: Content[] = [];
