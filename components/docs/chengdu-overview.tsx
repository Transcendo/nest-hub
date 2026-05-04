import {
	Building2,
	Database,
	ExternalLink,
	MapPinned,
	Route,
} from "lucide-react";

const officeAnchors = [
	{
		name: "天府软件园",
		role: "成都高新区南部园区核心科技办公区",
		area: "高新区南部园区 / 天府软件园 A-G 区",
		track: "软件、数字服务、孵化器、出海服务",
		commuteLogic: "优先按天府三街、天府五街、世纪城、锦城湖、益州大道和大源南侧判断门到门通勤。",
		source: "https://www.tianfusoftwarepark.com/",
	},
	{
		name: "字节跳动创新业务中心",
		role: "成都高新区新经济重点项目",
		area: "成都高新南区 / 新经济活力区方向",
		track: "内容平台、办公系统、教育科技、新兴业务",
		commuteLogic: "先问清实际打卡楼栋和业务团队，再在大源、天府三街、天府五街、世纪城之间选房。",
		guideHref: "/docs/chengdu/bytedance-renting-guide",
		source: "https://web.chinamshare.com/cdgxqrmt_html/APP/fglm/60743031.shtml",
	},
	{
		name: "高新区新经济头部企业项目集群",
		role: "成都互联网与新经济公司集中落地区",
		area: "成都高新区南部园区 / 新经济活力区 / 新川创新科技园",
		track: "互联网平台、AI、网络视听、数字文创、大数据、网络安全",
		commuteLogic: "腾讯、阿里、网易、百度、快手、爱奇艺等项目被成都高新公开报道提及；拿到 offer 后必须确认团队楼栋、驻场形态和班车。",
		source: "https://www.yicai.com/news/100748329.html",
	},
	{
		name: "Tap4Fun / 创人所爱",
		role: "成都本土游戏出海公司样本",
		area: "高新区 / 天府软件园 A 区 A3 栋",
		track: "游戏研发、海外发行、互动娱乐",
		commuteLogic: "优先按天府三街、世纪城、大源和天府五街看房，晚归多时把打车点、楼下便利店和小区门禁一起看。",
		guideHref: "/docs/chengdu/tap4fun-renting-guide",
		source: "https://www.tap4fun.com/join-us",
	},
	{
		name: "华为企业业务四川成都办公点",
		role: "市中心企业业务与政企服务办公锚点",
		area: "锦江 / 人民南路二段 / 仁恒置地广场",
		track: "企业业务、政企服务、ICT 解决方案",
		commuteLogic: "市中心办公点更适合按地铁换乘和生活半径选房，不要直接套高新区大源逻辑。",
		guideHref: "/docs/chengdu/huawei-renting-guide",
		source: "https://e.huawei.com/cn/about/china-branch-office",
	},
	{
		name: "新川创新科技园 / AI 创新中心",
		role: "高新区南部外扩科技办公区",
		area: "新川 / 新通大道 / 高新区南侧",
		track: "AI、数字经济、产业服务、创新孵化",
		commuteLogic: "新川和天府软件园相邻但不是同一个点，先算园区入口、地铁接驳和骑行距离。",
		source: "https://www.tianfusoftwarepark.com/",
	},
];

const commuteBelts = [
	{
		name: "高新南区 / 天府软件园",
		anchors: "天府软件园、Tap4Fun / 创人所爱、字节跳动创新业务中心、高新区新经济项目",
		areas: "天府三街、天府五街、世纪城、大源、锦城湖、益州大道、南湖外扩",
		warning: "这是成都互联网 offer 最常见的判断起点，但楼栋、园区门、地铁口和骑行路线差别很大。",
	},
	{
		name: "新川 / 高新区南侧外扩",
		anchors: "新川创新科技园、AI 创新中心、南部园区外扩项目",
		areas: "新川、广都、华府大道、麓山、海昌路、怡心湖外圈",
		warning: "租金可能比大源更好看，但要确认是否每天能稳定接驳，不要只看地图直线距离。",
	},
	{
		name: "金融城 / 市一医院 / 孵化园",
		anchors: "高新区总部办公、金融科技、平台业务、双通勤兜底",
		areas: "金融城、孵化园、锦城广场、市一医院、交子大道、桐梓林外扩",
		warning: "通勤均衡但租金更硬，适合预算更高、需要兼顾市中心生活和高新区办公的人。",
	},
	{
		name: "人民南路 / 锦江市中心",
		anchors: "华为企业业务四川成都办公点、市中心政企 / 职能办公",
		areas: "春熙路、天府广场、华西坝、倪家桥、桐梓林、玉林、川大望江周边",
		warning: "市中心看房重点是房龄、噪音、老小区维护和地铁换乘，不是园区最后一公里。",
	},
	{
		name: "成都南站 / 火车南站换乘带",
		anchors: "高新区、市中心、天府新区之间的折中方案",
		areas: "火车南站、神仙树、桐梓林、芳草街、玉林、双流白家外扩",
		warning: "适合刚入职过渡和双通勤，但要实测早高峰换乘、晚高峰打车和小区噪音。",
	},
];

