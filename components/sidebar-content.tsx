import type { Folder, Root } from "fumadocs-core/page-tree";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Building2, FileWarning } from "lucide-react";
import type { ReactNode, SVGProps } from "react";
import { cn } from "@/lib/utils";

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

function CompanyLogoIcon({
	className,
	src,
}: SVGProps<any> & { src: string }) {
	return (
		<span
			className={cn(
				"inline-flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-[3px]",
				className,
			)}
		>
			<img
				src={src}
				alt=""
				aria-hidden="true"
				className="block size-full object-contain"
			/>
		</span>
	);
}

const companyIcons = {
	jd: (props?: SVGProps<any>) => (
		<CompanyLogoIcon {...props} src="/company-icons/jd.png" />
	),
	alibaba: (props?: SVGProps<any>) => (
		<CompanyLogoIcon {...props} src="/company-icons/alibabadotcom.svg" />
	),
	bytedance: (props?: SVGProps<any>) => (
		<CompanyLogoIcon {...props} src="/company-icons/bytedance.svg" />
	),
	baidu: (props?: SVGProps<any>) => (
		<CompanyLogoIcon {...props} src="/company-icons/baidu.svg" />
	),
	xiaomi: (props?: SVGProps<any>) => (
		<CompanyLogoIcon {...props} src="/company-icons/xiaomi.svg" />
	),
	kuaishou: (props?: SVGProps<any>) => (
		<CompanyLogoIcon {...props} src="/company-icons/kuaishou.svg" />
	),
};

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
		title: "避坑指南",
		href: "/docs/avoid-pitfalls",
		expandSectionForPathPrefix: "/docs/avoid-pitfalls",
		Icon: () => <BookOpen className="w-4 h-4 text-current" />,
		list: [
			{
				title: "总览",
				href: "/docs/avoid-pitfalls",
				icon: () => <FileWarning className="w-4 h-4 text-current" />,
			},
			{
				title: "租前准备",
				href: "/docs/avoid-pitfalls/preparation",
				icon: () => <BookOpen className="w-4 h-4 text-current" />,
			},
			{
				title: "实地看房",
				href: "/docs/avoid-pitfalls/viewing",
				icon: () => <BookOpen className="w-4 h-4 text-current" />,
			},
			{
				title: "签约谈判",
				href: "/docs/avoid-pitfalls/contract",
				icon: () => <BookOpen className="w-4 h-4 text-current" />,
			},
			{
				title: "入住生活",
				href: "/docs/avoid-pitfalls/living",
				icon: () => <BookOpen className="w-4 h-4 text-current" />,
			},
			{
				title: "常见陷阱",
				href: "/docs/avoid-pitfalls/traps",
				icon: () => <FileWarning className="w-4 h-4 text-current" />,
			},
			{
				title: "维权指南",
				href: "/docs/avoid-pitfalls/rights",
				icon: () => <BookOpen className="w-4 h-4 text-current" />,
			},
		],
	},
	{
		title: "北京",
		href: "/docs/beijing",
		expandSectionForPathPrefix: "/docs/beijing",
		Icon: () => <Building2 className="w-4 h-4 text-current" />,
		list: [
			{ title: "总览", href: "/docs/beijing", icon: () => <Building2 className="w-4 h-4 text-current" /> },
			{ title: "京东总部租房指南", href: "/docs/beijing/jd-headquarters-renting-guide", icon: companyIcons.jd },
			{ title: "阿里巴巴租房指南", href: "/docs/beijing/alibaba-renting-guide", icon: companyIcons.alibaba },
			{ title: "字节跳动租房指南", href: "/docs/beijing/bytedance-renting-guide", icon: companyIcons.bytedance },
			{ title: "百度北京租房指南", href: "/docs/beijing/baidu-renting-guide", icon: companyIcons.baidu },
			{ title: "小米北京租房指南", href: "/docs/beijing/xiaomi-renting-guide", icon: companyIcons.xiaomi },
			{ title: "快手北京租房指南", href: "/docs/beijing/kuaishou-renting-guide", icon: companyIcons.kuaishou },
		],
	},
	{
		title: "上海",
		href: "/docs/shanghai",
		expandSectionForPathPrefix: "/docs/shanghai",
		Icon: () => <Building2 className="w-4 h-4 text-current" />,
		list: [
			{ title: "总览", href: "/docs/shanghai", icon: () => <Building2 className="w-4 h-4 text-current" /> },
			{ title: "阿里巴巴租房指南", href: "/docs/shanghai/alibaba-renting-guide", icon: companyIcons.alibaba },
		],
	},
	{
		title: "杭州",
		href: "/docs/hangzhou",
		expandSectionForPathPrefix: "/docs/hangzhou",
		Icon: () => <Building2 className="w-4 h-4 text-current" />,
		list: [{ title: "总览", href: "/docs/hangzhou", icon: () => <Building2 className="w-4 h-4 text-current" /> }],
	},
	{
		title: "深圳",
		href: "/docs/shenzhen",
		expandSectionForPathPrefix: "/docs/shenzhen",
		Icon: () => <Building2 className="w-4 h-4 text-current" />,
		list: [{ title: "总览", href: "/docs/shenzhen", icon: () => <Building2 className="w-4 h-4 text-current" /> }],
	},
];

export const examples: Content[] = [];
