type EcosystemRow = {
	name: string;
	area: string;
	track: string;
	commute: string;
	status: string;
	source: string;
	guideHref?: string;
};

const ecosystemRows: EcosystemRow[] = [
	{
		name: "武汉东湖新技术开发区 / 光谷",
		area: "高新大道、关山大道、光谷大道、未来科技城一带",
		track: "城市级科技办公锚点",
		commute: "先按 2 号线、11 号线、有轨电车和园区接驳拆圈层，不要把整个光谷当一个租房点。",
		status: "总览锚点",
		source: "https://www.wehdz.gov.cn/",
	},
	{
		name: "光谷软件园",
		area: "关山大道 / 软件园中路周边",
		track: "软件、游戏、互联网外包、研发团队",
		commute: "适合优先比较关山大道、软件园路、民族大道、杨家湾和光谷广场换乘带。",
		status: "园区样本",
		source: "https://www.wehdz.gov.cn/",
	},
	{
		name: "光谷未来科技城",
		area: "高新大道东段、未来一路 / 未来三路方向",
		track: "硬科技、AI、半导体、科研平台",
		commute: "更像园区通勤题：先确认楼栋、班车、晚归线路，再决定是否住近场或 11 号线换乘。",
		status: "园区样本",
		source: "https://www.wehdz.gov.cn/",
	},
	{
		name: "斗鱼",
		area: "武汉总部 / 光谷互联网圈层",
		track: "直播、内容平台、游戏社区",
		commute: "适合后续拆成公司页；本轮只用官方关于斗鱼武汉主体的公开信息做观察样本。",
		status: "观察样本",
		source: "https://www.douyu.com/cms/about/about_us.html",
	},
	{
		name: "长江存储",
		area: "东湖高新区 / 未来三路88号",
		track: "半导体、先进制造、硬科技研发",
		commute: "官网公开总部地址在未来三路88号，租房优先按未来三路、光谷东、高新大道和班车 / 夜间通勤核验。",
		status: "已收录",
		source: "https://www.ymtc.com/cn/contact.html",
		guideHref: "/docs/wuhan/ymtc-renting-guide",
	},
	{
		name: "烽火通信 / 光通信产业链",
		area: "武汉光谷通信产业带",
		track: "通信设备、光网络、政企数字化",
		commute: "先按实际厂区 / 研发楼确认，不要用公司名直接推断居住区。",
		status: "观察样本",
		source: "https://www.fiberhome.com/",
	},
	{
		name: "华中科技大学 / 武汉大学周边科研人群",
		area: "珞喻路、鲁巷、光谷广场、东湖周边",
		track: "高校、科研、实习、联合培养",
		commute: "适合短租、合租和预算敏感人群，但要分清校区、实验室楼栋和企业实习地点。",
		status: "校园样本",
		source: "https://www.hust.edu.cn/",
	},
];

const commuteBelts = [
	{
		label: "关山大道 / 光谷软件园近场",
		who: "办公点在软件园、关山大道、民族大道附近，且晚归频率高的人。",
		areas: "关山大道、软件园路、杨家湾、光谷广场、鲁巷",
		risk: "房龄、噪音、通勤拥堵和热门小区溢价；不要只看地图直线距离。",
	},
	{
		label: "2 号线光谷换乘带",
		who: "还没确认楼栋、预算中等、需要兼顾汉口 / 武昌活动的人。",
		areas: "街道口、广埠屯、虎泉、杨家湾、光谷广场",
		risk: "早晚高峰挤、换乘时间被低估；要实测小区门到地铁口。",
	},
	{
		label: "高新大道 / 未来科技城东向带",
		who: "办公点在未来科技城、东湖科学城、半导体和硬科技园区的人。",
		areas: "光谷六路、光谷七路、未来一路、左岭外扩",
		risk: "生活配套密度、夜间交通和班车依赖度；新房多不等于适合刚入职。",
	},
	{
		label: "武昌高校 / 科研过渡带",
		who: "研究生、实习生、双通勤情侣，或先在高校 / 企业之间过渡的人。",
		areas: "街道口、广埠屯、珞狮路、东湖、鲁磨路",
		risk: "老小区维修、合租室友、隔断和押付结构；短租要确认退租规则。",
	},
];

