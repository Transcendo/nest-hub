import {
	Building2,
	Database,
	ExternalLink,
	MapPinned,
	Route,
} from "lucide-react";
import Link from "next/link";

const collectedCompanies = [
	{ name: "京东", href: "/docs/beijing/jd-headquarters-renting-guide" },
	{ name: "阿里巴巴", href: "/docs/beijing/alibaba-renting-guide" },
	{ name: "字节跳动", href: "/docs/beijing/bytedance-renting-guide" },
	{ name: "百度", href: "/docs/beijing/baidu-renting-guide" },
	{ name: "小米", href: "/docs/beijing/xiaomi-renting-guide" },
	{ name: "快手", href: "/docs/beijing/kuaishou-renting-guide" },
];

const ecosystemRows = [
	{
		company: "京东",
		status: "已收录",
		beijingRole: "北京总部",
		area: "亦庄经海路 / BDA",
		track: "电商、供应链科技",
		mapLogic: "东南产业园区通勤，优先看亦庄线、班车和次渠/马驹桥。",
		href: "/docs/beijing/jd-headquarters-renting-guide",
		source: "https://corporate.jd.com/contactUs",
	},
	{
		company: "阿里巴巴",
		status: "已收录",
		beijingRole: "北京总部园区 + 望京办公群",
		area: "崔各庄 / 来广营 / 望京",
		track: "电商、云、数字经济",
		mapLogic: "东北 14/15 号线通勤带，先确认团队在新园区还是望京办公点。",
		href: "/docs/beijing/alibaba-renting-guide",
		source: "https://www.ncsti.gov.cn/kjdt/yqdy/yqdt/202405/t20240511_156028.html",
	},
	{
		company: "字节跳动",
		status: "已收录",
		beijingRole: "北京主要办公地",
		area: "大钟寺 / 知春路",
		track: "内容平台、AI、效率工具",
		mapLogic: "北三环到学院路通勤带，适合先看大钟寺、皂君庙、知春路。",
		href: "/docs/beijing/bytedance-renting-guide",
		source: "https://se-research.bytedance.com/index.html",
	},
	{
		company: "百度",
		status: "已收录",
		beijingRole: "北京总部",
		area: "上地 / 西北旺",
		track: "搜索、AI、智能驾驶",
		mapLogic: "海淀北部通勤带，13 号线、16 号线和最后接驳都要一起看。",
		href: "/docs/beijing/baidu-renting-guide",
		source: "https://home.baidu.com/contact.html",
	},
	{
		company: "小米",
		status: "已收录",
		beijingRole: "北京总部",
		area: "安宁庄 / 小米科技园",
		track: "智能硬件、IoT、汽车生态",
		mapLogic: "西二旗到上地北侧通勤，近通勤和居住品质通常要二选一。",
		href: "/docs/beijing/xiaomi-renting-guide",
		source: "https://ir.mi.com/investor-resources/ir-contacts/",
	},
	{
		company: "快手",
		status: "已收录",
		beijingRole: "北京总部",
		area: "上地西路 / 后厂村",
		track: "短视频、直播、电商",
		mapLogic: "后厂村接驳敏感，不能只看直线距离，要看夜间回家链路。",
		href: "/docs/beijing/kuaishou-renting-guide",
		source: "https://ir.kuaishou.com/static-files/fbc818fa-693c-4251-a468-f2dce25aa794",
	},
	{
		company: "滴滴",
		status: "待补充",
		beijingRole: "北京主要办公地",
		area: "唐家岭 / 东北旺",
		track: "出行、交通平台",
		mapLogic: "海淀北部外圈，通常要把班车、打车和地铁接驳一起核算。",
		source: "https://ir.didiglobal.com/supplemental-information",
	},
	{
		company: "知乎",
		status: "待补充",
		beijingRole: "北京总部",
		area: "学清路 / 学院路",
		track: "知识社区、内容平台",
		mapLogic: "北四环到学清路通勤带，和五道口、学院路、清河都有关系。",
		source: "https://ir.zhihu.com/en/investor-resources/",
	},
	{
		company: "爱奇艺",
		status: "待补充",
		beijingRole: "北京总部",
		area: "工体北路 / 朝阳",
		track: "长视频、线上娱乐",
		mapLogic: "东二环到朝阳核心区，租房更看地铁换乘和晚归便利。",
		source: "https://ir.iqiyi.com/financial-information/investor-faqs/",
	},
	{
		company: "360",
		status: "待补充",
		beijingRole: "北京主要办公地",
		area: "酒仙桥 / 电子城",
		track: "网络安全、企业安全",
		mapLogic: "望京和酒仙桥之间的办公带，适合和东北通勤圈联动判断。",
		source: "https://jia.360.cn/index_en_US.html",
	},
];

