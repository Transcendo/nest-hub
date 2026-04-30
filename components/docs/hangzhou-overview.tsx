import {
	Building2,
	Database,
	ExternalLink,
	MapPinned,
	Route,
} from "lucide-react";
import Link from "next/link";

type LinkEntry = {
	name: string;
	href: string;
};

type ContentEntry = LinkEntry & {
	description: string;
};

const collectedCompanies: LinkEntry[] = [];

const contentEntries: ContentEntry[] = [];

const ecosystemRows = [
	{
		company: "阿里巴巴",
		status: "待补充",
		hangzhouRole: "杭州全球总部 / 阿里生态核心",
		area: "余杭未来科技城 / 西溪园区",
		track: "电商、云计算、AI、企业服务",
		mapLogic: "城西通勤带，优先看未来科技城、五常、蒋村、良睦路、文一西路沿线。",
		source: "https://www.yuhang.gov.cn/art/2024/5/11/art_1532128_59093067.html",
	},
	{
		company: "蚂蚁集团",
		status: "待补充",
		hangzhouRole: "金融科技总部 / 阿里生态核心",
		area: "西湖黄龙 / 西溪路一带",
		track: "支付、金融科技、数字化服务",
		mapLogic: "黄龙到西溪路一线，西湖区内租金高，常见外扩到古荡、文新、蒋村、留下。",
		source: "https://www.hangzhou.gov.cn/art/2022/10/11/art_812266_59066694.html",
	},
	{
		company: "菜鸟",
		status: "待补充",
		hangzhouRole: "智能物流总部 / 阿里生态公司",
		area: "余杭凤新路 / 未来科技城",
		track: "物流科技、供应链、跨境履约",
		mapLogic: "余杭城西通勤，和阿里西溪、未来科技城租房圈高度重叠。",
		source: "https://www.cainiao.com/about-us-contact-us.html",
	},
	{
		company: "钉钉",
		status: "待补充",
		hangzhouRole: "杭州独角兽 / 阿里系协同办公产品",
		area: "杭州城西 / 阿里生态带",
		track: "企业协同、办公 SaaS、AI 助理",
		mapLogic: "按阿里城西办公圈处理，先确认具体楼栋，再在未来科技城、五常、蒋村之间做取舍。",
		source: "https://xccs.hzxcw.gov.cn/content_23354.html",
	},
	{
		company: "网易",
		status: "待补充",
		hangzhouRole: "杭州重要研发 / 游戏与内容业务办公区",
		area: "滨江网商路 / 长河一带",
		track: "游戏、音乐、教育、内容、AI",
		mapLogic: "滨江通勤带，优先看江南大道、长河、滨和路、浦沿，跨江住钱江新城要核算通勤。",
		source: "https://ir.netease.com/",
	},
	{
		company: "字节跳动",
		status: "待补充",
		hangzhouRole: "华东中心 / 余杭重点平台项目",
		area: "余杭未来科技城",
		track: "内容平台、电商、本地生活、AI",
		mapLogic: "未来科技城办公区，优先跟阿里西溪、快手浙江中心、菜鸟一起判断城西租房半径。",
		source: "https://www.yuhang.gov.cn/art/2023/8/15/art_1229269500_59056298.html",
	},
	{
		company: "快手",
		status: "待补充",
		hangzhouRole: "浙江中心 / 电商平台办公点",
		area: "余杭未来科技城",
		track: "短视频、直播、电商、本地生活",
		mapLogic: "余杭已集齐“淘快抖”，租房判断先看未来科技城内部通勤和文一西路早晚高峰。",
		source: "https://www.yuhang.gov.cn/art/2023/8/15/art_1229269500_59056298.html",
	},
	{
		company: "海康威视",
		status: "待补充",
		hangzhouRole: "杭州总部 / 智能物联龙头",
		area: "滨江阡陌路 / 物联网街区",
		track: "智能物联、视频技术、AIoT",
		mapLogic: "滨江核心就业带，居住区优先看长河、滨和路、浦沿、西兴，预算紧可看萧山北和一号线外扩。",
		source: "https://www.hikvision.com/en/about-us/contact-us/",
	},
	{
		company: "大华股份",
		status: "待补充",
		hangzhouRole: "杭州总部 / 视频物联与安防龙头",
		area: "滨江滨安路 / 长河街道",
		track: "视频物联、智慧城市、AIoT",
		mapLogic: "滨江南侧通勤，优先看长河、浦沿、西兴；如果楼栋靠滨安路，别只按地铁站距离判断。",
		source: "https://www.dahuasecurity.com/aboutUs/contactUs",
	},
	{
		company: "新华三 H3C",
		status: "待补充",
		hangzhouRole: "杭州总部 / 企业级 ICT 厂商",
		area: "滨江长河 / 高新产业园",
		track: "网络设备、云、服务器、企业 IT",
		mapLogic: "滨江高新区通勤，和海康、大华、网易部分租房圈重叠。",
		source: "https://www.h3c.com/en/About_Us/Contact_Us/Headquarters/",
	},
	{
		company: "同花顺",
		status: "待补充",
		hangzhouRole: "杭州总部 / 互联网金融数据公司",
		area: "西湖翠柏路 / 教工路一带",
		track: "证券行情、金融数据、投资工具",
		mapLogic: "西湖文教区通勤，优先看翠苑、文三、古荡、黄龙；通勤和学区/老小区租赁混在一起。",
		source: "https://kaihu.10jqka.com.cn/activity/html/2021/Privacy/index.html",
	},
	{
		company: "有赞",
		status: "待补充",
		hangzhouRole: "杭州总部 / 商家服务 SaaS",
		area: "西湖西溪路 / 华泰创业园",
		track: "电商 SaaS、私域经营、商家工具",
		mapLogic: "西溪路办公点，优先看古荡、留下、蒋村、文新，注意西溪路东西向拥堵。",
		source: "https://ir.youzan.com/companyinfo",
	},
	{
		company: "微医",
		status: "待补充",
		hangzhouRole: "杭州总部 / 互联网医疗平台",
		area: "萧山杭州湾信息港",
		track: "互联网医院、数字健康、医疗服务",
		mapLogic: "萧山信息港通勤，不要套用滨江/城西逻辑；优先看钱江世纪城、建设一路、盈丰路、奥体外圈。",
		source: "https://www.wedoctor.com/contact",
	},
	{
		company: "遥望科技",
		status: "待补充",
		hangzhouRole: "杭州总部 / 直播电商与内容电商公司",
		area: "余杭五常 / 融谷巷",
		track: "直播电商、MCN、新消费服务",
		mapLogic: "余杭五常到未来科技城之间，和阿里/字节/快手的租房圈相邻但夜间通勤需求更重。",
		source: "https://www.ywwl.com/about/",
	},
	{
		company: "DeepSeek / 深度求索",
		status: "待补充",
		hangzhouRole: "杭州本土 AI 大模型公司",
		area: "拱墅汇金国际商务社区",
		track: "基础大模型、开源模型、AI 基础技术",
		mapLogic: "拱墅大运河商务区，租房可看武林、朝晖、大关、拱宸桥、城北地铁沿线。",
		source: "https://www.hangzhou.gov.cn/art/2025/1/24/art_812264_59108987.html",
	},
	{
		company: "宇树科技",
		status: "待补充",
		hangzhouRole: "杭州本土机器人公司 / 六小龙代表",
		area: "滨江东流路 / 峰达创意园",
		track: "四足机器人、人形机器人、运动控制",
		mapLogic: "滨江南侧与物联网街区相近，租房策略可和海康、大华、新华三一起看。",
		source: "https://www.unitree.com/cn/contact",
	},
	{
		company: "OPPO",
		status: "待补充",
		hangzhouRole: "全球移动端研发总部项目",
		area: "余杭未来科技城",
		track: "移动终端、系统软件、AI 终端",
		mapLogic: "未来科技城研发办公点，先核楼栋位置，再判断住五常、仓前、良睦路还是蒋村。",
		source: "https://www.yuhang.gov.cn/art/2023/8/15/art_1229269500_59056298.html",
	},
	{
		company: "vivo",
		status: "待补充",
		hangzhouRole: "全球 AI 研发中心项目",
		area: "余杭未来科技城",
		track: "手机 AI、终端智能、算法研发",
		mapLogic: "城西研发带，和阿里、OPPO、字节、快手共享未来科技城租房供给。",
		source: "https://www.yuhang.gov.cn/art/2023/8/15/art_1229269500_59056298.html",
	},
	{
		company: "群核科技 / Manycore",
		status: "待补充",
		hangzhouRole: "杭州六小龙之一 / 空间设计云平台",
		area: "杭州城西科创带",
		track: "云设计、空间智能、产业软件",
		mapLogic: "先按城西科创大走廊处理，后续单页再补具体楼栋和地铁/班车。",
		source: "https://www.hangzhou.gov.cn/art/2025/2/18/art_812262_59109642.html",
	},
	{
		company: "游戏科学",
		status: "待补充",
		hangzhouRole: "杭州六小龙之一 / 游戏研发公司",
		area: "杭州城西科创带",
		track: "游戏研发、内容科技、3A 游戏",
		mapLogic: "办公点需后续官网/招聘页复核，先放入杭州数字文创与游戏研发样本。",
		source: "https://www.hangzhou.gov.cn/art/2025/2/18/art_812262_59109642.html",
	},
];

