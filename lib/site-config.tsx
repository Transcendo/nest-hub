import type { LinkItemType } from "fumadocs-ui/layouts/shared";

export const siteName = "NestHub";

export const topNavLinks: LinkItemType[] = [
	{
		text: "首页",
		url: "/",
		active: "url",
	},
	{
		text: "避坑指南",
		url: "/docs/avoid-pitfalls",
		active: "nested-url",
	},
	{
		text: "北京",
		url: "/docs/cities/beijing",
		active: "nested-url",
	},
	{
		text: "上海",
		url: "/docs/cities/shanghai",
		active: "nested-url",
	},
	{
		text: "杭州",
		url: "/docs/cities/hangzhou",
		active: "nested-url",
	},
	{
		text: "深圳",
		url: "/docs/cities/shenzhen",
		active: "nested-url",
	},
];

export const docsLayoutProps = {
	links: topNavLinks,
	nav: {
		title: siteName,
		url: "/",
	},
	searchToggle: {
		enabled: false,
	},
	themeSwitch: {
		enabled: true,
	},
} as const;

export const cityCards = [
	{
		title: "北京",
		description: "覆盖京东总部、字节跳动等办公区，先看通勤带，再决定预算和片区。",
		href: "/docs/cities/beijing",
	},
	{
		title: "上海",
		description: "围绕张江等办公区整理租房建议，先解决通勤半径，再筛选社区。",
		href: "/docs/cities/shanghai",
	},
	{
		title: "杭州",
		description: "城市入口已准备好，后续可持续补充阿里、滨江等片区经验。",
		href: "/docs/cities/hangzhou",
	},
	{
		title: "深圳",
		description: "城市入口已准备好，后续可持续补充南山、坂田等典型通勤片区内容。",
		href: "/docs/cities/shenzhen",
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
