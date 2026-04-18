import type { Folder, Root } from "fumadocs-core/page-tree";
import type { LucideIcon } from "lucide-react";
import {
	ClipboardCheck,
	Eye,
	Factory,
	FileSignature,
	House,
	KeyRound,
	Landmark,
	MapPinned,
	Mountain,
	Scale,
	ShieldAlert,
	TriangleAlert,
	Waves,
} from "lucide-react";
import type { ReactNode, SVGProps } from "react";
import { publicAsset } from "@/lib/public-asset";
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

const moduleLogoStyles = {
	pitfalls:
		"bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-950/35 dark:text-rose-300 dark:ring-rose-800/60",
	beijing:
		"bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/35 dark:text-red-300 dark:ring-red-800/60",
	shanghai:
		"bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950/35 dark:text-sky-300 dark:ring-sky-800/60",
	hangzhou:
		"bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/35 dark:text-emerald-300 dark:ring-emerald-800/60",
	shenzhen:
		"bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/35 dark:text-amber-300 dark:ring-amber-800/60",
};

function ModuleLogo({
	children,
	className,
	variant,
}: {
	children: ReactNode;
	className?: string;
	variant: keyof typeof moduleLogoStyles;
}) {
	return (
		<span
			className={cn(
				"inline-flex size-5 shrink-0 items-center justify-center rounded-[5px] ring-1 [&>svg]:size-[13px]",
				moduleLogoStyles[variant],
				className,
			)}
		>
			{children}
		</span>
	);
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
		<CompanyLogoIcon {...props} src={publicAsset("/company-icons/jd.png")} />
	),
	alibaba: (props?: SVGProps<any>) => (
		<CompanyLogoIcon {...props} src={publicAsset("/company-icons/alibabadotcom.svg")} />
	),
	bytedance: (props?: SVGProps<any>) => (
		<CompanyLogoIcon {...props} src={publicAsset("/company-icons/bytedance.svg")} />
	),
	baidu: (props?: SVGProps<any>) => (
		<CompanyLogoIcon {...props} src={publicAsset("/company-icons/baidu.svg")} />
	),
	xiaomi: (props?: SVGProps<any>) => (
		<CompanyLogoIcon {...props} src={publicAsset("/company-icons/xiaomi.svg")} />
	),
	kuaishou: (props?: SVGProps<any>) => (
		<CompanyLogoIcon {...props} src={publicAsset("/company-icons/kuaishou.svg")} />
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
		Icon: ({ className }: SVGProps<any> = {}) => (
			<ModuleLogo className={className} variant="pitfalls">
				<ShieldAlert />
			</ModuleLogo>
		),
		list: [
			{
				title: "总览",
				href: "/docs/avoid-pitfalls",
				icon: () => <ClipboardCheck className="w-4 h-4 text-current" />,
			},
			{
				title: "租前准备",
				href: "/docs/avoid-pitfalls/preparation",
				icon: () => <KeyRound className="w-4 h-4 text-current" />,
			},
			{
				title: "实地看房",
				href: "/docs/avoid-pitfalls/viewing",
				icon: () => <Eye className="w-4 h-4 text-current" />,
			},
			{
				title: "签约谈判",
				href: "/docs/avoid-pitfalls/contract",
				icon: () => <FileSignature className="w-4 h-4 text-current" />,
			},
			{
				title: "入住生活",
				href: "/docs/avoid-pitfalls/living",
				icon: () => <House className="w-4 h-4 text-current" />,
			},
			{
				title: "常见陷阱",
				href: "/docs/avoid-pitfalls/traps",
				icon: () => <TriangleAlert className="w-4 h-4 text-current" />,
			},
			{
				title: "维权指南",
				href: "/docs/avoid-pitfalls/rights",
				icon: () => <Scale className="w-4 h-4 text-current" />,
			},
		],
	},
	{
		title: "北京",
		href: "/docs/beijing",
		expandSectionForPathPrefix: "/docs/beijing",
		Icon: ({ className }: SVGProps<any> = {}) => (
			<ModuleLogo className={className} variant="beijing">
				<Landmark />
			</ModuleLogo>
		),
		list: [
			{ title: "总览", href: "/docs/beijing", icon: () => <MapPinned className="w-4 h-4 text-current" /> },
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
		Icon: ({ className }: SVGProps<any> = {}) => (
			<ModuleLogo className={className} variant="shanghai">
				<Waves />
			</ModuleLogo>
		),
		list: [
			{ title: "总览", href: "/docs/shanghai", icon: () => <Waves className="w-4 h-4 text-current" /> },
			{ title: "阿里巴巴租房指南", href: "/docs/shanghai/alibaba-renting-guide", icon: companyIcons.alibaba },
		],
	},
	{
		title: "杭州",
		href: "/docs/hangzhou",
		expandSectionForPathPrefix: "/docs/hangzhou",
		Icon: ({ className }: SVGProps<any> = {}) => (
			<ModuleLogo className={className} variant="hangzhou">
				<Mountain />
			</ModuleLogo>
		),
		list: [{ title: "总览", href: "/docs/hangzhou", icon: () => <Mountain className="w-4 h-4 text-current" /> }],
	},
	{
		title: "深圳",
		href: "/docs/shenzhen",
		expandSectionForPathPrefix: "/docs/shenzhen",
		Icon: ({ className }: SVGProps<any> = {}) => (
			<ModuleLogo className={className} variant="shenzhen">
				<Factory />
			</ModuleLogo>
		),
		list: [{ title: "总览", href: "/docs/shenzhen", icon: () => <Factory className="w-4 h-4 text-current" /> }],
	},
];

export const examples: Content[] = [];
