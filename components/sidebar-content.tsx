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

const companyLogoPaths = {
	"360": "/company-icons/360.svg",
	"4paradigm": "/company-icons/4paradigm.svg",
	"58": "/company-icons/58.svg",
	alibaba: "/company-icons/alibaba.svg",
	autohome: "/company-icons/autohome.svg",
	baidu: "/company-icons/baidu.svg",
	beike: "/company-icons/beike.svg",
	bilibili: "/company-icons/bilibili.svg",
	"boss-zhipin": "/company-icons/boss-zhipin.svg",
	bytedance: "/company-icons/bytedance.svg",
	didi: "/company-icons/didi.svg",
	dewu: "/company-icons/dewu.svg",
	eleme: "/company-icons/eleme.svg",
	"giant-network": "/company-icons/giant-network.svg",
	"hello-group": "/company-icons/hello-group.svg",
	"horizon-robotics": "/company-icons/horizon-robotics.svg",
	iqiyi: "/company-icons/iqiyi.svg",
	ireader: "/company-icons/ireader.svg",
	jd: "/company-icons/jd.svg",
	"kingsoft-office": "/company-icons/kingsoft-office.svg",
	kuaishou: "/company-icons/kuaishou.svg",
	"kunlun-tech": "/company-icons/kunlun-tech.svg",
	"li-auto": "/company-icons/li-auto.svg",
	"lilith-games": "/company-icons/lilith-games.svg",
	meituan: "/company-icons/meituan.svg",
	mihoyo: "/company-icons/mihoyo.svg",
	pdd: "/company-icons/pdd.svg",
	"perfect-world": "/company-icons/perfect-world.svg",
	qianxin: "/company-icons/qianxin.svg",
	qiniu: "/company-icons/qiniu.svg",
	sensetime: "/company-icons/sensetime.svg",
	sohu: "/company-icons/sohu.svg",
	tal: "/company-icons/tal.svg",
	tencent: "/company-icons/tencent.svg",
	"trip-com": "/company-icons/trip-com.svg",
	ucloud: "/company-icons/ucloud.svg",
	weibo: "/company-icons/weibo.svg",
	xiaohongshu: "/company-icons/xiaohongshu.svg",
	xiaomi: "/company-icons/xiaomi.svg",
	ximalaya: "/company-icons/ximalaya.svg",
	yonyou: "/company-icons/yonyou.svg",
	yoozoo: "/company-icons/yoozoo.svg",
	yuewen: "/company-icons/yuewen.svg",
	zhihu: "/company-icons/zhihu.svg",
} as const;

type CompanyLogoKey = keyof typeof companyLogoPaths;

function createCompanyLogo(key: CompanyLogoKey) {
	return (props?: SVGProps<any>) => (
		<CompanyLogoIcon {...props} src={publicAsset(companyLogoPaths[key])} />
	);
}

