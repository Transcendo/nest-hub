import type { LinkItemType } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/icons/logo";
import { repositoryUrl } from "@/lib/site-constants";

export const siteName = "NestHub";

export const topNavLinks: LinkItemType[] = [
	{
		text: "避坑指南",
		url: "/docs/avoid-pitfalls",
		active: "nested-url",
	},
	{
		text: "北京",
		url: "/docs/beijing",
		active: "nested-url",
	},
	{
		text: "上海",
		url: "/docs/shanghai",
		active: "nested-url",
	},
	{
		text: "杭州",
		url: "/docs/hangzhou",
		active: "nested-url",
	},
	{
		text: "深圳",
		url: "/docs/shenzhen",
		active: "nested-url",
	},
	{
		text: "源码",
		url: repositoryUrl,
	},
];

export const docsLayoutProps = {
	links: topNavLinks,
	nav: {
		title: (
			<span className="inline-flex items-center gap-2">
				<Logo className="h-7 w-7" />
				<span>{siteName}</span>
			</span>
		),
		url: "/",
	},
	searchToggle: {
		enabled: false,
	},
	themeSwitch: {
		enabled: false,
	},
} as const;

export const cityCards = [
	{
		title: "北京",
		description: "覆盖阿里巴巴、京东总部、字节跳动等办公区，先看通勤带，再决定预算和片区。",
		href: "/docs/beijing",
	},
	{
		title: "上海",
		description: "围绕张江等办公区整理租房建议，先解决通勤半径，再筛选社区。",
		href: "/docs/shanghai",
	},
	{
		title: "杭州",
		description: "已收录 20 家杭州公司，覆盖未来科技城、滨江、西湖、余杭等通勤带。",
		href: "/docs/hangzhou",
	},
	{
		title: "深圳",
		description: "已整理 21 家深圳公司样本，覆盖南山科技园、西丽留仙洞、坂田、福田、前海和产业外圈。",
		href: "/docs/shenzhen",
	},
	{
		title: "南京",
		description: "已收录南京公司样本，覆盖雨花台软件谷、江北新区、江宁滨江、徐庄 / 仙林等通勤带。",
		href: "/docs/nanjing",
	},
];

export const valueProps = [
	{
		title: "先避坑，再看房",
		description: "把租前准备、实地看房、签约、入住和维权串成一条完整决策链。",
	},
	{
		title: "按城市落地",
		description: "顶栏只保留城市一级入口，所有人都能先进入城市总览，再继续细分办公区。",
	},
	{
		title: "统一维护",
		description: "未来统一在 Fumadocs 内容树内维护，减少双站点结构分裂带来的编辑成本。",
	},
];
