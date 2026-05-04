import {
	Building2,
	Database,
	ExternalLink,
	MapPinned,
	Route,
} from "lucide-react";
import Link from "next/link";

type EcosystemRow = {
	company: string;
	status: string;
	nanjingRole: string;
	area: string;
	track: string;
	mapLogic: string;
	source: string;
	guideHref?: string;
};

const collectedGuides = [
	{ name: "南京大厂 Offer", href: "/docs/nanjing/bigtech-offer-renting-guide" },
	{ name: "雨花台 / 软件谷南侧", href: "/docs/nanjing/yuhuatai-software-valley-renting-guide" },
	{ name: "江北新区 / 研创园 / 高新区", href: "/docs/nanjing/jiangbei-yanchuangyuan-renting-guide" },
	{ name: "河西 / 南京南站换乘", href: "/docs/nanjing/hexi-south-station-renting-guide" },
	{ name: "徐庄 / 仙林 / 麒麟", href: "/docs/nanjing/xuzhuang-xianlin-renting-guide" },
	{ name: "焦点科技 / 中国制造网", href: "/docs/nanjing/focuschina-renting-guide" },
	{ name: "满帮 / 运满满", href: "/docs/nanjing/manbang-yunmanman-renting-guide" },
	{ name: "诚迈科技", href: "/docs/nanjing/archermind-renting-guide" },
	{ name: "润和软件", href: "/docs/nanjing/hoperun-renting-guide" },
	{ name: "中兴通讯南京滨江", href: "/docs/nanjing/zte-binjiang-renting-guide" },
	{ name: "途牛旅游网", href: "/docs/nanjing/tuniu-renting-guide" },
];

const ecosystemRows: EcosystemRow[] = [
	{
		company: "满帮 / 运满满",
		status: "已收录",
		nanjingRole: "南京智慧物流平台办公锚点",
		area: "雨花台区凤信路 20 号 A 栋运满满大楼",
		track: "智慧物流、货运平台、大数据、AI 调度",
		mapLogic: "按雨花台 / 软件谷南侧处理，重点比较软件大道、宁双路、铁心桥、西善桥、油坊桥和南京南站外扩。",
		source: "https://www.ymm56.com/about.html",
		guideHref: "/docs/nanjing/manbang-yunmanman-renting-guide",
	},
	{
		company: "诚迈科技",
		status: "已收录",
		nanjingRole: "南京操作系统与信创软件公司办公锚点",
		area: "雨花台区宁双路 19 号云密城 B 幢",
		track: "操作系统、信创、软件外包、智能终端",
		mapLogic: "按宁双路 / 软件谷南侧处理，先核楼栋到地铁口、园区门和晚归路线，再看安德门、小行、铁心桥。",
		source: "https://www.archermind.com/about-us",
		guideHref: "/docs/nanjing/archermind-renting-guide",
	},
	{
		company: "润和软件",
		status: "已收录",
		nanjingRole: "南京本地软件与行业数字化公司办公锚点",
		area: "雨花台区软件大道 168 号润和创智中心",
		track: "金融科技、电力能源、行业软件、AI 智能体",
		mapLogic: "按软件大道沿线处理，天隆寺、安德门、小行、铁心桥、南京南站外扩都可以作为候选圈。",
		source: "https://www.hoperun.com/",
		guideHref: "/docs/nanjing/hoperun-renting-guide",
	},
	{
		company: "中兴通讯南京滨江产研基地",
		status: "已收录",
		nanjingRole: "江宁滨江产业基地办公锚点",
		area: "江宁区牧龙中路 1 号",
		track: "通信设备、5G、智能制造、工业互联网",
		mapLogic: "先确认班车、园区入口和下班时间；江宁滨江、江宁主城和南京主城不能按同一套通勤半径判断。",
		source: "https://www.zte.com.cn/china/enterprise/exhibition_hall/exhibition_nj_bj.html",
		guideHref: "/docs/nanjing/zte-binjiang-renting-guide",
	},
	{
		company: "焦点科技 / 中国制造网",
		status: "已收录",
		nanjingRole: "南京 B2B 电商与外贸数字化公司办公锚点",
		area: "江北新区丽景路 7 号焦点科技大厦",
		track: "B2B 电商、外贸服务、SaaS、金融科技",
		mapLogic: "按江北新区丽景路处理，优先比较江北近场、浦口地铁沿线和主城过江兜底。",
		source: "https://www.focuschina.com/contactus.html",
		guideHref: "/docs/nanjing/focuschina-renting-guide",
	},
	{
		company: "途牛旅游网",
		status: "已收录",
		nanjingRole: "在线旅游平台南京办公锚点",
		area: "玄武大道 108 号聚慧园 6-A 楼",
		track: "在线旅游、休闲度假、交易平台、运营服务",
		mapLogic: "按徐庄 / 玄武大道处理，再比较徐庄近场、仙林 / 马群、孝陵卫 / 钟灵街和主城换乘。",
		source: "https://app.quotemedia.com/data/downloadFiling?webmasterId=101533&ref=319963000&type=HTML&symbol=TOUR&cdn=e87aa767e22321ea5ef0fa150eacc06c&companyName=Tuniu+Corporation&formType=20-F&dateFiled=2026-04-20",
		guideHref: "/docs/nanjing/tuniu-renting-guide",
	},
	{
		company: "江北新区产业技术研创园",
		status: "片区入口",
		nanjingRole: "江北新区科技办公片区",
		area: "南京江北新区 / 研创园片区",
		track: "研发平台、软件信息、生命健康、集成电路与新兴产业",
		mapLogic: "办公点在研创园时，江北近场、浦口沿线和主城过江方案要分开评估。",
		source: "https://corp.njitrip.com/doing",
		guideHref: "/docs/nanjing/jiangbei-yanchuangyuan-renting-guide",
	},
	{
		company: "南京高新区",
		status: "片区入口",
		nanjingRole: "南京北部 / 江北科技园区",
		area: "南京高新技术产业开发区",
		track: "高新技术产业、软件信息、生命健康、先进制造",
		mapLogic: "相关 offer 先围绕园区入口、地铁接驳、过江频率和夜间交通重算，不直接套河西或新街口逻辑。",
		source: "https://www.njgxq.org.cn/",
		guideHref: "/docs/nanjing/jiangbei-yanchuangyuan-renting-guide",
	},
];