const companyIcons = Object.fromEntries(
	(Object.keys(companyLogoPaths) as CompanyLogoKey[]).map((key) => [key, createCompanyLogo(key)]),
) as Record<CompanyLogoKey, (props?: SVGProps<any>) => ReactNode>;

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
			{ title: "字节跳动北京租房指南", href: "/docs/beijing/bytedance-renting-guide", icon: companyIcons.bytedance },
			{ title: "百度北京租房指南", href: "/docs/beijing/baidu-renting-guide", icon: companyIcons.baidu },
			{ title: "小米北京租房指南", href: "/docs/beijing/xiaomi-renting-guide", icon: companyIcons.xiaomi },
			{ title: "快手北京租房指南", href: "/docs/beijing/kuaishou-renting-guide", icon: companyIcons.kuaishou },
			{ title: "美团北京租房指南", href: "/docs/beijing/meituan-renting-guide", icon: companyIcons.meituan },
			{ title: "腾讯北京租房指南", href: "/docs/beijing/tencent-renting-guide", icon: companyIcons.tencent },
			{ title: "滴滴北京租房指南", href: "/docs/beijing/didi-renting-guide", icon: companyIcons.didi },
			{ title: "微博北京租房指南", href: "/docs/beijing/weibo-renting-guide", icon: companyIcons.weibo },
			{ title: "搜狐北京租房指南", href: "/docs/beijing/sohu-renting-guide", icon: companyIcons.sohu },
			{ title: "汽车之家北京租房指南", href: "/docs/beijing/autohome-renting-guide", icon: companyIcons.autohome },
			{ title: "知乎北京租房指南", href: "/docs/beijing/zhihu-renting-guide", icon: companyIcons.zhihu },
			{ title: "BOSS直聘北京租房指南", href: "/docs/beijing/boss-zhipin-renting-guide", icon: companyIcons["boss-zhipin"] },
			{ title: "58同城北京租房指南", href: "/docs/beijing/58-renting-guide", icon: companyIcons["58"] },
			{ title: "陌陌 / Hello Group 北京租房指南", href: "/docs/beijing/hello-group-renting-guide", icon: companyIcons["hello-group"] },
			{ title: "贝壳北京租房指南", href: "/docs/beijing/beike-renting-guide", icon: companyIcons.beike },
			{ title: "第四范式北京租房指南", href: "/docs/beijing/4paradigm-renting-guide", icon: companyIcons["4paradigm"] },
			{ title: "金山办公北京租房指南", href: "/docs/beijing/kingsoft-office-renting-guide", icon: companyIcons["kingsoft-office"] },
			{ title: "地平线北京租房指南", href: "/docs/beijing/horizon-robotics-renting-guide", icon: companyIcons["horizon-robotics"] },
			{ title: "用友北京租房指南", href: "/docs/beijing/yonyou-renting-guide", icon: companyIcons.yonyou },
			{ title: "爱奇艺北京租房指南", href: "/docs/beijing/iqiyi-renting-guide", icon: companyIcons.iqiyi },
			{ title: "360 北京租房指南", href: "/docs/beijing/360-renting-guide", icon: companyIcons["360"] },
			{ title: "完美世界北京租房指南", href: "/docs/beijing/perfect-world-renting-guide", icon: companyIcons["perfect-world"] },
			{ title: "奇安信北京租房指南", href: "/docs/beijing/qianxin-renting-guide", icon: companyIcons.qianxin },
			{ title: "昆仑万维北京租房指南", href: "/docs/beijing/kunlun-tech-renting-guide", icon: companyIcons["kunlun-tech"] },
			{ title: "掌阅科技北京租房指南", href: "/docs/beijing/ireader-renting-guide", icon: companyIcons.ireader },
			{ title: "好未来北京租房指南", href: "/docs/beijing/tal-renting-guide", icon: companyIcons.tal },
			{ title: "理想汽车北京租房指南", href: "/docs/beijing/li-auto-renting-guide", icon: companyIcons["li-auto"] },
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
			{ title: "复旦大学江湾校区研究生租房指南", href: "/docs/shanghai/fudan-jiangwan-campus-renting-guide", icon: () => <House className="w-4 h-4 text-current" /> },
			{ title: "阿里巴巴上海租房指南", href: "/docs/shanghai/alibaba-renting-guide", icon: companyIcons.alibaba },
			{ title: "七牛云上海租房指南", href: "/docs/shanghai/qiniu-renting-guide", icon: companyIcons.qiniu },
			{ title: "阅文集团上海租房指南", href: "/docs/shanghai/yuewen-renting-guide", icon: companyIcons.yuewen },
			{ title: "哔哩哔哩上海租房指南", href: "/docs/shanghai/bilibili-renting-guide", icon: companyIcons.bilibili },
			{ title: "得物上海租房指南", href: "/docs/shanghai/dewu-renting-guide", icon: companyIcons.dewu },
			{ title: "UCloud 优刻得上海租房指南", href: "/docs/shanghai/ucloud-renting-guide", icon: companyIcons.ucloud },
			{ title: "字节跳动上海租房指南", href: "/docs/shanghai/bytedance-renting-guide", icon: companyIcons.bytedance },
			{ title: "拼多多上海租房指南", href: "/docs/shanghai/pdd-renting-guide", icon: companyIcons.pdd },
			{ title: "携程上海租房指南", href: "/docs/shanghai/trip-com-renting-guide", icon: companyIcons["trip-com"] },
			{ title: "腾讯上海租房指南", href: "/docs/shanghai/tencent-renting-guide", icon: companyIcons.tencent },
			{ title: "米哈游上海租房指南", href: "/docs/shanghai/mihoyo-renting-guide", icon: companyIcons.mihoyo },
			{ title: "商汤科技上海租房指南", href: "/docs/shanghai/sensetime-renting-guide", icon: companyIcons.sensetime },
			{ title: "游族网络上海租房指南", href: "/docs/shanghai/yoozoo-renting-guide", icon: companyIcons.yoozoo },
			{ title: "小红书上海租房指南", href: "/docs/shanghai/xiaohongshu-renting-guide", icon: companyIcons.xiaohongshu },
			{ title: "喜马拉雅上海租房指南", href: "/docs/shanghai/ximalaya-renting-guide", icon: companyIcons.ximalaya },
			{ title: "巨人网络上海租房指南", href: "/docs/shanghai/giant-network-renting-guide", icon: companyIcons["giant-network"] },
			{ title: "莉莉丝游戏上海租房指南", href: "/docs/shanghai/lilith-games-renting-guide", icon: companyIcons["lilith-games"] },
			{ title: "饿了么上海租房指南", href: "/docs/shanghai/eleme-renting-guide", icon: companyIcons.eleme },
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
