import {
	Building2,
	Database,
	ExternalLink,
	MapPinned,
	Route,
} from "lucide-react";

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

const ecosystemRows: EcosystemRow[] = [
	{
		company: "满帮 / 运满满",
		status: "已收录",
		nanjingRole: "智慧物流平台南京总部样本，适合代表雨花台 / 软件谷南侧的互联网平台通勤题",
		area: "雨花台区凤信路 20 号 A 栋运满满大楼",
		track: "智慧物流、货运平台、大数据、AI 调度",
		mapLogic: "满帮/运满满租房要按雨花台南侧处理。看房时先问清是总部楼栋、研发团队还是业务团队，再比较软件大道、宁双路、铁心桥、西善桥和油坊桥换乘。",
		source: "http://ymm56.com/about.html",
		guideHref: "/docs/nanjing/manbang-yunmanman-renting-guide",
	},
	{
		company: "诚迈科技",
		status: "已收录",
		nanjingRole: "南京操作系统与信创软件公司样本，办公点落在雨花台软件产业带",
		area: "雨花台区宁双路 19 号云密城 B 幢",
		track: "操作系统、信创、软件外包、智能终端",
		mapLogic: "诚迈科技适合和软件大道、宁双路、安德门、小行、铁心桥一起看。不要只按“南京软件公司”泛写，楼栋到地铁口和园区门的最后一公里很关键。",
		source: "https://www.archermind.com/about-us",
		guideHref: "/docs/nanjing/archermind-renting-guide",
	},
	{
		company: "润和软件",
		status: "已收录",
		nanjingRole: "南京本地软件与行业数字化公司样本，官方页脚显示创智中心联系地址",
		area: "雨花台区软件大道 168 号润和创智中心",
		track: "金融科技、电力能源、行业软件、AI 智能体",
		mapLogic: "润和软件与软件大道沿线强相关，适合把天隆寺、安德门、小行、铁心桥、南京南站外扩作为候选圈。重点核园区进出、晚归路线和合租房源质量。",
		source: "https://www.hoperun.com/",
		guideHref: "/docs/nanjing/hoperun-renting-guide",
	},
	{
		company: "中兴通讯南京滨江产研基地",
		status: "已收录",
		nanjingRole: "江宁滨江产业基地样本，和主城 CBD 租房完全不是一套逻辑",
		area: "江宁区牧龙中路 1 号",
		track: "通信设备、5G、智能制造、工业互联网",
		mapLogic: "中兴滨江基地要先确认班车、通勤车、生产/研发园区入口和下班时间。住主城可能每天被通勤吞掉，江宁滨江与江宁主城要分开评估。",
		source: "https://www.zte.com.cn/china/enterprise/exhibition_hall/exhibition_nj_bj.html",
		guideHref: "/docs/nanjing/zte-binjiang-renting-guide",
	},
	{
		company: "江北新区产业技术研创园",
		status: "已拆分",
		nanjingRole: "江北新区科技办公片区样本，适合覆盖研发机构、创新平台和科技企业聚集的过江通勤题",
		area: "南京江北新区 / 研创园片区",
		track: "研发平台、软件信息、生命健康、集成电路与新兴产业",
		mapLogic: "江北新区租房先判断是否真的需要每天过江。办公点在研创园时，江北近场、浦口沿线和主城过江方案的生活体验差距非常大。",
		source: "https://corp.njitrip.com/doing",
		guideHref: "/docs/nanjing/jiangbei-yanchuangyuan-renting-guide",
	},
	{
		company: "南京高新区",
		status: "已拆分",
		nanjingRole: "南京北部 / 江北科技园区样本，可作为浦口、高新区和江北办公带的官方片区锚点",
		area: "南京高新技术产业开发区",
		track: "高新技术产业、软件信息、生命健康、先进制造",
		mapLogic: "南京高新区相关 offer 不适合直接套河西或新街口租房逻辑。候选区域要围绕园区入口、地铁接驳、过江频率和夜间交通重新算。",
		source: "https://www.njgxq.org.cn/",
		guideHref: "/docs/nanjing/jiangbei-yanchuangyuan-renting-guide",
	},
	{
		company: "焦点科技 / 中国制造网",
		status: "已收录",
		nanjingRole: "南京 B2B 电商与外贸数字化公司样本，官方联系页可核验焦点科技大厦地址",
		area: "江北新区丽景路 7 号焦点科技大厦",
		track: "B2B 电商、外贸服务、SaaS、金融科技",
		mapLogic: "焦点科技 / 中国制造网租房要按江北新区丽景路处理。先确认是否在焦点科技大厦打卡，再比较江北近场、浦口地铁沿线和主城过江兜底。",
		source: "https://www.focuschina.com/contactus.html",
		guideHref: "/docs/nanjing/focuschina-renting-guide",
	},
	{
		company: "途牛旅游网",
		status: "观察样本",
		nanjingRole: "在线休闲旅游平台样本，官方 IR 页可核验业务定位；具体南京办公点需入职前复核",
		area: "南京办公点需按岗位与团队确认",
		track: "在线旅游、休闲度假、交易平台、运营服务",
		mapLogic: "途牛这类平台公司不能只看企业注册地或旧新闻。租房前必须确认团队当前办公楼栋、是否混合办公、晚归频率和真实门到门通勤。",
		source: "https://ir.tuniu.com/corporate-profile",
	},
];

