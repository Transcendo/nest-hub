import {
	Banknote,
	Bath,
	Bike,
	Building2,
	Camera,
	CheckCircle2,
	ClipboardCheck,
	ClipboardList,
	DoorOpen,
	FileText,
	Home,
	KeyRound,
	LockKeyhole,
	MapPinned,
	Moon,
	PackageCheck,
	PlugZap,
	ReceiptText,
	Route,
	Scale,
	ShieldCheck,
	Sun,
	TriangleAlert,
	UsersRound,
	Volume2,
	Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

const topSignals = [
	{ label: "白天 + 夜晚", value: "2 次复看" },
	{ label: "合同 + 聊天 + 影像", value: "3 类留痕" },
	{ label: "位置 / 设施 / 费用 / 合租 / 退租", value: "5 组风险" },
];

const fastWarnings = [
	"低于同小区同户型太多的房源，先按引流或硬伤处理。",
	"口头承诺不写进合同，就不要当成承诺。",
	"押金退还时间、扣费标准、转租路径必须写清楚。",
	"看房至少覆盖白天采光和夜间噪音、路灯、回家动线。",
];

const journeySteps: Array<{
	step: string;
	title: string;
	description: string;
	href: string;
	icon: LucideIcon;
}> = [
	{
		step: "01",
		title: "先定底线",
		description: "预算、通勤、楼层、噪音、宠物、改造权限先写下来。",
		href: "/docs/avoid-pitfalls/preparation",
		icon: ShieldCheck,
	},
	{
		step: "02",
		title: "再看现场",
		description: "按室内、公共区、周边三层检查，不只看装修照片。",
		href: "/docs/avoid-pitfalls/viewing",
		icon: ClipboardCheck,
	},
	{
		step: "03",
		title: "谈清费用",
		description: "房租、押金、物业、水电网、清洁费和服务费一次列明。",
		href: "/docs/avoid-pitfalls/contract",
		icon: ReceiptText,
	},
	{
		step: "04",
		title: "核合同主体",
		description: "房东身份、房产证、授权、家具家电清单和退租条款逐项核。",
		href: "/docs/avoid-pitfalls/contract",
		icon: FileText,
	},
	{
		step: "05",
		title: "入住留证",
		description: "全屋拍照录像，记录水电燃气读数和设备现状。",
		href: "/docs/avoid-pitfalls/living",
		icon: Camera,
	},
];

const generalSections: Array<{
	title: string;
	kicker: string;
	icon: LucideIcon;
	accent: string;
	points: string[];
}> = [
	{
		title: "房屋位置与周边环境",
		kicker: "先判断能不能长期住",
		icon: MapPinned,
		accent: "border-l-[#10b981]",
		points: [
			"避开小学、儿童游乐区、临街主路、广场舞和施工点等高噪音区域。",
			"女生尽量避免必须穿巷子的夜归路线；一楼潮湿吵闹，顶楼可能有水压和夏季过热问题。",
			"核实地铁、公交、共享单车和电动车可达性，同时看商场、医院、超市和菜市场。",
			"确认垃圾桶位置、清运时间和是否有高压清洗噪音或异味。",
		],
	},
	{
		title: "房屋设施与安全",
		kicker: "所有设备都要试",
		icon: PlugZap,
		accent: "border-l-[#38bdf8]",
		points: [
			"入住前检查水、电、燃气、家电、厨房异味、下水道、花洒水压、马桶和水龙头。",
			"不要轻易租首次出租或刚装修完的房子，甲醛和装修残留风险更高。",
			"敲墙判断是否隔断；隔断间常伴随隔音、消防和居住密度问题。",
			"合租时确认能否换锁，避免与房东或二房东同住导致隐私和边界不清。",
		],
	},
	{
		title: "合同与费用",
		kicker: "先把钱说透",
		icon: Banknote,
		accent: "border-l-[#f59e0b]",
		points: [
			"问清押几付几、起租时间、租金交付日、租期内是否涨租和每年涨幅上限。",
			"宽带、物业、网络设备、水电气、管理费、卫生费等费用必须列入合同或补充条款。",
			"定金具备担保性质；订金等费用如果没有约定定金性质，不应简单混同处理。",
			"提前确认中途转租、退租提前告知时间、手续费、清洁费和家具家电损耗扣费标准。",
		],
	},
	{
		title: "实地看房",
		kicker: "现场不要只凭感觉",
		icon: Route,
		accent: "border-l-[#ef4444]",
		points: [
			"白天看采光、通风和施工；晚上看邻居噪音、隔音、路灯和夜归安全感。",
			"中介带看前先问中介费、房源是否真实、价格是否真实，转租房提前约好时间。",
			"对电视、空调、床、衣柜、窗帘、插座、门窗等家具家电拍照留底。",
			"签约前与房东确认水、电、燃气初始读数，并向物业确认物业费是否按期缴纳。",
		],
	},
	{
		title: "其他边界",
		kicker: "容易后悔的小问题",
		icon: KeyRound,
		accent: "border-l-[#64748b]",
		points: [
			"明确能否贴纸、装挂钩、改造墙面和更换门锁。",
			"养宠物、办理居住证、增加路由器、添置大件家电都要提前问清。",
			"检查插座数量和位置，避免实际入住后到厨房或厕所充电。",
			"所有重要约定都要书面化，不要让聊天里的含糊承诺变成后续扯皮。",
		],
	},
];

const viewingAudits: Array<{
	title: string;
	subtitle: string;
	icon: LucideIcon;
	items: string[];
}> = [
	{
		title: "一看室内环境",
		subtitle: "把客厅、卧室、收纳、厨房、洗衣区和浴室拆开看。",
		icon: Home,
		items: [
			"客厅与卧室：采光、通风、插座、窗户纱窗、隔音、墙体污垢、地板、层高、照明和空调噪音。",
			"收纳空间：衣柜、橱柜深度和高度是否够用，柜内是否有霉味或装修残留气味。",
			"厨房：炉灶数量、操作空间、水龙头出水、排水口异味、橱柜和抽屉布局。",
			"洗衣机位置：是否有防水底座，进水口是否方便连接。",
			"厕所与浴室：花洒水压、地漏异味、瓷砖缝霉菌、马桶冲水、洗脸台出水和浴室收纳。",
			"其他：鞋柜容量、玄关视野、阳台大小、晾衣杆或预留安装位置。",
		],
	},
	{
		title: "二看公共空间",
		subtitle: "公共区域能反映物业、邻居和长期居住体验。",
		icon: Building2,
		items: [
			"垃圾箱周边是否整洁、有无异味，垃圾清理频率和时间是否影响休息。",
			"小区垃圾分类和处置规定是否方便执行。",
			"小区内是否有快递代收点，取件路线是否方便。",
			"电梯运行是否稳定，楼道、电梯间和走廊是否定期清洁。",
			"单元门入口是否堆杂物，有无门禁、监控和夜间照明。",
			"停车场环境和车位情况是否影响出入。",
		],
	},
	{
		title: "三看周边环境",
		subtitle: "同一个小区，白天和夜晚可能是两种状态。",
		icon: MapPinned,
		items: [
			"观察小区周边人流量、夜间路灯和夜归路线安全感。",
			"核实超市、便利店、菜市场、医院和诊所的实际步行距离。",
			"白天和晚上分别听噪音：广场舞、工地、车流、餐饮和夜市都要算。",
			"看建筑外墙维护情况，判断小区整体管理水平。",
			"比较白天与夜晚差异，避免夜市、酒吧街或临街餐饮影响睡眠。",
		],
	},
];

const coLivingSections = [
	{
		title: "合租人基本情况",
		icon: UsersRound,
		points: [
			"尽量了解性别、年龄、是否情侣、是否养宠物、卫生习惯、上下班时间和作息。",
			"尽量不要超过两人合租；若三人合租，避免另外两人已经相互熟识且关系绑定。",
		],
	},
	{
		title: "合同与费用",
		icon: Banknote,
		points: [
			"合同里明确是否允许中途转租，以及剩余房租和押金如何退还。",
			"不要轻易一次性支付半年或一年房租，合租关系的不确定性更高。",
		],
	},
	{
		title: "生活规则与卫生",
		icon: ClipboardList,
		points: [
			"提前约定夜间噪音、访客留宿、公共物品边界、冬夏空调和电费分摊。",
			"公共区域设施损坏由责任人赔偿，厨房、卫生间、客厅卫生分工和频率要写清。",
			"决定合租前观察厨房油渍、工具摆放、卫生间和公共区域整洁度。",
		],
	},
];

const contractSections = [
	{
		title: "合同主体与身份确认",
		icon: LockKeyhole,
		points: [
			"核对房东身份证、房产证和代理授权，二房东出租必须有原房东授权。",
			"甲方、乙方全称和房屋地址精确到门牌号，合同一式两份，租客保留一份。",
		],
	},
	{
		title: "押金与退款条款",
		icon: ReceiptText,
		points: [
			"写清押金金额、退还方式、转租时处理方式和退房后到账时间。",
			"明确哪些情况会扣押金；自然老化不应被当作人为损坏。",
			"确认打扫干净后是否仍收卫生费，以及具体标准。",
		],
	},
	{
		title: "违约责任与赔偿",
		icon: Scale,
		points: [
			"房东提前收回、租客提前退租、租期内卖房、提前解约赔偿都要写明。",
			"转租需提前几天告知、由谁签新合同、转租剩余月份还是重签一年，都要落字。",
		],
	},
	{
		title: "设施与维修",
		icon: Wrench,
		points: [
			"签约前核对家具家电数量，并用照片或视频记录现状。",
			"家电自然老化和房屋基础设施非人为损坏，一般应约定由房东负责。",
			"水管破裂、漏水、热水器等维修问题，要约定响应时间和费用承担。",
		],
	},
	{
		title: "附加条款",
		icon: FileText,
		points: [
			"工作可能变动时，可协商写入合理转租条款，降低提前退租成本。",
			"计划住 2 到 3 年时，提前约定每年租金涨幅。",
			"甲醛超标、墙面挂钩、宠物、居住证办理、其他费用都适合写进补充条款。",
		],
	},
	{
		title: "证据留存",
		icon: Camera,
		points: [
			"签合同前对全屋拍照或录像，尤其是破损、污渍、漏水和家电状态。",
			"所有补充约定形成书面记录，并由双方签字或在聊天中明确确认。",
		],
	},
];

const legalReferences = [
	{
		title: "民法典全文",
		description: "核对租赁合同、定金、违约责任等法律原文。",
		href: "https://wb.flk.npc.gov.cn/flfg/PDF/bd53dd912c1048f2aecbaa229238334b.pdf",
	},
	{
		title: "定金口径",
		description: "法院普法材料提示定金上限和定金罚则。",
		href: "https://sdcourt.gov.cn/nwglpt/_2343835/_2532828/44498494/index.html",
	},
	{
		title: "买卖不破租赁",
		description: "民法典第七百二十五条规定所有权变动不影响租赁合同效力。",
		href: "https://gz.119.gov.cn/xxgk/zfxxgk/fdzdgknr/lzyj/flfg/202503/t20250303_86974460.html",
	},
];

const finalChecklist = [
	{ label: "噪音", icon: Volume2 },
	{ label: "夜归", icon: Moon },
	{ label: "采光", icon: Sun },
	{ label: "水压", icon: Bath },
	{ label: "插座", icon: PlugZap },
	{ label: "门锁", icon: DoorOpen },
	{ label: "通勤", icon: Bike },
	{ label: "快递", icon: PackageCheck },
];

function SectionHeader({
	kicker,
	title,
	description,
}: {
	kicker: string;
	title: string;
	description?: string;
}) {
	return (
		<div className="mb-5 max-w-3xl">
			<div className="mb-2 text-xs font-semibold uppercase tracking-normal text-emerald-700 dark:text-emerald-300">
				{kicker}
			</div>
			<h2 className="text-2xl font-semibold leading-tight tracking-normal text-zinc-950 sm:text-3xl dark:text-zinc-50">
				{title}
			</h2>
			{description ? (
				<p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
					{description}
				</p>
			) : null}
		</div>
	);
}

function CheckItem({ children }: { children: React.ReactNode }) {
	return (
		<li className="flex gap-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
			<CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-600 dark:text-emerald-300" />
			<span>{children}</span>
		</li>
	);
}

export function AvoidPitfallsOverview() {
	return (
		<div className="not-prose my-8 space-y-10">
			<section className="overflow-hidden rounded-lg border border-zinc-200 bg-[#f7faf8] text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
				<div className="grid gap-0 lg:grid-cols-[0.96fr_1.04fr]">
					<div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-md border border-emerald-700/20 bg-white px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-400/30 dark:bg-zinc-900 dark:text-emerald-200">
								<ShieldCheck className="size-3.5" />
								租房避坑战术板
							</div>
							<div className="space-y-3">
								<h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
									先排雷，再决定住哪里
								</h2>
								<p className="max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
									这页把租房流程拆成可执行的检查动作：先定底线，再现场核验，最后把费用、退租、维修和合租规则写进合同或书面记录。
								</p>
							</div>
						</div>

						<div className="grid gap-3 sm:grid-cols-3">
							{topSignals.map((signal) => (
								<div
									key={signal.label}
									className="border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
								>
									<div className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
										{signal.value}
									</div>
									<div className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
										{signal.label}
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="relative border-t border-zinc-200 bg-white p-6 lg:border-l lg:border-t-0 dark:border-zinc-800 dark:bg-zinc-900">
						<div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,#0f172a_1px,transparent_1px),linear-gradient(180deg,#0f172a_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-[0.14] dark:[background-image:linear-gradient(90deg,#ffffff_1px,transparent_1px),linear-gradient(180deg,#ffffff_1px,transparent_1px)]" />
						<div className="relative grid min-h-[300px] gap-4 sm:grid-cols-[0.85fr_1.15fr] sm:items-center">
							<div className="space-y-3">
								{fastWarnings.map((warning, index) => (
									<div
										key={warning}
										className="border border-zinc-200 bg-[#fbfdfb] p-3 text-sm leading-6 text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
									>
										<div className="mb-1 flex items-center gap-2 text-xs font-semibold text-red-700 dark:text-red-300">
											<TriangleAlert className="size-3.5" />
											高频坑位 {index + 1}
										</div>
										{warning}
									</div>
								))}
							</div>

							<div className="relative overflow-hidden border border-zinc-200 bg-[#101615] p-4 text-white shadow-sm dark:border-zinc-700">
								<div className="mb-4 flex items-center justify-between gap-3">
									<div>
										<div className="text-xs font-semibold text-emerald-200">
											SITE CHECK
										</div>
										<div className="mt-1 text-xl font-semibold">望闻问切</div>
									</div>
									<ClipboardCheck className="size-8 text-amber-300" />
								</div>
								<div className="grid grid-cols-2 gap-2">
									{finalChecklist.map((item) => {
										const Icon = item.icon;
										return (
											<div
												key={item.label}
												className="flex items-center gap-2 border border-white/12 bg-white/8 px-3 py-2 text-sm"
											>
												<Icon className="size-4 text-emerald-200" />
												<span>{item.label}</span>
											</div>
										);
									})}
								</div>
								<div className="mt-4 border border-amber-300/40 bg-amber-300/10 p-3 text-sm leading-6 text-amber-50">
									不要用“看起来还行”做决策。把每一项都拍下来、写下来、谈下来。
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section>
				<SectionHeader
					kicker="Reading path"
					title="按真实租房流程走"
					description="这些入口对应现有子页面，现场使用时可以直接当成清单。"
				/>
				<div className="grid gap-4 md:grid-cols-5">
					{journeySteps.map((step) => {
						const Icon = step.icon;
						return (
							<Link
								key={step.step}
								href={step.href}
								className="group flex flex-col border border-zinc-200 bg-white p-4 transition-colors hover:border-emerald-600 hover:bg-[#f6fbf8] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-emerald-300 dark:hover:bg-zinc-900"
							>
								<div className="mb-4 flex items-center justify-between gap-2">
									<span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
										{step.step}
									</span>
									<Icon className="size-5 text-emerald-700 transition-transform group-hover:-translate-y-0.5 dark:text-emerald-300" />
								</div>
								<div className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
									{step.title}
								</div>
								<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
									{step.description}
								</p>
							</Link>
						);
					})}
				</div>
			</section>

			<section>
				<SectionHeader
					kicker="General checklist"
					title="通用注意事项"
					description="不论在哪个城市，先用这五组问题筛掉不值得继续看的房源。"
				/>
				<div className="grid gap-4 lg:grid-cols-2">
					{generalSections.map((section) => {
						const Icon = section.icon;
						return (
							<article
								key={section.title}
								className={`border border-l-4 border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 ${section.accent}`}
							>
								<div className="mb-4 flex items-start gap-3">
									<div className="flex size-10 shrink-0 items-center justify-center border border-zinc-200 bg-[#f7faf8] dark:border-zinc-800 dark:bg-zinc-900">
										<Icon className="size-5 text-zinc-800 dark:text-zinc-100" />
									</div>
									<div>
										<div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
											{section.kicker}
										</div>
										<h3 className="mt-1 text-lg font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">
											{section.title}
										</h3>
									</div>
								</div>
								<ul className="space-y-2">
									{section.points.map((point) => (
										<CheckItem key={point}>{point}</CheckItem>
									))}
								</ul>
							</article>
						);
					})}
				</div>
			</section>

			<section className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
				<div>
					<SectionHeader
						kicker="On-site audit"
						title="看房：望闻问切"
						description="把看房动作拆到空间层级，避免只被装修、照片或话术带着走。"
					/>
					<div className="border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-900 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-100">
						<div className="mb-2 flex items-center gap-2 font-semibold">
							<TriangleAlert className="size-4" />
							现场规则
						</div>
						白天看采光和设施，晚上看噪音和安全。现场发现的问题，先拍照记录，再谈维修、更换或降价。
					</div>
				</div>

				<div className="grid gap-4">
					{viewingAudits.map((audit) => {
						const Icon = audit.icon;
						return (
							<article
								key={audit.title}
								className="border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
							>
								<div className="mb-4 flex items-start gap-3">
									<div className="flex size-10 shrink-0 items-center justify-center border border-zinc-200 bg-[#f7faf8] dark:border-zinc-800 dark:bg-zinc-900">
										<Icon className="size-5 text-emerald-700 dark:text-emerald-300" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
											{audit.title}
										</h3>
										<p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
											{audit.subtitle}
										</p>
									</div>
								</div>
								<ul className="space-y-2">
									{audit.items.map((item) => (
										<CheckItem key={item}>{item}</CheckItem>
									))}
								</ul>
							</article>
						);
					})}
				</div>
			</section>

			<section>
				<SectionHeader
					kicker="Shared living"
					title="合租先谈规则，再谈情面"
					description="合租风险通常不是房子本身，而是人、钱、卫生和边界没有提前讲清楚。"
				/>
				<div className="grid gap-4 lg:grid-cols-3">
					{coLivingSections.map((section) => {
						const Icon = section.icon;
						return (
							<article
								key={section.title}
								className="border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
							>
								<div className="mb-4 flex items-center gap-3">
									<div className="flex size-10 items-center justify-center border border-zinc-200 bg-[#f7faf8] dark:border-zinc-800 dark:bg-zinc-900">
										<Icon className="size-5 text-sky-700 dark:text-sky-300" />
									</div>
									<h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
										{section.title}
									</h3>
								</div>
								<ul className="space-y-2">
									{section.points.map((point) => (
										<CheckItem key={point}>{point}</CheckItem>
									))}
								</ul>
							</article>
						);
					})}
				</div>
			</section>

			<section>
				<SectionHeader
					kicker="Contract matrix"
					title="租房合同要写到能执行"
					description="合同不是模板填空，而是把身份、费用、违约、维修和证据留存变成可追溯的规则。"
				/>
				<div className="overflow-hidden border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
					<div className="grid border-b border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 md:grid-cols-[13rem_1fr]">
						<div className="px-4 py-3">条款模块</div>
						<div className="px-4 py-3">必须落字的内容</div>
					</div>
					{contractSections.map((section) => {
						const Icon = section.icon;
						return (
							<div
								key={section.title}
								className="grid border-b border-zinc-100 last:border-b-0 dark:border-zinc-800 md:grid-cols-[13rem_1fr]"
							>
								<div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-4 md:border-b-0 md:border-r dark:border-zinc-800">
									<Icon className="size-5 text-zinc-700 dark:text-zinc-300" />
									<span className="font-semibold text-zinc-950 dark:text-zinc-50">
										{section.title}
									</span>
								</div>
								<div className="px-4 py-4">
									<ul className="grid gap-2 lg:grid-cols-2">
										{section.points.map((point) => (
											<CheckItem key={point}>{point}</CheckItem>
										))}
									</ul>
								</div>
							</div>
						);
					})}
				</div>

				<div className="mt-4 grid gap-3 lg:grid-cols-3">
					{legalReferences.map((reference) => (
						<a
							key={reference.href}
							href={reference.href}
							target="_blank"
							rel="noreferrer"
							className="border border-zinc-200 bg-[#f7faf8] p-4 transition-colors hover:border-emerald-600 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-emerald-300"
						>
							<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
								<Scale className="size-4 text-emerald-700 dark:text-emerald-300" />
								{reference.title}
							</div>
							<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
								{reference.description}
							</p>
						</a>
					))}
				</div>
			</section>
		</div>
	);
}
