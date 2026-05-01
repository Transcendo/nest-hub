import Link from "next/link";
import {
	ArrowRight,
	Building2,
	CheckCircle2,
	ExternalLink,
	MapPin,
	Route,
	ShieldCheck,
} from "lucide-react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import {
	cityCompanyGuideCounts,
	companyGuideCount,
	companyGuides,
	companyLogoPaths,
	uniqueCompanyCount,
} from "@/lib/company-guides";
import { publicAsset } from "@/lib/public-asset";
import { docsLayoutProps } from "@/lib/site-config";
import { repositoryUrl } from "@/lib/site-constants";

const cityRows = [
	{
		rank: "01",
		title: "北京",
		href: "/docs/beijing",
		summary: "海淀北部、北三环、望京 / 来广营、亦庄等通勤带已成体系。",
		metric: `${cityCompanyGuideCounts.beijing} 篇公司指南`,
		tags: ["百度", "字节跳动", "京东", "阿里", "小米", "快手"],
		color: "border-l-[#10b981]",
	},
	{
		rank: "02",
		title: "上海",
		href: "/docs/shanghai",
		summary: "张江、杨浦、长宁、徐汇和市中心办公区已经展开。",
		metric: `${cityCompanyGuideCounts.shanghai} 篇公司指南`,
		tags: ["阿里", "B站", "PDD", "小红书", "米哈游", "得物"],
		color: "border-l-[#ef4444]",
	},
	{
		rank: "03",
		title: "杭州",
		href: "/docs/hangzhou",
		summary: "未来科技城、滨江、西湖、余杭五常等通勤带已展开。",
		metric: `${cityCompanyGuideCounts.hangzhou} 篇公司指南`,
		tags: ["阿里", "蚂蚁", "网易", "海康", "DeepSeek", "宇树"],
		color: "border-l-[#facc15]",
	},
	{
		rank: "04",
		title: "深圳",
		href: "/docs/shenzhen",
		summary: "已整理 21 家深圳公司样本，覆盖南山、西丽、坂田、福田、前海和产业外圈。",
		metric: "21 个样本",
		tags: ["南山", "西丽", "坂田"],
		color: "border-l-[#38bdf8]",
	},
];

const readingPath = [
	{
		title: "先定底线",
		description: "预算上限、通勤红线、合同底线先写清楚。",
		href: "/docs/avoid-pitfalls/preparation",
		icon: ShieldCheck,
	},
	{
		title: "再看城市",
		description: "按城市总览判断办公区、交通带和生活半径。",
		href: "/docs",
		icon: MapPin,
	},
	{
		title: "最后进公司页",
		description: "把小区、地铁、班车和签约风险放在一张清单里。",
		href: "/docs/beijing",
		icon: Building2,
	},
];

const proofPoints = [
	"先避坑，再进城市",
	"按办公区组织内容",
	"把通勤和签约放在同一页判断",
	"适合持续补充来源和案例",
];

