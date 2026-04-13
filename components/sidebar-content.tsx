import type { Folder, Root } from "fumadocs-core/page-tree";
import type { LucideIcon } from "lucide-react";
import {
	Activity,
	Binoculars,
	Book,
	BotIcon,
	Briefcase,
	FileSearch,
	FlaskConical,
	Globe,
	GraduationCap,
	Headphones,
	HeartPulse,
	ShieldCheck,
	Zap,
} from "lucide-react";
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
				description: "startup sectors and weekly picks.",
				children: contents.map(contentToPageTree),
			},
		],
	};
}

export const contents: Content[] = [
	{
		title: "本周推荐",
		Icon: () => <Briefcase className="w-4 h-4 text-current" />,
		list: [
			{ title: "Overview", href: "/docs/weekly-picks", icon: () => <Book className="w-4 h-4 text-current" /> },
			{ title: "Sierra", href: "/docs/weekly-picks/sierra", icon: () => <Headphones className="w-4 h-4 text-current" /> },
			{ title: "Hebbia", href: "/docs/weekly-picks/hebbia", icon: () => <FileSearch className="w-4 h-4 text-current" /> },
			{ title: "Nimble", href: "/docs/weekly-picks/nimble", icon: () => <Globe className="w-4 h-4 text-current" /> },
			{ title: "Sycamore", href: "/docs/weekly-picks/sycamore", icon: () => <ShieldCheck className="w-4 h-4 text-current" /> },
			{ title: "智谱", href: "/docs/weekly-picks/zhipu", icon: () => <BotIcon className="w-4 h-4 text-current" /> },
			{ title: "月之暗面", href: "/docs/weekly-picks/moonshot", icon: () => <Globe className="w-4 h-4 text-current" /> },
			{ title: "MiniMax", href: "/docs/weekly-picks/minimax", icon: () => <HeartPulse className="w-4 h-4 text-current" /> },
			{ title: "百川智能", href: "/docs/weekly-picks/baichuan", icon: () => <HeartPulse className="w-4 h-4 text-current" /> },
			{ title: "阶跃星辰", href: "/docs/weekly-picks/stepfun", icon: () => <Activity className="w-4 h-4 text-current" /> },
			{ title: "零一万物", href: "/docs/weekly-picks/01ai", icon: () => <Zap className="w-4 h-4 text-current" /> },
		],
	},
	{
		title: "AI Agents",
		Icon: () => <BotIcon className="w-4 h-4 text-current" />,
		list: [
			{ title: "Overview", href: "/docs/ai-agents", icon: () => <Book className="w-4 h-4 text-current" /> },
			{ title: "Sierra", href: "/docs/companies/sierra", icon: () => <Headphones className="w-4 h-4 text-current" /> },
			{ title: "Sycamore", href: "/docs/companies/sycamore", icon: () => <ShieldCheck className="w-4 h-4 text-current" /> },
		],
	},
	{
		title: "Developer Tools",
		Icon: () => <Zap className="w-4 h-4 text-current" />,
		list: [
			{ title: "Overview", href: "/docs/developer-tools", icon: () => <Book className="w-4 h-4 text-current" /> },
			{ title: "Nimble", href: "/docs/companies/nimble", icon: () => <Globe className="w-4 h-4 text-current" /> },
		],
	},
	{
		title: "Cybersecurity",
		Icon: () => <ShieldCheck className="w-4 h-4 text-current" />,
		list: [{ title: "Overview", href: "/docs/cybersecurity", icon: () => <Book className="w-4 h-4 text-current" /> }],
	},
	{
		title: "Fintech",
		Icon: () => <Activity className="w-4 h-4 text-current" />,
		list: [{ title: "Overview", href: "/docs/fintech", icon: () => <Book className="w-4 h-4 text-current" /> }],
	},
	{
		title: "Healthcare",
		Icon: () => <HeartPulse className="w-4 h-4 text-current" />,
		list: [{ title: "Overview", href: "/docs/healthcare", icon: () => <Book className="w-4 h-4 text-current" /> }],
	},
	{
		title: "Climate & Energy",
		Icon: () => <FlaskConical className="w-4 h-4 text-current" />,
		list: [{ title: "Overview", href: "/docs/climate-energy", icon: () => <Book className="w-4 h-4 text-current" /> }],
	},
	{
		title: "Embodied AI",
		Icon: () => <Activity className="w-4 h-4 text-current" />,
		list: [{ title: "Overview", href: "/docs/embodied-ai", icon: () => <Book className="w-4 h-4 text-current" /> }],
	},
	{
		title: "Robotics",
		Icon: () => <Activity className="w-4 h-4 text-current" />,
		list: [{ title: "Overview", href: "/docs/robotics", icon: () => <Book className="w-4 h-4 text-current" /> }],
	},
	{
		title: "Emotional Companions",
		Icon: () => <HeartPulse className="w-4 h-4 text-current" />,
		list: [{ title: "Overview", href: "/docs/emotional-companions", icon: () => <Book className="w-4 h-4 text-current" /> }],
	},
	{
		title: "Gaming",
		Icon: () => <GraduationCap className="w-4 h-4 text-current" />,
		list: [{ title: "Overview", href: "/docs/gaming", icon: () => <Book className="w-4 h-4 text-current" /> }],
	},
	{
		title: "Open World",
		Icon: () => <Globe className="w-4 h-4 text-current" />,
		list: [{ title: "Overview", href: "/docs/open-world", icon: () => <Book className="w-4 h-4 text-current" /> }],
	},
	{
		title: "Vertical AI",
		Icon: () => <Binoculars className="w-4 h-4 text-current" />,
		list: [
			{ title: "Overview", href: "/docs/vertical-ai", icon: () => <Book className="w-4 h-4 text-current" /> },
			{ title: "Hebbia", href: "/docs/companies/hebbia", icon: () => <FileSearch className="w-4 h-4 text-current" /> },
		],
	},
	{
		title: "Companies",
		Icon: () => <Briefcase className="w-4 h-4 text-current" />,
		list: [
			{ title: "Overview", href: "/docs/companies", icon: () => <Book className="w-4 h-4 text-current" /> },
			{ title: "Sierra", href: "/docs/companies/sierra", icon: () => <Headphones className="w-4 h-4 text-current" /> },
			{ title: "Hebbia", href: "/docs/companies/hebbia", icon: () => <FileSearch className="w-4 h-4 text-current" /> },
			{ title: "Nimble", href: "/docs/companies/nimble", icon: () => <Globe className="w-4 h-4 text-current" /> },
			{ title: "Sycamore", href: "/docs/companies/sycamore", icon: () => <ShieldCheck className="w-4 h-4 text-current" /> },
			{ title: "智谱", href: "/docs/companies/zhipu", icon: () => <BotIcon className="w-4 h-4 text-current" /> },
			{ title: "月之暗面", href: "/docs/companies/moonshot", icon: () => <Globe className="w-4 h-4 text-current" /> },
			{ title: "MiniMax", href: "/docs/companies/minimax", icon: () => <HeartPulse className="w-4 h-4 text-current" /> },
			{ title: "百川智能", href: "/docs/companies/baichuan", icon: () => <HeartPulse className="w-4 h-4 text-current" /> },
			{ title: "阶跃星辰", href: "/docs/companies/stepfun", icon: () => <Activity className="w-4 h-4 text-current" /> },
			{ title: "零一万物", href: "/docs/companies/01ai", icon: () => <Zap className="w-4 h-4 text-current" /> },
		],
	},
];

export const examples: Content[] = [];