type BigFactoryLead = {
	name: string;
	role: string;
	verification: string;
	guideHref?: string;
};

const bigFactoryLeads: BigFactoryLead[] = [
	{
		name: "华为 / 阿里 / 京东 / 字节 / 美团 / 腾讯 / 网易等南京团队",
		role: "南京当然有互联网大厂，但很多不是“总部型互联网城市”的单点办公逻辑，而是研发分部、区域中心、云业务/销售、本地生活运营、供应链或交付团队混在一起。",
		verification: "不要只凭公司名租房。拿到 offer 后先问 HR：实际打卡楼栋、是否驻场客户、是否混合办公、有没有班车、晚上几点下班，再把它归到雨花台、河西、江北、江宁或徐庄/仙林。",
		guideHref: "/docs/nanjing/bigtech-offer-renting-guide",
	},
	{
		name: "大厂口径不等于租房锚点",
		role: "“南京有岗位/有分公司/有区域办公室”和“能指导租房的稳定楼栋”是两回事。NestHub 不能把招聘城市、工商注册地、旧新闻或服务商驻场混成一个地址。",
		verification: "大厂 offer 先走“已核验办公点 / 需继续核验团队 / 不建议直接用于租房”的分层，再决定是否值得拆成独立公司页。",
	},
	{
		name: "现阶段页面处理方式",
		role: "当前信息表只放已经能找到官网、IR、园区或公司公开页支撑的样本；大厂南京团队先作为单独核验队列，避免误导新人按错片区租房。",
		verification: "如果 offer 来自大厂南京团队，优先把具体楼栋发给 NestHub 或自己用地图实测门到门，不要按“南京市区”“河西”“软件谷”这种粗标签做决定。",
	},
];