function NestHubSignalVisual() {
	return (
		<figure className="relative overflow-hidden rounded-[8px] border border-[#101615]/15 bg-[#101615] text-white shadow-[0_22px_70px_rgba(16,22,21,0.18)] dark:border-white/10">
			<div className="absolute inset-0 opacity-35 [background-image:linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:34px_34px]" />
			<svg
				className="relative block aspect-[1.14/1] w-full"
				viewBox="0 0 684 600"
				role="img"
				aria-label="NestHub 城市聚集雷达图"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<linearGradient id="city-glow" x1="80" x2="580" y1="90" y2="520">
						<stop stopColor="#92f5c8" />
						<stop offset="0.55" stopColor="#38bdf8" />
						<stop offset="1" stopColor="#facc15" />
					</linearGradient>
					<radialGradient id="hub-light" cx="50%" cy="50%" r="50%">
						<stop stopColor="#facc15" stopOpacity="0.9" />
						<stop offset="0.45" stopColor="#10b981" stopOpacity="0.34" />
						<stop offset="1" stopColor="#101615" stopOpacity="0" />
					</radialGradient>
				</defs>

				<rect width="684" height="600" fill="#101615" />
				<circle cx="342" cy="320" r="232" fill="url(#hub-light)" opacity="0.76" />
				<circle cx="342" cy="320" r="210" fill="none" stroke="#92f5c8" strokeOpacity="0.18" />
				<circle cx="342" cy="320" r="152" fill="none" stroke="#92f5c8" strokeOpacity="0.28" />
				<circle cx="342" cy="320" r="92" fill="none" stroke="#facc15" strokeOpacity="0.48" />
				<path
					d="M151 218C220 160 275 140 342 140C420 140 488 177 536 236"
					fill="none"
					stroke="url(#city-glow)"
					strokeWidth="3"
					strokeDasharray="8 12"
					opacity="0.78"
				/>
				<path
					d="M109 376C176 421 247 444 342 444C436 444 511 416 578 365"
					fill="none"
					stroke="#38bdf8"
					strokeWidth="2"
					strokeDasharray="7 11"
					opacity="0.5"
				/>

				<g opacity="0.95">
					<rect x="76" y="266" width="56" height="182" fill="#24352f" />
					<rect x="140" y="206" width="72" height="242" fill="#1d2d29" />
					<rect x="222" y="248" width="52" height="200" fill="#263a34" />
					<rect x="470" y="226" width="70" height="222" fill="#1d2d29" />
					<rect x="548" y="278" width="58" height="170" fill="#263a34" />
					<rect x="609" y="330" width="34" height="118" fill="#24352f" />
					{[92, 108, 158, 180, 238, 486, 512, 566, 625].map((x, index) => (
						<g key={`${x}-${index}`} opacity="0.62">
							<rect x={x} y={index % 2 === 0 ? 292 : 248} width="11" height="10" fill="#92f5c8" />
							<rect x={x} y={index % 2 === 0 ? 328 : 286} width="11" height="10" fill="#facc15" />
							<rect x={x} y={index % 2 === 0 ? 366 : 326} width="11" height="10" fill="#38bdf8" />
						</g>
					))}
				</g>

				<g strokeLinecap="round" strokeLinejoin="round">
					<path
						d="M342 176L430 238V388H254V238L342 176Z"
						fill="#f6fbf8"
						stroke="#101615"
						strokeWidth="7"
					/>
					<path d="M302 237L342 207L382 237" fill="none" stroke="#10b981" strokeWidth="12" />
					<path d="M293 305H391" stroke="#101615" strokeWidth="12" />
					<path d="M293 340H391" stroke="#101615" strokeWidth="12" />
					<path d="M318 388V346H366V388" fill="#10b981" stroke="#101615" strokeWidth="7" />
				</g>

				<g>
					<path d="M165 448H520" stroke="#edf7f1" strokeOpacity="0.34" strokeWidth="2" />
					<path d="M194 474C272 496 417 498 496 469" stroke="#92f5c8" strokeOpacity="0.6" strokeWidth="3" />
					{[
						[250, 448, "#92f5c8"],
						[296, 462, "#38bdf8"],
						[342, 453, "#facc15"],
						[388, 462, "#ef4444"],
						[434, 448, "#92f5c8"],
					].map(([cx, cy, color], index) => (
						<g key={`${cx}-${cy}-${index}`}>
							<circle cx={Number(cx)} cy={Number(cy)} r="17" fill={String(color)} stroke="#101615" strokeWidth="5" />
							<path
								d={`M${Number(cx) - 25} ${Number(cy) + 54}C${Number(cx) - 19} ${Number(cy) + 23} ${Number(cx) + 19} ${Number(cy) + 23} ${Number(cx) + 25} ${Number(cy) + 54}`}
								fill="#f6fbf8"
								stroke="#101615"
								strokeWidth="5"
							/>
						</g>
					))}
				</g>

				<g fontFamily="var(--font-sans)" letterSpacing="0">
					<text x="48" y="70" fill="#92f5c8" fontSize="15" fontWeight="700">
						NESTHUB SIGNAL
					</text>
					<text x="48" y="102" fill="#ffffff" fontSize="32" fontWeight="700">
						城市里有人一起找答案
					</text>
					<text x="48" y="132" fill="#b8c7bf" fontSize="16">
						通勤、预算、签约和片区经验汇聚成一个住处坐标。
					</text>
					<text x="486" y="92" fill="#facc15" fontSize="42" fontWeight="800">
						{companyGuideCount}
					</text>
					<text x="544" y="92" fill="#ffffff" fontSize="15" fontWeight="700">
						篇公司指南
					</text>
				</g>
			</svg>
		</figure>
	);
}