const mapMarkers = [
	{ label: "百度", detail: "上地 / 西北旺", x: 24, y: 31, status: "已收录" },
	{ label: "小米", detail: "安宁庄", x: 31, y: 29, status: "已收录" },
	{ label: "快手", detail: "上地西路", x: 26, y: 37, status: "已收录" },
	{ label: "滴滴", detail: "唐家岭", x: 19, y: 24, status: "待补充" },
	{ label: "字节", detail: "大钟寺", x: 43, y: 49, status: "已收录" },
	{ label: "知乎", detail: "学清路", x: 40, y: 37, status: "待补充" },
	{ label: "阿里", detail: "崔各庄 / 望京", x: 68, y: 38, status: "已收录" },
	{ label: "360", detail: "酒仙桥", x: 66, y: 50, status: "待补充" },
	{ label: "爱奇艺", detail: "工体北路", x: 62, y: 58, status: "待补充" },
	{ label: "京东", detail: "亦庄经海路", x: 72, y: 76, status: "已收录" },
];

const stats = [
	{ label: "已收录公司", value: "6" },
	{ label: "观察样本", value: "10" },
	{ label: "核心通勤带", value: "4" },
];

const sourceBackedDate = "2026-04-18";

export function BeijingOverview() {
	const collectedCount = ecosystemRows.filter(
		(row) => row.status === "已收录",
	).length;

	return (
		<div className="not-prose my-8 space-y-8">
			<section className="overflow-hidden rounded-lg border border-zinc-200 bg-[#f7faf8] text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
				<div className="grid gap-0 lg:grid-cols-[0.88fr_1.12fr]">
					<div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-md border border-teal-700/20 bg-white px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-400/30 dark:bg-zinc-900 dark:text-teal-200">
								<MapPinned className="size-3.5" />
								北京公司与租房地图入口
							</div>
							<div className="space-y-3">
								<h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
									先看城市格局，再进入公司指南
								</h2>
								<p className="max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
									北京互联网大厂不是集中在一个 CBD，而是分布在海淀北部、北三环、望京/来广营和亦庄。租房前先判断公司属于哪条通勤带，再按预算、地铁、班车和最后接驳筛选小区。
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
						<img
							src="/city-guides/beijing-tech-ecosystem.png"
							alt="北京互联网公司生态抽象插图"
							className="h-full min-h-[300px] w-full object-cover"
						/>
					</div>
				</div>
			</section>

			<section className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
				<div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
					<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
						<div>
							<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
								<Route className="size-4 text-teal-700 dark:text-teal-300" />
								北京科技办公区示意图
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
							aria-label="北京科技办公区示意地图"
						>
							<rect width="100" height="62.5" fill="currentColor" opacity="0" />
							<ellipse
								cx="50"
								cy="34"
								rx="20"
								ry="13"
								fill="none"
								stroke="#334155"
								strokeWidth="0.8"
								opacity="0.2"
							/>
							<ellipse
								cx="50"
								cy="34"
								rx="31"
								ry="21"
								fill="none"
								stroke="#334155"
								strokeWidth="0.8"
								opacity="0.15"
							/>
							<ellipse
								cx="50"
								cy="34"
								rx="42"
								ry="28"
								fill="none"
								stroke="#334155"
								strokeWidth="0.8"
								opacity="0.12"
							/>
							<path
								d="M12 47 C25 43, 33 42, 45 34 C57 26, 68 23, 86 19"
								fill="none"
								stroke="#0f766e"
								strokeWidth="1.2"
								strokeLinecap="round"
								opacity="0.65"
							/>
							<path
								d="M14 24 C31 30, 43 31, 54 39 C62 45, 70 55, 84 58"
								fill="none"
								stroke="#dc2626"
								strokeWidth="1.2"
								strokeLinecap="round"
								opacity="0.55"
							/>
							<path
								d="M22 12 C27 24, 34 35, 41 49"
								fill="none"
								stroke="#f59e0b"
								strokeWidth="1"
								strokeLinecap="round"
								opacity="0.55"
							/>
							<path
								d="M60 9 C66 24, 70 40, 75 58"
								fill="none"
								stroke="#f59e0b"
								strokeWidth="1"
								strokeLinecap="round"
								opacity="0.45"
							/>
							<text
								x="48"
								y="36"
								textAnchor="middle"
								className="fill-zinc-500 text-[3px] font-semibold dark:fill-zinc-400"
							>
								北京中心城区
							</text>
							<text
								x="24"
								y="18"
								textAnchor="middle"
								className="fill-teal-700 text-[2.4px] font-semibold dark:fill-teal-300"
							>
								海淀北部
							</text>
							<text
								x="70"
								y="27"
								textAnchor="middle"
								className="fill-teal-700 text-[2.4px] font-semibold dark:fill-teal-300"
							>
								望京 / 来广营
							</text>
							<text
								x="72"
								y="84%"
								textAnchor="middle"
								className="fill-teal-700 text-[2.4px] font-semibold dark:fill-teal-300"
							>
								亦庄
							</text>
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
									<strong className="text-zinc-950 dark:text-zinc-50">
										{marker.label}
									</strong>
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
						已完成 {collectedCount} 个北京公司指南，覆盖海淀北部、北三环、东北望京/来广营、东南亦庄四类典型通勤题。
					</p>
					<div className="mt-4 grid gap-2">
						{collectedCompanies.map((company) => (
							<Link
								key={company.name}
								href={company.href}
								className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 transition-colors hover:border-teal-600 hover:text-teal-800 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
							>
								<span>{company.name}</span>
								<span className="text-xs text-zinc-500">进入指南</span>
							</Link>
						))}
					</div>
				</div>
			</section>

			<section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
							<Database className="size-4 text-teal-700 dark:text-teal-300" />
							北京大厂生态信息表
						</div>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							数据口径：以公开官网、投资者关系页和政府公开信息核验北京总部或主要办公地；租房页面只对“已收录”公司提供细化建议。
						</p>
					</div>
					<div className="rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
						核验日期：{sourceBackedDate}
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full min-w-[920px] border-collapse text-sm">
						<thead>
							<tr className="border-y border-zinc-200 bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
								<th className="px-3 py-3">公司</th>
								<th className="px-3 py-3">收录</th>
								<th className="px-3 py-3">北京定位</th>
								<th className="px-3 py-3">地图片区</th>
								<th className="px-3 py-3">赛道</th>
								<th className="px-3 py-3">通勤判断</th>
								<th className="px-3 py-3">来源</th>
							</tr>
						</thead>
						<tbody>
							{ecosystemRows.map((row) => (
								<tr
									key={row.company}
									className="border-b border-zinc-100 align-top dark:border-zinc-800"
								>
									<td className="px-3 py-3 font-semibold text-zinc-950 dark:text-zinc-50">
										{row.href ? (
											<Link href={row.href} className="hover:text-teal-800">
												{row.company}
											</Link>
										) : (
											row.company
										)}
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
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">
										{row.beijingRole}
									</td>
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">
										{row.area}
									</td>
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">
										{row.track}
									</td>
									<td className="max-w-[280px] px-3 py-3 leading-6 text-zinc-600 dark:text-zinc-400">
										{row.mapLogic}
									</td>
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