const mapMarkers = [
	{ label: "东湖高新区管委会", x: "70%", y: "42%", type: "城市锚点" },
	{ label: "光谷软件园", x: "55%", y: "52%", type: "园区" },
	{ label: "未来科技城", x: "82%", y: "48%", type: "园区" },
	{ label: "光谷广场 / 2号线", x: "46%", y: "60%", type: "换乘" },
	{ label: "街道口 / 高校带", x: "32%", y: "58%", type: "过渡" },
	{ label: "长江存储 / 未来三路", x: "86%", y: "58%", type: "已收录" },
];

const sourceRows = [
	{ label: "武汉东湖新技术开发区政务网", href: "https://www.wehdz.gov.cn/" },
	{ label: "斗鱼官网关于我们", href: "https://www.douyu.com/cms/about/about_us.html" },
	{ label: "长江存储官网联系方式", href: "https://www.ymtc.com/cn/contact.html" },
	{ label: "烽火通信官网", href: "https://www.fiberhome.com/" },
	{ label: "华中科技大学官网", href: "https://www.hust.edu.cn/" },
];

export function WuhanOverview() {
	return (
		<div className="my-8 space-y-8">
			<section className="overflow-hidden rounded-[10px] border border-[#101615]/10 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-5 shadow-sm dark:border-white/10 dark:from-emerald-950/30 dark:via-transparent dark:to-cyan-950/20">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">Wuhan renting map</p>
						<h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#101615] dark:text-white">先把“光谷”拆开，再谈住哪</h2>
						<p className="mt-3 max-w-3xl text-sm leading-7 text-[#101615]/70 dark:text-white/70">
							武汉科技 offer 的租房判断核心不是行政区，而是实际打卡楼栋落在关山大道、光谷软件园、高新大道、未来科技城，还是武昌高校 / 换乘带。先建立城市总览和片区入口，正式公司页只在办公锚点足够清楚后逐步拆分。
						</p>
					</div>
					<div className="grid grid-cols-3 gap-2 text-center text-xs">
						<div className="rounded-[8px] border border-white/70 bg-white/75 p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
							<div className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">4</div>
							<div className="text-[#101615]/60 dark:text-white/60">通勤带</div>
						</div>
						<div className="rounded-[8px] border border-white/70 bg-white/75 p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
							<div className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">7</div>
							<div className="text-[#101615]/60 dark:text-white/60">样本锚点</div>
						</div>
						<div className="rounded-[8px] border border-white/70 bg-white/75 p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
							<div className="text-lg font-semibold text-amber-700 dark:text-amber-300">1</div>
							<div className="text-[#101615]/60 dark:text-white/60">已收录指南</div>
						</div>
					</div>
				</div>
			</section>

			<section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
				<div className="rounded-[10px] border border-[#101615]/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
					<h3 className="text-base font-semibold text-[#101615] dark:text-white">办公 / 通勤片区判断</h3>
					<div className="mt-4 grid gap-3">
						{commuteBelts.map((belt) => (
							<div key={belt.label} className="rounded-[8px] border border-[#101615]/10 bg-[#f8faf9] p-4 dark:border-white/10 dark:bg-white/[0.03]">
								<div className="text-sm font-semibold text-[#101615] dark:text-white">{belt.label}</div>
								<p className="mt-2 text-sm leading-6 text-[#101615]/70 dark:text-white/70">{belt.who}</p>
								<p className="mt-2 text-xs text-[#101615]/55 dark:text-white/55">候选区域：{belt.areas}</p>
								<p className="mt-1 text-xs text-amber-700 dark:text-amber-300">签前重点：{belt.risk}</p>
							</div>
						))}
					</div>
				</div>

				<div className="rounded-[10px] border border-[#101615]/10 bg-[#101615] p-4 text-white shadow-sm dark:border-white/10">
					<h3 className="text-base font-semibold">武汉通勤草图</h3>
					<p className="mt-2 text-xs leading-6 text-white/65">示意图只帮助建立方向感：左侧偏武昌高校和换乘，右侧偏高新大道 / 未来科技城，实际以楼栋、门岗和班车为准。</p>
					<div className="relative mt-4 aspect-[1.28/1] rounded-[10px] border border-white/10 bg-[radial-gradient(circle_at_70%_45%,rgba(16,185,129,0.35),transparent_32%),radial-gradient(circle_at_36%_60%,rgba(56,189,248,0.22),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
						<div className="absolute left-[15%] right-[8%] top-[58%] h-px bg-cyan-300/50" />
						<div className="absolute left-[45%] right-[8%] top-[46%] h-px bg-emerald-300/50" />
						{mapMarkers.map((marker) => (
							<div key={marker.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: marker.x, top: marker.y }}>
								<div className="h-3 w-3 rounded-full border border-white bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.85)]" />
								<div className="mt-1 whitespace-nowrap rounded bg-black/45 px-2 py-1 text-[10px] text-white/85 backdrop-blur-sm">{marker.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="overflow-hidden rounded-[10px] border border-[#101615]/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
				<div className="border-b border-[#101615]/10 p-4 dark:border-white/10">
					<h3 className="text-base font-semibold text-[#101615] dark:text-white">公开样本公司 / 园区表</h3>
					<p className="mt-2 text-sm leading-6 text-[#101615]/65 dark:text-white/65">表格只保留能被官方或可信公开页面支撑的锚点；已经成型的指南会直接露出，未成型对象不提前放死链。</p>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full min-w-[900px] text-left text-sm">
						<thead className="bg-[#f4f7f5] text-xs uppercase tracking-[0.12em] text-[#101615]/55 dark:bg-white/5 dark:text-white/50">
							<tr>
								<th className="px-4 py-3 font-medium">锚点</th>
								<th className="px-4 py-3 font-medium">区域</th>
								<th className="px-4 py-3 font-medium">类型</th>
								<th className="px-4 py-3 font-medium">租房判断</th>
								<th className="px-4 py-3 font-medium">状态</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-[#101615]/10 dark:divide-white/10">
							{ecosystemRows.map((row) => (
								<tr key={row.name}>
									<td className="px-4 py-3 font-medium text-[#101615] dark:text-white">
										<a className="underline decoration-[#101615]/20 underline-offset-4 hover:decoration-emerald-500 dark:decoration-white/20" href={row.guideHref ?? row.source}>
											{row.name}
										</a>
									</td>
									<td className="px-4 py-3 text-[#101615]/70 dark:text-white/70">{row.area}</td>
									<td className="px-4 py-3 text-[#101615]/70 dark:text-white/70">{row.track}</td>
									<td className="px-4 py-3 text-[#101615]/70 dark:text-white/70">{row.commute}</td>
									<td className="px-4 py-3"><span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">{row.status}</span></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className="grid gap-4 md:grid-cols-2">
				<div className="rounded-[10px] border border-[#101615]/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
					<h3 className="text-base font-semibold text-[#101615] dark:text-white">当前收录 / 扩展方向</h3>
					<ul className="mt-3 space-y-2 text-sm leading-6 text-[#101615]/70 dark:text-white/70">
						<li>武汉入口先以城市总览和片区判断为主，帮助 offer / 实习人群在确认楼栋前建立租房边界。</li>
						<li>长江存储已拆成正式指南；斗鱼、烽火通信、光谷软件园 / 未来科技城会继续按公开来源成熟度推进。</li>
						<li>价格口径会放在具体指南里作为公开平台样本或预算带，不在城市总览里伪装成实时行情。</li>
					</ul>
				</div>
				<div className="rounded-[10px] border border-[#101615]/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
					<h3 className="text-base font-semibold text-[#101615] dark:text-white">来源口径</h3>
					<ul className="mt-3 space-y-2 text-sm leading-6 text-[#101615]/70 dark:text-white/70">
						{sourceRows.map((source) => (
							<li key={source.href}>
								<a className="font-medium text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:decoration-emerald-500 dark:text-emerald-300" href={source.href}>
									{source.label}
								</a>
							</li>
						))}
					</ul>
					<p className="mt-3 text-xs leading-5 text-[#101615]/55 dark:text-white/55">外部页面用于确认城市 / 园区 / 主体方向；具体房源仍需以正规租房平台、线下实看和合同条款为准。</p>
				</div>
			</section>
		</div>
	);
}