const mapMarkers = [
	{ label: "天府软件园", detail: "高新南区核心", x: 63, y: 61 },
	{ label: "Tap4Fun", detail: "天府软件园 A 区", x: 61, y: 59 },
	{ label: "字节 / 新经济", detail: "高新区南部", x: 67, y: 66 },
	{ label: "新川", detail: "南侧外扩", x: 76, y: 71 },
	{ label: "金融城", detail: "交子大道 / 孵化园", x: 57, y: 50 },
	{ label: "火车南站", detail: "换乘兜底", x: 48, y: 45 },
	{ label: "人民南路", detail: "市中心办公", x: 42, y: 34 },
];

const viewingRhythm = [
	{
		phase: "先确认楼栋，不只确认公司",
		detail: "成都同一家公司可能有研发、商业化、政企、外包或驻场团队，实际打卡楼栋会直接改变租房半径。",
	},
	{
		phase: "把地铁、骑行、晚归拆开算",
		detail: "高新南区很多房源看似离地铁近，但楼栋到园区门、小区到地铁口、晚间骑行安全都要实测。",
	},
	{
		phase: "先短租校准，再签长租",
		detail: "成都房源选择多，刚到高新区可以先用一周短租或公寓确认通勤，再决定住大源、天府五街、新川还是市中心。",
	},
];

const sourceDate = "2026-05-04";