const commuteBelts = [
	{
		name: "雨花台 / 软件谷南侧",
		companies: "满帮 / 运满满、诚迈科技、润和软件等",
		areas: "软件大道、宁双路、凤信路、安德门、小行、天隆寺、铁心桥、西善桥、油坊桥、南京南站外扩",
		warning: "南京科技公司新人最容易把“软件谷”看成一个点。实际要按软件大道、宁双路、凤信路分楼栋，最后一公里和合租房源质量差异很大。",
	},
	{
		name: "江北新区 / 研创园 / 高新区",
		companies: "焦点科技 / 中国制造网、江北新区产业技术研创园、南京高新区相关科技企业",
		areas: "丽景路、研创园、江北核心区、浦口万汇城、泰山新村、柳洲东路、龙华路、桥北外扩",
		warning: "江北租房不要先问便宜不便宜，先问每天是否过江。过江通勤、地铁拥挤、天气和晚归路线会直接改变居住体验。",
	},
	{
		name: "江宁滨江 / 产业基地",
		companies: "中兴通讯南京滨江产研基地、通信与智能制造相关岗位",
		areas: "江宁滨江、牧龙中路、铜井、滨江开发区、江宁主城、百家湖 / 小龙湾外扩",
		warning: "江宁滨江不是江宁主城。先确认班车和园区出入口，再决定住基地附近、江宁主城还是南京南站周边。",
	},
	{
		name: "河西 / 建邺 / 南京南站换乘带",
		companies: "总部职能、金融科技、销售运营和跨片区通勤人群",
		areas: "河西、奥体、元通、应天大街、中华门、南京南站、雨花门、卡子门",
		warning: "河西和南京南站适合作为均衡换乘方案，但成本和通勤稳定性要实测。别为了“住得体面”牺牲通勤和现金流。",
	},
	{
		name: "玄武 / 徐庄 / 仙林 / 麒麟扩展带",
		companies: "后续适合核验软件、科研、芯片、游戏与高校周边科技样本",
		areas: "徐庄软件园、玄武大道、仙林、马群、麒麟、孝陵卫、钟灵街",
		warning: "这条带目前先作为扩展方向，不把未核验公司写进表。后续公司页必须用官方地址重新校准。",
	},
];

const mapMarkers = [
	{ label: "雨花软件谷", detail: "满帮 / 诚迈 / 润和已收录", x: 43, y: 62, status: "已收录" },
	{ label: "江北研创园", detail: "焦点科技 / 研创园 / 江北核心区已拆分", x: 28, y: 36, status: "已收录" },
	{ label: "南京高新区", detail: "浦口 / 高新区已拆分", x: 20, y: 31, status: "已拆分" },
	{ label: "江宁滨江", detail: "中兴滨江产研基地已收录", x: 60, y: 76, status: "已收录" },
	{ label: "河西 / 南站", detail: "跨片区换乘与均衡居住", x: 48, y: 49, status: "通勤带" },
	{ label: "徐庄 / 仙林", detail: "后续扩展科技办公带", x: 70, y: 37, status: "扩展带" },
];

const viewingRhythm = [
	{
		phase: "先问清打卡楼栋",
		detail: "南京很多科技岗位不是一个 CBD 问题。雨花台、江北、江宁滨江、徐庄/仙林的通勤完全不同，先拿到楼栋、园区门、班车和上下班时间。",
	},
	{
		phase: "把过江和最后一公里单独算",
		detail: "江北与主城、江宁滨江与江宁主城、软件谷内部楼栋之间都可能被最后一公里放大。看房当天要实测门到门，而不是只看地铁站名。",
	},
	{
		phase: "签前拆清费用和房源形态",
		detail: "南京常见老小区合租、公寓、园区周边房和转租混在一起。签前确认中介费、押付、民水民电、隔断、转租授权和提前退租规则。",
	},
];

const sourceBackedDate = "2026-05-03";