type CommuteBelt = {
	name: string;
	companies: string;
	areas: string;
	warning: string;
	guideHref?: string;
};

const commuteBelts: CommuteBelt[] = [
	{
		name: "雨花台 / 软件谷南侧",
		companies: "满帮 / 运满满、诚迈科技、润和软件等",
		areas: "软件大道、宁双路、凤信路、安德门、小行、天隆寺、铁心桥、西善桥、油坊桥、南京南站外扩",
		warning: "软件谷不是一个点，要按软件大道、宁双路、凤信路分别算楼栋、园区门和最后一公里。",
		guideHref: "/docs/nanjing/yuhuatai-software-valley-renting-guide",
	},
	{
		name: "江北新区 / 研创园 / 高新区",
		companies: "焦点科技 / 中国制造网、江北新区产业技术研创园、南京高新区相关科技企业",
		areas: "丽景路、研创园、江北核心区、浦口万汇城、泰山新村、柳洲东路、龙华路、桥北外扩",
		warning: "先判断是否每天过江，再决定住江北近场、浦口沿线还是主城换乘。",
		guideHref: "/docs/nanjing/jiangbei-yanchuangyuan-renting-guide",
	},
	{
		name: "江宁滨江 / 产业基地",
		companies: "中兴通讯南京滨江产研基地、通信与智能制造相关岗位",
		areas: "江宁滨江、牧龙中路、铜井、滨江开发区、江宁主城、百家湖 / 小龙湾外扩",
		warning: "江宁滨江不是江宁主城，班车、园区出入口和晚归路线比直线距离更关键。",
		guideHref: "/docs/nanjing/zte-binjiang-renting-guide",
	},
	{
		name: "河西 / 建邺 / 南京南站换乘带",
		companies: "总部职能、金融科技、销售运营和跨片区通勤人群",
		areas: "河西、奥体、元通、应天大街、中华门、南京南站、雨花门、卡子门",
		warning: "适合作为均衡换乘方案，但要把租金、通勤稳定性和晚归成本一起算。",
		guideHref: "/docs/nanjing/hexi-south-station-renting-guide",
	},
	{
		name: "玄武 / 徐庄 / 仙林 / 麒麟扩展带",
		companies: "途牛旅游网，以及徐庄、玄武大道、仙林、麒麟方向科技岗位",
		areas: "徐庄软件园、玄武大道、仙林、马群、麒麟、孝陵卫、钟灵街",
		warning: "先核实际楼栋，再比较徐庄近场、仙林/马群、孝陵卫/钟灵街和主城换乘。",
		guideHref: "/docs/nanjing/xuzhuang-xianlin-renting-guide",
	},
];

const mapMarkers = [
	{ label: "雨花软件谷", detail: "满帮 / 诚迈 / 润和", x: 43, y: 62 },
	{ label: "江北研创园", detail: "焦点科技 / 研创园", x: 28, y: 36 },
	{ label: "南京高新区", detail: "浦口 / 高新区", x: 20, y: 31 },
	{ label: "江宁滨江", detail: "中兴滨江产研基地", x: 60, y: 76 },
	{ label: "河西 / 南站", detail: "换乘专题", x: 48, y: 49 },
	{ label: "徐庄 / 仙林", detail: "途牛 / 玄武大道", x: 70, y: 37 },
];