export function ChengduOverview() {
	const guideCount = officeAnchors.filter((anchor) => "guideHref" in anchor).length;
	const stats = [
		{ label: "办公锚点", value: String(officeAnchors.length) },
		{ label: "核心通勤带", value: String(commuteBelts.length) },
		{ label: "已收录指南", value: String(guideCount) },
	];

	return (
		<div className="not-prose my-8 space-y-8">
			<section className="overflow-hidden rounded-lg border border-zinc-200 bg-[#fff8ed] text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
				<div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
					<div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-md border border-amber-700/20 bg-white px-3 py-1 text-xs font-semibold text-amber-800 dark:border-amber-400/30 dark:bg-zinc-900 dark:text-amber-200">
								<MapPinned className="size-3.5" />
								成都科技公司与租房地图入口
							</div>
							<div className="space-y-3">
								<h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
									先判断是不是高新南区，再决定住哪里
								</h2>
								<p className="max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
									成都互联网和科技 offer 大多绕不开高新区南部园区、天府软件园、金融城、新川和市中心办公点。租房前先确认实际打卡楼栋、园区门、地铁接驳和晚归路线，再比较大源、天府三街、天府五街、新川、火车南站和市中心居住带。
								</p>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-3">
							{stats.map((stat) => (
								<div
									key={stat.label}
									className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
								>
									<div className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
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
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_63%_61%,rgba(245,158,11,0.24),transparent_30%),radial-gradient(circle_at_57%_50%,rgba(59,130,246,0.14),transparent_26%),radial-gradient(circle_at_42%_34%,rgba(34,197,94,0.12),transparent_24%)]" />
						<div className="relative flex h-full min-h-[300px] flex-col justify-between p-6">
							<div className="grid grid-cols-2 gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-300">
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">高新南区 / 天府软件园</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">新川 / 南侧外扩</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">金融城 / 孵化园</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">人民南路 / 市中心</span>
							</div>
							<div className="rounded-xl border border-zinc-200 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/75">
								<div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
									成都不是“都住南门”这么简单
								</div>
								<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
									高新南区近场、市中心老小区、火车南站换乘、新川外扩的房源形态和通勤风险完全不同，先按办公区分层。
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
				<div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
					<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
						<div>
							<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
								<Route className="size-4 text-amber-700 dark:text-amber-300" />
								成都科技办公区示意图
							</div>
							<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
								坐标只表示租房方向，用来区分高新南区、新川、市中心和换乘带；真实路线仍要用地图按小区门到办公楼门实测。
							</p>
						</div>
					</div>

					<div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-zinc-200 bg-[#fffaf0] dark:border-zinc-800 dark:bg-zinc-900">
						<svg
							viewBox="0 0 100 62.5"
							className="absolute inset-0 h-full w-full"
							role="img"
							aria-label="成都科技办公区示意地图"
						>
							<rect width="100" height="62.5" fill="currentColor" opacity="0" />
							<path d="M39 23 C45 29, 50 36, 56 48 C61 57, 68 62, 77 68" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round" opacity="0.58" />
							<path d="M35 39 C46 42, 58 48, 70 58" fill="none" stroke="#3b82f6" strokeWidth="1.1" strokeLinecap="round" opacity="0.42" />
							<ellipse cx="63" cy="61" rx="19" ry="10" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.14" />
							<ellipse cx="57" cy="50" rx="14" ry="8" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.12" />
							<ellipse cx="42" cy="34" rx="14" ry="9" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.12" />
							<text x="63" y="58" textAnchor="middle" className="fill-amber-700 text-[2.4px] font-semibold dark:fill-amber-300">高新南</text>
							<text x="76" y="68" textAnchor="middle" className="fill-amber-700 text-[2.4px] font-semibold dark:fill-amber-300">新川</text>
							<text x="57" y="47" textAnchor="middle" className="fill-amber-700 text-[2.4px] font-semibold dark:fill-amber-300">金融城</text>
							<text x="42" y="31" textAnchor="middle" className="fill-amber-700 text-[2.4px] font-semibold dark:fill-amber-300">市中心</text>
						</svg>
						{mapMarkers.map((marker) => (
							<div
								key={`${marker.label}-${marker.detail}`}
								className="group absolute -translate-x-1/2 -translate-y-1/2"
								style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
							>
								<div className="size-3 rounded-full border-2 border-white bg-amber-500 shadow-md shadow-amber-900/20 dark:border-zinc-950" />
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
						<Building2 className="size-4 text-amber-700 dark:text-amber-300" />
						成都入职先问这 5 件事
					</div>
					<div className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
						<p>1. 实际打卡楼栋是在天府软件园、金融城、新川、市中心，还是客户现场？</p>
						<p>2. 团队是否有班车、跨园区办公、外包驻场或频繁出差？</p>
						<p>3. 入职后晚归频率如何，21:30 后还能不能稳定回家？</p>
						<p>4. 预算更怕租金高、房龄老，还是通勤长？三者不能同时全要。</p>
						<p>5. 是否先短租过渡，再决定签一年？成都可选项多，别被第一套房绑死。</p>
					</div>
				</div>
			</section>

			<section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<div className="mb-4 flex items-start justify-between gap-3">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
							<Route className="size-4 text-amber-700 dark:text-amber-300" />
							成都核心通勤带
						</div>
						<p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							成都租房最容易误判的是把“高新区”“南门”“天府新区”混成一个区域。先按办公区分层，再看具体小区。
						</p>
					</div>
				</div>
				<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
					{commuteBelts.map((belt) => (
						<div key={belt.name} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
							<div className="font-semibold text-zinc-950 dark:text-zinc-50">{belt.name}</div>
							<div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
								<strong className="text-zinc-800 dark:text-zinc-200">样本：</strong>{belt.anchors}
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
				<div className="mb-4 flex items-start justify-between gap-3">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
							<Route className="size-4 text-amber-700 dark:text-amber-300" />
							成都城市看房节奏
						</div>
						<p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							成都房源多，坑不一定是没房，而是太早按错误办公区签长租。先用真实通勤筛掉错误方向。
						</p>
					</div>
				</div>
				<div className="grid gap-3 md:grid-cols-3">
					{viewingRhythm.map((item) => (
						<div key={item.phase} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
							<div className="font-semibold text-zinc-950 dark:text-zinc-50">{item.phase}</div>
							<div className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-900 dark:bg-amber-950 dark:text-amber-100">
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
							<Database className="size-4 text-amber-700 dark:text-amber-300" />
							成都科技公司与办公片区信息表
						</div>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							信息来自公司官网、园区官网、政府 / 政务媒体和主流财经媒体公开页面；页面只展示能帮助租房判断的办公锚点和通勤逻辑。
						</p>
					</div>
					<div className="rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
						资料日期：{sourceDate}
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full min-w-[980px] border-collapse text-sm">
						<thead>
							<tr className="border-y border-zinc-200 bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
								<th className="px-3 py-3">样本</th>
								<th className="px-3 py-3">成都定位</th>
								<th className="px-3 py-3">地图片区</th>
								<th className="px-3 py-3">赛道</th>
								<th className="px-3 py-3">通勤判断</th>
								<th className="px-3 py-3">来源</th>
							</tr>
						</thead>
						<tbody>
							{officeAnchors.map((row) => (
								<tr key={row.name} className="border-b border-zinc-100 align-top dark:border-zinc-800">
									<td className="px-3 py-3 font-medium text-zinc-950 dark:text-zinc-50">
										{"guideHref" in row ? (
											<a href={row.guideHref} className="text-amber-700 underline-offset-4 hover:underline dark:text-amber-300">
												{row.name}
											</a>
										) : (
											row.name
										)}
									</td>
									<td className="px-3 py-3 text-zinc-600 dark:text-zinc-400">{row.role}</td>
									<td className="px-3 py-3 text-zinc-600 dark:text-zinc-400">{row.area}</td>
									<td className="px-3 py-3 text-zinc-600 dark:text-zinc-400">{row.track}</td>
									<td className="px-3 py-3 text-zinc-600 dark:text-zinc-400">{row.commuteLogic}</td>
									<td className="px-3 py-3">
										<a
											href={row.source}
											className="inline-flex items-center gap-1 text-amber-700 underline-offset-4 hover:underline dark:text-amber-300"
											target="_blank"
											rel="noreferrer"
										>
											查看
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