export function NanjingOverview() {
	const observedCount = ecosystemRows.length;
	const collectedGuideCount = new Set([
		...ecosystemRows.flatMap((row) => (row.guideHref ? [row.guideHref] : [])),
		...bigFactoryLeads.flatMap((row) => (row.guideHref ? [row.guideHref] : [])),
	]).size;
	const stats = [
		{ label: "可信样本", value: String(observedCount) },
		{ label: "核心通勤带", value: String(commuteBelts.length) },
		{ label: "已收录指南", value: String(collectedGuideCount) },
	];

	return (
		<div className="not-prose my-8 space-y-8">
			<section className="overflow-hidden rounded-lg border border-zinc-200 bg-[#f7f7ff] text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
				<div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
					<div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-md border border-indigo-700/20 bg-white px-3 py-1 text-xs font-semibold text-indigo-800 dark:border-indigo-400/30 dark:bg-zinc-900 dark:text-indigo-200">
								<MapPinned className="size-3.5" />
								南京科技公司与办公片区入口
							</div>
							<div className="space-y-3">
								<h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
									先分清雨花台、江北、江宁滨江和主城换乘
								</h2>
								<p className="max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
									南京当然有互联网大厂，但不能只按公司名租房。满帮、诚迈、润和一类样本更贴近雨花台 / 软件谷南侧；中兴滨江基地是江宁滨江产业园逻辑；江北新区和南京高新区要单独看过江通勤；华为、阿里、京东、字节、美团、腾讯、网易等南京团队还要先核实际打卡楼栋。
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
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">雨花台 / 软件谷南</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">江北新区 / 高新区</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">江宁滨江 / 产业基地</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">河西 / 南站换乘</span>
							</div>
							<div className="rounded-xl border border-zinc-200 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/75">
								<div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
									南京租房的核心是“别把园区 offer 当主城 offer”
								</div>
								<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
									雨花台、江北、江宁滨江、河西换乘和仙林/徐庄不是同一种租房题。先把通勤方向分清，比看一堆低价房源更重要。
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
								官方/可信来源样本
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
							<text x="48" y="47" textAnchor="middle" className="fill-indigo-700 text-[2.4px] font-semibold dark:fill-indigo-300">河西/南站</text>
							<text x="70" y="34" textAnchor="middle" className="fill-indigo-700 text-[2.4px] font-semibold dark:fill-indigo-300">仙林/徐庄</text>
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
						当前状态
					</div>
					<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
						南京总览先建立 {observedCount} 个官方/可信来源样本和 {commuteBelts.length} 条核心通勤带，并已开始拆分公司/offer 租房指南。页面只链接实际存在的指南，也不写未经核验的租金。
					</p>
					<div className="mt-4 rounded-lg border border-dashed border-zinc-200 px-3 py-3 text-sm leading-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
						下一步继续从江北研创园/高新区、河西/南站换乘、徐庄/仙林扩展带中选择有可信办公锚点或明确片区决策价值的对象。
					</div>
				</div>
			</section>

			<section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<div className="mb-4 flex items-start justify-between gap-3">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
							<Building2 className="size-4 text-indigo-700 dark:text-indigo-300" />
							南京有没有互联网大厂？有，但要单独分层
						</div>
						<p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							南京不是没有大厂，而是不适合把“大厂南京岗位”直接等同于一个稳定租房锚点。真正影响租房的是你在哪栋楼打卡、是否驻场、是否有班车、晚上几点走，以及它属于雨花台、河西、江北、江宁还是徐庄/仙林。
						</p>
					</div>
				</div>
				<div className="grid gap-3 md:grid-cols-3">
					{bigFactoryLeads.map((item) => (
						<div key={item.name} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
							<div className="font-semibold text-zinc-950 dark:text-zinc-50">
								{item.guideHref ? (
									<a href={item.guideHref} className="underline-offset-4 hover:underline">{item.name}</a>
								) : (
									item.name
								)}
							</div>
							<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.role}</p>
							<div className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900 dark:bg-amber-950 dark:text-amber-100">
								{item.verification}
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
							南京核心通勤带
						</div>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							南京租房先按办公区分层：雨花台软件谷南侧、江北新区、江宁滨江、河西/南站换乘、徐庄/仙林扩展带的预算、房龄和通勤方式差异很大。
						</p>
					</div>
				</div>
				<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
					{commuteBelts.map((belt) => (
						<div key={belt.name} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
							<div className="font-semibold text-zinc-950 dark:text-zinc-50">{belt.name}</div>
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
							数据口径：优先使用公司官网、投资者关系页、政府/园区公开信息等可信来源；当前只建立公司样本、片区样本和通勤方向，不使用来源不明接口或未经核验的租金数据。
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
								<th className="px-3 py-3">状态</th>
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
											<a href={row.guideHref} className="underline-offset-4 hover:underline">{row.company}</a>
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