export default function HomePage() {
	return (
		<HomeLayout
			{...docsLayoutProps}
			className="min-h-dvh bg-[#f6fbf8] text-[#101615] dark:bg-[#090d0c] dark:text-[#edf7f1]"
		>
			<main className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-20 pt-8 sm:px-6 lg:px-8">
				<section className="grid gap-8 py-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:py-12">
					<div className="max-w-3xl">
						<div className="mb-5 inline-flex items-center gap-2 border border-[#101615]/15 bg-white px-3 py-1.5 text-xs font-medium text-[#42504a] dark:border-white/15 dark:bg-[#101615] dark:text-[#b8c7bf]">
							<span className="h-2 w-2 bg-[#10b981]" />
							NestHub 城市租房情报台
						</div>

						<h1 className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-normal text-[#101615] sm:text-5xl lg:text-6xl dark:text-[#f5fff8]">
							让年轻人租房变简单
						</h1>

						<p className="mt-5 max-w-2xl text-base leading-8 text-[#4f6159] sm:text-lg dark:text-[#b8c7bf]">
							这里不做房源堆叠，而是把预算、通勤、片区、小区和签约风险放进同一条决策链。先排除不该租的，再找到真正适合上班路线的生活圈。
						</p>

						<div className="mt-7 flex flex-wrap items-center gap-3">
							<Link
								className="inline-flex items-center gap-2 rounded-md bg-[#101615] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26322e] dark:bg-[#edf7f1] dark:text-[#101615] dark:hover:bg-white"
								href="/docs/avoid-pitfalls"
							>
								先看避坑指南
								<ArrowRight className="h-4 w-4" aria-hidden="true" />
							</Link>
							<Link
								className="inline-flex items-center gap-2 rounded-md border border-[#101615]/20 bg-white px-5 py-3 text-sm font-semibold text-[#101615] transition hover:border-[#101615]/40 hover:bg-[#e9f5ee] dark:border-white/20 dark:bg-[#101615] dark:text-[#edf7f1] dark:hover:bg-[#17211e]"
								href="/docs"
							>
								进入城市目录
								<Route className="h-4 w-4" aria-hidden="true" />
							</Link>
							<a
								className="inline-flex items-center gap-2 rounded-md border border-[#101615]/20 bg-[#facc15] px-5 py-3 text-sm font-semibold text-[#101615] transition hover:bg-[#fde047] dark:border-[#facc15]/50"
								href={repositoryUrl}
								target="_blank"
								rel="noreferrer"
								aria-label="打开 NestHub GitHub 项目"
							>
								GitHub
								<ExternalLink className="h-4 w-4" aria-hidden="true" />
							</a>
						</div>

						<div className="mt-8 grid gap-2 text-sm text-[#4f6159] sm:grid-cols-2 dark:text-[#b8c7bf]">
							{proofPoints.map((point) => (
								<div key={point} className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-[#10b981]" aria-hidden="true" />
									<span>{point}</span>
								</div>
							))}
						</div>
					</div>

					<NestHubSignalVisual />
				</section>

				<section className="border-y border-[#101615]/12 py-6 dark:border-white/12">
					<div className="grid gap-4 lg:grid-cols-[10rem_1fr] lg:items-center">
						<p className="text-sm font-semibold text-[#101615] dark:text-[#f5fff8]">
							已收录企业
							<span className="mt-1 block text-xs font-medium text-[#617069] dark:text-[#9eaea6]">
								{uniqueCompanyCount} 家 / {companyGuideCount} 篇指南
							</span>
						</p>
						<div className="company-marquee relative overflow-hidden">
							<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f6fbf8] to-transparent dark:from-[#090d0c]" />
							<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f6fbf8] to-transparent dark:from-[#090d0c]" />
							<div className="company-marquee-track flex w-max gap-4">
								{[0, 1].map((repeatIndex) => (
									<div key={repeatIndex} className="flex shrink-0 gap-4 pr-4">
										{companyGuides.map((company) => (
											<Link
												key={`${company.href}-${repeatIndex}`}
												href={company.href}
												className="inline-flex min-w-[174px] items-center gap-3 rounded-[8px] border border-[#101615]/10 bg-white px-3 py-2 transition hover:border-[#101615]/30 hover:bg-[#fbfefc] dark:border-white/12 dark:bg-[#101615] dark:hover:border-white/30"
											>
												<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-[#101615]/10 bg-white p-1.5 dark:border-white/15 dark:bg-[#edf7f1]">
													{company.logoKey ? (
														<img
															src={publicAsset(companyLogoPaths[company.logoKey])}
															alt={`${company.name} logo`}
															className="h-full w-full object-contain"
														/>
													) : (
														<Building2 className="h-5 w-5 text-[#617069]" aria-hidden="true" />
													)}
												</span>
												<span>
													<span className="block text-sm font-semibold text-[#101615] dark:text-[#f5fff8]">
														{company.name}
													</span>
													<span className="block text-xs text-[#617069] dark:text-[#9eaea6]">
														{company.area}
													</span>
												</span>
											</Link>
										))}
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="grid gap-5 py-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
					<div>
						<p className="text-sm font-semibold text-[#ef4444]">阅读动线</p>
						<h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-normal text-[#101615] dark:text-[#f5fff8]">
							像看趋势榜一样，先看最影响决策的条目。
						</h2>
						<p className="mt-4 max-w-md text-sm leading-7 text-[#4f6159] dark:text-[#b8c7bf]">
							首页把内容路径压缩成三步，减少从导航里猜入口的时间。
						</p>
					</div>
					<div className="grid gap-3 md:grid-cols-3">
						{readingPath.map((item, index) => {
							const Icon = item.icon;

							return (
								<Link
									key={item.title}
									href={item.href}
									className="group rounded-[8px] border border-[#101615]/12 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#101615]/30 hover:shadow-[0_12px_32px_rgba(16,22,21,0.12)] dark:border-white/12 dark:bg-[#101615] dark:hover:border-white/30"
								>
									<div className="flex items-center justify-between">
										<span className="font-mono text-xs text-[#617069] dark:text-[#9eaea6]">
											0{index + 1}
										</span>
										<Icon className="h-5 w-5 text-[#10b981]" aria-hidden="true" />
									</div>
									<h3 className="mt-8 text-xl font-semibold text-[#101615] dark:text-[#f5fff8]">
										{item.title}
									</h3>
									<p className="mt-3 text-sm leading-6 text-[#4f6159] dark:text-[#b8c7bf]">
										{item.description}
									</p>
									<span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#101615] group-hover:text-[#0f9f6e] dark:text-[#f5fff8]">
										进入
										<ArrowRight className="h-4 w-4" aria-hidden="true" />
									</span>
								</Link>
							);
						})}
					</div>
				</section>

				<section className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
					<div>
						<p className="text-sm font-semibold text-[#10b981]">城市内容成熟度</p>
						<h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-normal text-[#101615] dark:text-[#f5fff8]">
							把最完整的城市放前面，也让新城市入口一眼可见。
						</h2>
						<p className="mt-4 max-w-md text-sm leading-7 text-[#4f6159] dark:text-[#b8c7bf]">
							借鉴开源趋势站的榜单结构，但排名依据换成当前内容密度和可直接使用程度。
						</p>
					</div>
					<div className="space-y-3">
						{cityRows.map((city) => (
							<Link
								key={city.title}
								href={city.href}
								className={`group grid gap-4 rounded-[8px] border border-[#101615]/12 border-l-4 ${city.color} bg-white p-4 transition hover:border-[#101615]/28 hover:bg-[#fbfefc] dark:border-white/12 dark:bg-[#101615] dark:hover:border-white/28 sm:grid-cols-[4rem_1fr_auto] sm:items-center`}
							>
								<div className="font-mono text-2xl font-semibold text-[#101615] dark:text-[#f5fff8]">
									{city.rank}
								</div>
								<div>
									<div className="flex flex-wrap items-center gap-3">
										<h3 className="text-xl font-semibold text-[#101615] dark:text-[#f5fff8]">
											{city.title}
										</h3>
										<span className="rounded-md bg-[#e7f8ef] px-2 py-1 text-xs font-semibold text-[#0b7c56] dark:bg-[#173126] dark:text-[#92f5c8]">
											{city.metric}
										</span>
									</div>
									<p className="mt-2 text-sm leading-6 text-[#4f6159] dark:text-[#b8c7bf]">
										{city.summary}
									</p>
									<div className="mt-3 flex flex-wrap gap-2">
										{city.tags.map((tag) => (
											<span
												key={tag}
												className="rounded-md border border-[#101615]/10 px-2 py-1 text-xs text-[#617069] dark:border-white/12 dark:text-[#9eaea6]"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
								<div className="inline-flex items-center gap-2 text-sm font-semibold text-[#101615] group-hover:text-[#0f9f6e] dark:text-[#f5fff8]">
									打开
									<ArrowRight className="h-4 w-4" aria-hidden="true" />
								</div>
							</Link>
						))}
					</div>
				</section>
			</main>
		</HomeLayout>
	);
}