const commuteBelts = [
	{
		name: "余杭未来科技城 / 西溪",
		companies: "阿里巴巴、菜鸟、钉钉、字节跳动、快手、OPPO、vivo、遥望科技",
		areas: "未来科技城、五常、仓前、良睦路、蒋村、留下、文一西路沿线",
		warning: "城西公司密度最高，但楼栋分散，文一西路早晚高峰很硬；先确认具体园区门，再看地铁距离。",
	},
	{
		name: "滨江高新区 / 物联网街区",
		companies: "网易、海康威视、大华股份、新华三、宇树科技",
		areas: "长河、滨和路、西兴、浦沿、江陵路、萧山北外扩",
		warning: "滨江不是一个点，江南大道、滨安路、东流路、网商路通勤体验差很多。",
	},
	{
		name: "西湖黄龙 / 文教区 / 西溪路",
		companies: "蚂蚁集团、同花顺、有赞",
		areas: "黄龙、古荡、翠苑、文三、文新、蒋村、留下",
		warning: "西湖区房源老小区多、租金不低，适合接受生活便利和通勤稳定优先的人。",
	},
	{
		name: "拱墅大运河 / 武林北",
		companies: "DeepSeek / 深度求索",
		areas: "武林、朝晖、大关、拱宸桥、上塘、城北地铁沿线",
		warning: "拱墅核心区更像城市生活带，房源供给和滨江/未来科技城完全不同。",
	},
	{
		name: "萧山信息港 / 钱江世纪城",
		companies: "微医",
		areas: "钱江世纪城、建设一路、盈丰路、奥体、萧山北、滨江跨区",
		warning: "萧山信息港别粗暴按“杭州互联网公司都在城西/滨江”处理，跨江通勤要单独核算。",
	},
	{
		name: "杭州六小龙 / AI 与硬科技补充样本",
		companies: "DeepSeek、宇树科技、群核科技、游戏科学",
		areas: "拱墅、滨江、城西科创大走廊等分散点位",
		warning: "这些不是传统互联网大厂，但对 2025 后杭州就业流量很关键；后续要逐家公司核楼栋。",
	},
];