const viewingRhythm = [
	{
		phase: "先问清打卡楼栋",
		detail: "南京科技岗位分布在雨花台、江北、江宁滨江、徐庄/仙林等方向，先拿到楼栋、园区门、班车和上下班时间。",
	},
	{
		phase: "把过江和最后一公里单独算",
		detail: "江北与主城、江宁滨江与江宁主城、软件谷内部楼栋之间都可能被最后一公里放大。",
	},
	{
		phase: "签前拆清费用和房源形态",
		detail: "南京常见老小区合租、公寓、园区周边房和转租混在一起，签前确认中介费、押付、民水民电、隔断和退租规则。",
	},
];

const sourceBackedDate = "2026-05-04";

export function NanjingOverview() {
	const stats = [
		{ label: "已收录指南", value: String(collectedGuides.length) },
		{ label: "观察样本", value: String(ecosystemRows.length) },
		{ label: "核心通勤带", value: String(commuteBelts.length) },
	];

	return (
		<div className="not-prose my-8 space-y-8">
			<section className="overflow-hidden rounded-lg border border-zinc-200 bg-[#f7f7ff] text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
				<div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
					<div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-md border border-indigo-700/20 bg-white px-3 py-1 text-xs font-semibold text-indigo-800 dark:border-indigo-400/30 dark:bg-zinc-900 dark:text-indigo-200">
								<MapPinned className="size-3.5" />
								南京科技公司与租房地图入口
							</div>
							<div className="space-y-3">
								<h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
									先看城市格局，再进入公司和片区指南
								</h2>
								<p className="max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
									南京科技公司和产业办公区分布在雨花台 / 软件谷、江北新区、江宁滨江、河西 / 南站、徐庄 / 仙林等方向。租房前先判断 offer 属于哪条通勤带，再按实际楼栋、地铁接驳、班车、晚归路线和预算筛选小区。
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
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_43%_62%,rgba(99,102,241,0.22),transparent_30%),radial-gradient(circle_at_28%_36%,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_60%_76%,rgba(34,197,94,0.15),transparent_28%)]" />
						<div className="relative flex h-full min-h-[300px] flex-col justify-between p-6">
							<div className="grid grid-cols-2 gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-300">
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">雨花台 / 软件谷南侧</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">江北新区 / 高新区</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">江宁滨江 / 产业基地</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">河西 / 南站换乘</span>
							</div>
							<div className="rounded-xl border border-zinc-200 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/75">
								<div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
									南京租房先按办公区分层
								</div>
								<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
									雨花台、江北、江宁滨江、河西换乘和仙林 / 徐庄不是同一种租房题。先分清通勤方向，再看房源。
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
								<Route className="size-4 text-indigo-700 dark:text-indigo-300" />
								南京科技办公区示意图
							</div>
							<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
								坐标是近似区位，用来判断通勤方向，不替代高德、百度地图的实时路线。
							</p>
						</div>
						<div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
							<span className="inline-flex items-center gap-1.5">
								<span className="size-2.5 rounded-full bg-indigo-500" />
								已收录
							</span>
						</div>
					</div>

					<div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-zinc-200 bg-[#f8f8ff] dark:border-zinc-800 dark:bg-zinc-900">
						<svg
							viewBox="0 0 100 62.5"
							className="absolute inset-0 h-full w-full"
							role="img"
							aria-label="南京科技办公区示意地图"
						>
							<rect width="100" height="62.5" fill="currentColor" opacity="0" />
							<path d="M22 25 C34 23, 45 30, 54 40 C61 48, 67 54, 76 58" fill="none" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
							<path d="M18 33 C28 40, 37 48, 45 61" fill="none" stroke="#0ea5e9" strokeWidth="1.1" strokeLinecap="round" opacity="0.45" />
							<path d="M52 42 C57 50, 61 58, 63 72" fill="none" stroke="#22c55e" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
							<ellipse cx="43" cy="62" rx="17" ry="9" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.14" />
							<ellipse cx="28" cy="36" rx="18" ry="11" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.12" />
							<ellipse cx="62" cy="37" rx="17" ry="10" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.12" />
							<text x="43" y="59" textAnchor="middle" className="fill-indigo-700 text-[2.4px] font-semibold dark:fill-indigo-300">雨花</text>
							<text x="28" y="33" textAnchor="middle" className="fill-indigo-700 text-[2.4px] font-semibold dark:fill-indigo-300">江北</text>
							<text x="60" y="73" textAnchor="middle" className="fill-indigo-700 text-[2.4px] font-semibold dark:fill-indigo-300">江宁滨江</text>
							<text x="48" y="47" textAnchor="middle" className="fill-indigo-700 text-[2.4px] font-semibold dark:fill-indigo-300">河西 / 南站</text>
							<text x="70" y="34" textAnchor="middle" className="fill-indigo-700 text-[2.4px] font-semibold dark:fill-indigo-300">仙林 / 徐庄</text>
						</svg>
						{mapMarkers.map((marker) => (
							<div
								key={`${marker.label}-${marker.detail}`}
								className="group absolute -translate-x-1/2 -translate-y-1/2"
								style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
							>
								<div className="size-3 rounded-full border-2 border-white bg-indigo-500 shadow-md shadow-indigo-900/20 dark:border-zinc-950" />
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
						<Building2 className="size-4 text-indigo-700 dark:text-indigo-300" />
						当前已收录
					</div>
					<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
						已完成 {collectedGuides.length} 个南京公司、片区和 offer 指南；先按总览判断通勤带，再进入对应页面看具体租房建议。
					</p>
					<div className="mt-4 grid gap-2">
						{collectedGuides.map((guide) => (
							<Link
								key={guide.name}
								href={guide.href}
								className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 transition-colors hover:border-indigo-600 hover:text-indigo-800 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-indigo-300 dark:hover:text-indigo-200"
							>
								<span>{guide.name}</span>
								<span className="text-xs text-zinc-500">进入指南</span>
							</Link>
						))}
					</div>
				</div>
			</section>

			<section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<div className="mb-4 flex items-start justify-between gap-3">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
							<Route className="size-4 text-indigo-700 dark:text-indigo-300" />
							南京核心通勤带
						</div>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							南京租房先按办公区分层：雨花台软件谷南侧、江北新区、江宁滨江、河西 / 南站换乘、徐庄 / 仙林扩展带的预算、房龄和通勤方式差异很大。
						</p>
					</div>
				</div>
				<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
					{commuteBelts.map((belt) => (
						<div key={belt.name} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
							<div className="font-semibold text-zinc-950 dark:text-zinc-50">
								{belt.guideHref ? (
									<Link href={belt.guideHref} className="underline-offset-4 hover:underline">{belt.name}</Link>
								) : (
									belt.name
								)}
							</div>
							<div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
								<strong className="text-zinc-800 dark:text-zinc-200">样本：</strong>{belt.companies}
							</div>
							<div className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
								<strong className="text-zinc-800 dark:text-zinc-200">候选居住区：</strong>{belt.areas}
							</div>
							<div className="mt-3 rounded-md bg-indigo-50 px-3 py-2 text-xs leading-5 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100">
								{belt.warning}
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<div className="mb-4 flex items-start justify-between gap-3">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
							<Route className="size-4 text-indigo-700 dark:text-indigo-300" />
							南京城市看房节奏
						</div>
						<p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							南京看房要按园区、过江、南部产业基地和主城换乘拆开。低价房源不少，但真正容易翻车的是通勤、房源形态和费用规则。
						</p>
					</div>
				</div>
				<div className="grid gap-3 md:grid-cols-3">
					{viewingRhythm.map((item) => (
						<div key={item.phase} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
							<div className="font-semibold text-zinc-950 dark:text-zinc-50">{item.phase}</div>
							<div className="mt-3 rounded-md bg-indigo-50 px-3 py-2 text-sm leading-6 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100">
								{item.detail}
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
							<Database className="size-4 text-indigo-700 dark:text-indigo-300" />
							南京科技公司与办公片区信息表
						</div>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							数据口径：以公司官网、投资者关系页、政府 / 园区公开信息核验办公锚点；租房建议按南京通勤带单独维护。
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
								<th className="px-3 py-3">样本</th>
								<th className="px-3 py-3">收录</th>
								<th className="px-3 py-3">南京定位</th>
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
										{row.guideHref ? (
											<Link href={row.guideHref} className="underline-offset-4 hover:underline">{row.company}</Link>
										) : (
											row.company
										)}
									</td>
									<td className="px-3 py-3">
										<span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">
											{row.status}
										</span>
									</td>
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">{row.nanjingRole}</td>
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">{row.area}</td>
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">{row.track}</td>
									<td className="max-w-[300px] px-3 py-3 leading-6 text-zinc-600 dark:text-zinc-400">{row.mapLogic}</td>
									<td className="px-3 py-3">
										<a
											href={row.source}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center gap-1 text-xs font-medium text-indigo-800 underline-offset-4 hover:underline dark:text-indigo-200"
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