const mapMarkers = [
	{ label: "阿里 / 菜鸟 / 字节 / 快手", detail: "未来科技城 / 西溪", x: 26, y: 30, status: "待补充" },
	{ label: "OPPO / vivo", detail: "未来科技城研发带", x: 20, y: 38, status: "待补充" },
	{ label: "遥望科技", detail: "余杭五常", x: 31, y: 42, status: "待补充" },
	{ label: "蚂蚁 / 同花顺 / 有赞", detail: "西湖黄龙 / 西溪路", x: 45, y: 45, status: "待补充" },
	{ label: "DeepSeek", detail: "拱墅汇金国际", x: 56, y: 35, status: "待补充" },
	{ label: "网易 / 海康 / 大华 / H3C", detail: "滨江高新区", x: 62, y: 70, status: "待补充" },
	{ label: "微医", detail: "萧山信息港", x: 74, y: 77, status: "待补充" },
];

const sourceBackedDate = "2026-04-30";

export function HangzhouOverview() {
	const collectedCount = ecosystemRows.filter(
		(row) => row.status === "已收录",
	).length;
	const stats = [
		{ label: "已收录公司", value: String(collectedCount) },
		{ label: "观察样本", value: String(ecosystemRows.length) },
		{ label: "核心通勤带", value: String(commuteBelts.length) },
	];

	return (
		<div className="not-prose my-8 space-y-8">
			<section className="overflow-hidden rounded-lg border border-zinc-200 bg-[#f7faf8] text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
				<div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
					<div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-md border border-teal-700/20 bg-white px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-400/30 dark:bg-zinc-900 dark:text-teal-200">
								<MapPinned className="size-3.5" />
								杭州互联网公司与租房地图入口
							</div>
							<div className="space-y-3">
								<h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
									先分清城西、滨江、西湖、拱墅、萧山
								</h2>
								<p className="max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
									杭州互联网公司高度集中，但不是都在阿里西溪：未来科技城是阿里和平台经济主场，滨江是网易、海康、大华、新华三和硬科技密集区，西湖黄龙/西溪路、拱墅大运河、萧山信息港也各有典型办公点。先确认公司楼栋，再决定住近场、地铁沿线还是跨区外扩。
								</p>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-3">
							{stats.map((stat) => (
								<div
									key={stat.label}
									className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
								>
									<div className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
										{stat.value}
									</div>
									<div className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="relative min-h-[300px] border-t border-zinc-200 bg-white lg:border-l lg:border-t-0 dark:border-zinc-800 dark:bg-zinc-900">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(20,184,166,0.22),transparent_32%),radial-gradient(circle_at_65%_55%,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_78%_75%,rgba(245,158,11,0.18),transparent_30%)]" />
						<div className="relative flex h-full min-h-[300px] flex-col justify-between p-6">
							<div className="grid grid-cols-2 gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-300">
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">未来科技城 / 西溪</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">滨江 / 高新区</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">西湖 / 黄龙</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">拱墅 / 萧山</span>
							</div>
							<div className="rounded-xl border border-zinc-200 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/75">
								<div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
									杭州租房的核心是“别把城西和滨江混成一个点”
								</div>
								<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
									未来科技城、滨江高新区、黄龙西溪路、拱墅大运河、萧山信息港的通勤方向完全不同。先用办公区定位，再谈预算。
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
				<div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
					<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
						<div>
							<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
								<Route className="size-4 text-teal-700 dark:text-teal-300" />
								杭州互联网办公区示意图
							</div>
							<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
								坐标为近似区位，用来判断通勤方向，不替代高德、百度地图的实时路线。
							</p>
						</div>
						<div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
							<span className="inline-flex items-center gap-1.5">
								<span className="size-2.5 rounded-full bg-teal-600" />
								已收录
							</span>
							<span className="inline-flex items-center gap-1.5">
								<span className="size-2.5 rounded-full bg-amber-500" />
								待补充
							</span>
						</div>
					</div>

					<div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-zinc-200 bg-[#f8fbf9] dark:border-zinc-800 dark:bg-zinc-900">
						<svg
							viewBox="0 0 100 62.5"
							className="absolute inset-0 h-full w-full"
							role="img"
							aria-label="杭州互联网办公区示意地图"
						>
							<rect width="100" height="62.5" fill="currentColor" opacity="0" />
							<path d="M12 25 C26 20, 40 26, 52 35 C65 45, 75 51, 88 49" fill="none" stroke="#0f766e" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
							<path d="M32 45 C45 47, 55 55, 70 58" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" opacity="0.45" />
							<path d="M50 18 C54 30, 58 42, 64 57" fill="none" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
							<ellipse cx="46" cy="42" rx="11" ry="8" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.18" />
							<ellipse cx="56" cy="48" rx="26" ry="18" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.12" />
							<text x="45" y="43" textAnchor="middle" className="fill-zinc-500 text-[3px] font-semibold dark:fill-zinc-400">西湖</text>
							<text x="25" y="26" textAnchor="middle" className="fill-teal-700 text-[2.4px] font-semibold dark:fill-teal-300">城西</text>
							<text x="62" y="49" textAnchor="middle" className="fill-teal-700 text-[2.4px] font-semibold dark:fill-teal-300">滨江</text>
							<text x="56" y="32" textAnchor="middle" className="fill-teal-700 text-[2.4px] font-semibold dark:fill-teal-300">拱墅</text>
							<text x="76" y="58" textAnchor="middle" className="fill-teal-700 text-[2.4px] font-semibold dark:fill-teal-300">萧山</text>
						</svg>
						{mapMarkers.map((marker) => (
							<div
								key={`${marker.label}-${marker.detail}`}
								className="group absolute -translate-x-1/2 -translate-y-1/2"
								style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
							>
								<div
									className={
										marker.status === "已收录"
											? "size-3 rounded-full border-2 border-white bg-teal-600 shadow-md shadow-teal-900/20 dark:border-zinc-950"
											: "size-3 rounded-full border-2 border-white bg-amber-500 shadow-md shadow-amber-900/20 dark:border-zinc-950"
									}
								/>
								<div className="pointer-events-none absolute left-1/2 top-4 z-10 hidden w-max -translate-x-1/2 rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs leading-5 text-zinc-700 shadow-lg group-hover:block dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200">
									<strong className="text-zinc-950 dark:text-zinc-50">{marker.label}</strong>
									<br />
									{marker.detail}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
					<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
						<Building2 className="size-4 text-red-600 dark:text-red-300" />
						当前已收录
					</div>
					<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
						已完成 {collectedCount} 个杭州公司指南；杭州生态样本先扩展为 {ecosystemRows.length} 家，后续按公司和片区拆分独立租房指南。
					</p>
					<div className="mt-4 grid gap-2">
						{collectedCompanies.length > 0 ? (
							collectedCompanies.map((company) => (
								<Link
									key={company.name}
									href={company.href}
									className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 transition-colors hover:border-teal-600 hover:text-teal-800 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
								>
									<span>{company.name}</span>
									<span className="text-xs text-zinc-500">进入指南</span>
								</Link>
							))
						) : (
							<div className="rounded-lg border border-dashed border-zinc-200 px-3 py-2 text-sm leading-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
								杭州先建立总览入口，具体公司指南待下一步拆分。
							</div>
						)}
					</div>
					{contentEntries.length > 0 ? (
						<div className="mt-5 border-t border-zinc-100 pt-4 dark:border-zinc-800">
							<div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">已有杭州入口</div>
							<div className="mt-3 grid gap-2">
								{contentEntries.map((entry) => (
									<Link
										key={entry.name}
										href={entry.href}
										className="rounded-lg border border-zinc-200 px-3 py-2 transition-colors hover:border-teal-600 dark:border-zinc-800 dark:hover:border-teal-300"
									>
										<div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{entry.name}</div>
										<div className="mt-1 text-xs leading-5 text-zinc-500">{entry.description}</div>
									</Link>
								))}
							</div>
						</div>
					) : null}
				</div>
			</section>

			<section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<div className="mb-4 flex items-start justify-between gap-3">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
							<Route className="size-4 text-teal-700 dark:text-teal-300" />
							杭州核心通勤带
						</div>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							杭州的租房策略必须按办公区分层：城西、滨江、西湖、拱墅、萧山的房源结构、通勤时间和预算完全不同。
						</p>
					</div>
				</div>
				<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
					{commuteBelts.map((belt) => (
						<div key={belt.name} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
							<div className="font-semibold text-zinc-950 dark:text-zinc-50">{belt.name}</div>
							<div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
								<strong className="text-zinc-800 dark:text-zinc-200">公司：</strong>{belt.companies}
							</div>
							<div className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
								<strong className="text-zinc-800 dark:text-zinc-200">候选居住区：</strong>{belt.areas}
							</div>
							<div className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900 dark:bg-amber-950 dark:text-amber-100">
								{belt.warning}
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
							<Database className="size-4 text-teal-700 dark:text-teal-300" />
							杭州互联网公司生态信息表
						</div>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							数据口径：只使用公司官网、投资者关系页、政府公开信息等官方可信来源；暂不从第三方地图采集，也不使用来源不明的抓取数据。当前总览先建立样本池，后续再拆公司租房指南。
						</p>
					</div>
					<div className="rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
						核验日期：{sourceBackedDate}
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full min-w-[980px] border-collapse text-sm">
						<thead>
							<tr className="border-y border-zinc-200 bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
								<th className="px-3 py-3">公司</th>
								<th className="px-3 py-3">收录</th>
								<th className="px-3 py-3">杭州定位</th>
								<th className="px-3 py-3">地图片区</th>
								<th className="px-3 py-3">赛道</th>
								<th className="px-3 py-3">通勤判断</th>
								<th className="px-3 py-3">来源</th>
							</tr>
						</thead>
						<tbody>
							{ecosystemRows.map((row) => (
								<tr key={row.company} className="border-b border-zinc-100 align-top dark:border-zinc-800">
									<td className="px-3 py-3 font-semibold text-zinc-950 dark:text-zinc-50">
										{row.company}
									</td>
									<td className="px-3 py-3">
										<span
											className={
												row.status === "已收录"
													? "rounded-md bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-950 dark:text-teal-200"
													: "rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-200"
											}
										>
											{row.status}
										</span>
									</td>
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">{row.hangzhouRole}</td>
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">{row.area}</td>
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">{row.track}</td>
									<td className="max-w-[300px] px-3 py-3 leading-6 text-zinc-600 dark:text-zinc-400">{row.mapLogic}</td>
									<td className="px-3 py-3">
										<a
											href={row.source}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center gap-1 text-xs font-medium text-teal-800 underline-offset-4 hover:underline dark:text-teal-200"
										>
											公开来源
											<ExternalLink className="size-3" />
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
}
