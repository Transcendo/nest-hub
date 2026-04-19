import {
	Banknote,
	Building2,
	Camera,
	CheckCircle2,
	ClipboardCheck,
	ClipboardList,
	Clock3,
	DoorOpen,
	Eye,
	FileCheck2,
	FileText,
	HandCoins,
	Home,
	KeyRound,
	LockKeyhole,
	MapPinned,
	MessageSquareText,
	Moon,
	PlugZap,
	ReceiptText,
	Route,
	Scale,
	ShieldAlert,
	ShieldCheck,
	ShoppingBag,
	Siren,
	Sparkles,
	Sun,
	TriangleAlert,
	UsersRound,
	Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type Stat = {
	label: string;
	value: string;
};

type Action = {
	title: string;
	description: string;
	icon: LucideIcon;
};

type Section = {
	title: string;
	kicker: string;
	icon: LucideIcon;
	points: string[];
	tone?: "green" | "blue" | "amber" | "red" | "zinc";
};

type MatrixRow = {
	item: string;
	check: string;
	warning: string;
};

type Scenario = {
	title: string;
	risk: string;
	response: string;
	icon: LucideIcon;
};

type NavItem = {
	title: string;
	href: string;
	description: string;
};

const toneClasses: Record<NonNullable<Section["tone"]>, string> = {
	green: "border-l-[#10b981]",
	blue: "border-l-[#38bdf8]",
	amber: "border-l-[#f59e0b]",
	red: "border-l-[#ef4444]",
	zinc: "border-l-[#64748b]",
};

const nextNav: Record<string, NavItem> = {
	preparation: {
		title: "下一步：实地看房",
		href: "/docs/avoid-pitfalls/viewing",
		description: "把预算和候选房源带到现场，开始核验采光、噪音、水电和周边。",
	},
	viewing: {
		title: "下一步：签约谈判",
		href: "/docs/avoid-pitfalls/contract",
		description: "把现场发现的问题变成维修、更换、降价或合同条款。",
	},
	contract: {
		title: "下一步：入住生活",
		href: "/docs/avoid-pitfalls/living",
		description: "签完不等于结束，入住当天要完成验收、拍照和初始读数记录。",
	},
	living: {
		title: "下一步：常见陷阱",
		href: "/docs/avoid-pitfalls/traps",
		description: "提前认识低价引流、隐形收费、假房东和隔断房等高频套路。",
	},
	traps: {
		title: "下一步：维权指南",
		href: "/docs/avoid-pitfalls/rights",
		description: "真出问题时，按证据、协商、投诉、调解、法律路径推进。",
	},
	rights: {
		title: "回到：避坑总览",
		href: "/docs/avoid-pitfalls",
		description: "回到总览，把整套租房流程再过一遍。",
	},
};

const legalLinks = [
	{
		title: "民法典全文",
		href: "https://wb.flk.npc.gov.cn/flfg/PDF/bd53dd912c1048f2aecbaa229238334b.pdf",
		description: "合同、定金、违约责任、租赁等规则的基础法源。",
	},
	{
		title: "城市房屋租赁管理办法",
		href: "https://www.mohurd.gov.cn/file/2022/20220228/2eed849a-a5ca-4d57-8ced-5ebaf5762606.pdf?n=%E5%9F%8E%E5%B8%82%E6%88%BF%E5%B1%8B%E7%A7%9F%E8%B5%81%E7%AE%A1%E7%90%86%E5%8A%9E%E6%B3%95",
		description: "书面租赁合同、修缮责任、登记备案等基础规则参考。",
	},
	{
		title: "定金法院普法",
		href: "https://sdcourt.gov.cn/nwglpt/_2343835/_2532828/44498494/index.html",
		description: "法院普法材料解释定金上限和定金罚则。",
	},
];

function GuideShell({
	badge,
	title,
	summary,
	mantra,
	stats,
	actions,
	children,
	next,
}: {
	badge: string;
	title: string;
	summary: string;
	mantra: string;
	stats: Stat[];
	actions: Action[];
	children: ReactNode;
	next: NavItem;
}) {
	return (
		<div className="not-prose my-8 space-y-9">
			<section className="overflow-hidden rounded-lg border border-zinc-200 bg-[#f7faf8] text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
				<div className="grid lg:grid-cols-[0.95fr_1.05fr]">
					<div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-md border border-emerald-700/20 bg-white px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-400/30 dark:bg-zinc-900 dark:text-emerald-200">
								<ShieldCheck className="size-3.5" />
								{badge}
							</div>
							<div className="space-y-3">
								<h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
									{title}
								</h2>
								<p className="max-w-2xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
									{summary}
								</p>
							</div>
						</div>
						<div className="grid gap-3 sm:grid-cols-3">
							{stats.map((stat) => (
								<div
									key={stat.label}
									className="border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
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
					<div className="relative border-t border-zinc-200 bg-white p-6 lg:border-l lg:border-t-0 dark:border-zinc-800 dark:bg-zinc-900">
						<div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,#0f172a_1px,transparent_1px),linear-gradient(180deg,#0f172a_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-[0.14] dark:[background-image:linear-gradient(90deg,#ffffff_1px,transparent_1px),linear-gradient(180deg,#ffffff_1px,transparent_1px)]" />
						<div className="relative grid h-full min-h-[300px] content-between gap-5">
							<div className="border border-zinc-200 bg-[#101615] p-5 text-white dark:border-zinc-700">
								<div className="mb-2 flex items-center gap-2 text-xs font-semibold text-emerald-200">
									<ClipboardCheck className="size-4" />
									现场判断句
								</div>
								<p className="text-2xl font-semibold leading-snug tracking-normal">
									{mantra}
								</p>
							</div>
							<div className="grid gap-3 sm:grid-cols-2">
								{actions.map((action) => {
									const Icon = action.icon;
									return (
										<div
											key={action.title}
											className="border border-zinc-200 bg-[#fbfdfb] p-3 dark:border-zinc-800 dark:bg-zinc-950"
										>
											<div className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
												<Icon className="size-4 text-emerald-700 dark:text-emerald-300" />
												{action.title}
											</div>
											<p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
												{action.description}
											</p>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</section>
			{children}
			<Link
				href={next.href}
				className="block rounded-lg border border-zinc-200 bg-[#101615] p-5 text-white transition-colors hover:bg-[#1f2a26] dark:border-zinc-800"
			>
				<div className="text-lg font-semibold">{next.title}</div>
				<p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">
					{next.description}
				</p>
			</Link>
		</div>
	);
}

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

function CheckItem({ children }: { children: ReactNode }) {
	return (
		<li className="flex gap-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
			<CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-600 dark:text-emerald-300" />
			<span>{children}</span>
		</li>
	);
}

function SectionGrid({ sections }: { sections: Section[] }) {
	return (
		<div className="grid gap-4 lg:grid-cols-2">
			{sections.map((section) => {
				const Icon = section.icon;
				return (
					<article
						key={section.title}
						className={`border border-l-4 border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 ${toneClasses[section.tone ?? "green"]}`}
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
	);
}

function Matrix({
	rows,
	head = ["检查项", "应该确认", "风险信号"],
}: {
	rows: MatrixRow[];
	head?: [string, string, string];
}) {
	return (
		<div className="overflow-hidden border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
			<div className="grid border-b border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 md:grid-cols-[0.7fr_1.1fr_1.1fr]">
				{head.map((item) => (
					<div key={item} className="px-4 py-3">
						{item}
					</div>
				))}
			</div>
			{rows.map((row) => (
				<div
					key={row.item}
					className="grid border-b border-zinc-100 last:border-b-0 dark:border-zinc-800 md:grid-cols-[0.7fr_1.1fr_1.1fr]"
				>
					<div className="px-4 py-4 font-semibold text-zinc-950 dark:text-zinc-50">
						{row.item}
					</div>
					<div className="px-4 py-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
						{row.check}
					</div>
					<div className="px-4 py-4 text-sm leading-6 text-red-700 dark:text-red-300">
						{row.warning}
					</div>
				</div>
			))}
		</div>
	);
}

function ScenarioGrid({ scenarios }: { scenarios: Scenario[] }) {
	return (
		<div className="grid gap-4 lg:grid-cols-3">
			{scenarios.map((scenario) => {
				const Icon = scenario.icon;
				return (
					<article
						key={scenario.title}
						className="border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
					>
						<div className="mb-4 flex items-center gap-3">
							<div className="flex size-10 items-center justify-center border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30">
								<Icon className="size-5 text-red-700 dark:text-red-300" />
							</div>
							<h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
								{scenario.title}
							</h3>
						</div>
						<div className="space-y-3 text-sm leading-6">
							<p className="text-zinc-700 dark:text-zinc-300">
								<span className="font-semibold text-red-700 dark:text-red-300">
									风险：
								</span>
								{scenario.risk}
							</p>
							<p className="text-zinc-700 dark:text-zinc-300">
								<span className="font-semibold text-emerald-700 dark:text-emerald-300">
									应对：
								</span>
								{scenario.response}
							</p>
						</div>
					</article>
				);
			})}
		</div>
	);
}

function RecordTemplate({ rows }: { rows: string[] }) {
	return (
		<div className="border border-zinc-200 bg-[#101615] p-5 text-white shadow-sm dark:border-zinc-800">
			<div className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-200">
				<ClipboardList className="size-4" />
				可直接复制到备忘录
			</div>
			<div className="grid gap-2 text-sm leading-6 sm:grid-cols-2">
				{rows.map((row) => (
					<div key={row} className="border border-white/12 bg-white/8 px-3 py-2">
						{row}
					</div>
				))}
			</div>
		</div>
	);
}

function SourceCards() {
	return (
		<div className="grid gap-3 lg:grid-cols-3">
			{legalLinks.map((link) => (
				<a
					key={link.href}
					href={link.href}
					target="_blank"
					rel="noreferrer"
					className="border border-zinc-200 bg-[#f7faf8] p-4 transition-colors hover:border-emerald-600 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-emerald-300"
				>
					<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
						<Scale className="size-4 text-emerald-700 dark:text-emerald-300" />
						{link.title}
					</div>
					<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
						{link.description}
					</p>
				</a>
			))}
		</div>
	);
}

export function PreparationGuidePage() {
	const sections: Section[] = [
		{
			title: "预算规划",
			kicker: "先算总成本",
			icon: Banknote,
			tone: "green",
			points: [
				"把月租控制在收入可承受范围内，常见经验线是不超过月收入 30%。",
				"押金、首月房租、中介费、搬家费、添置家具和通勤成本要一起算。",
				"预留 3 到 6 个月房租作为应急资金，避免换工作或转租时被动。",
				"留出 10% 到 20% 缓冲，不要把预算压到刚好够付房租。",
			],
		},
		{
			title: "区域选择",
			kicker: "通勤优先于装修",
			icon: Route,
			tone: "blue",
			points: [
				"地铁直达尽量控制在 1 小时内，公交换乘尽量不超过 2 次。",
				"把等电梯、走到地铁、骑行接驳、园区步行都算进门到门时间。",
				"500 米内有便利店、超市或基础餐饮，生活压力会小很多。",
				"避开学校、工地、临街主路、夜市和噪音密集的商圈。",
			],
		},
		{
			title: "找房渠道",
			kicker: "先可信，再丰富",
			icon: ShoppingBag,
			tone: "amber",
			points: [
				"公司群、校友群和可信转租适合找真实样本，但也要核验授权。",
				"正规中介平台适合建立价格锚点，成本更高但流程相对清楚。",
				"小红书、豆瓣、闲鱼、Wellcee 信息多，必须线下看房和核身份。",
				"同一小区同户型至少横向比较 3 到 5 套，先形成市场价。",
			],
		},
		{
			title: "虚假房源识别",
			kicker: "低价先当风险",
			icon: Eye,
			tone: "red",
			points: [
				"价格明显低于市场价、照片像样板间、地址含糊，优先按引流处理。",
				"要求先付定金才能看房、一直回避实地看房，直接拉高风险等级。",
				"真实房源通常地址、面积、配置、价格清楚，照片角度丰富。",
				"约看前问清房号、付款方式、中介费和是否能见房东或授权文件。",
			],
		},
	];

	const matrix: MatrixRow[] = [
		{
			item: "房租",
			check: "确认月租、起租日、付款周期、是否有免租搬家期。",
			warning: "只说押一付一，但后面追加服务费或管理费。",
		},
		{
			item: "押金",
			check: "确认金额、退还时间、扣除标准、转租时如何处理。",
			warning: "退还条件写成完好如新，或完全不写到账时间。",
		},
		{
			item: "中介费",
			check: "看房前问清比例、支付节点、未成交是否收费。",
			warning: "先带看再临时说要收高额服务费。",
		},
		{
			item: "水电网",
			check: "确认民水民电还是商水商电，宽带是否包含在房租里。",
			warning: "口头说便宜，合同里没有费用口径。",
		},
		{
			item: "隐性成本",
			check: "估算通勤、外卖、物业、停车、搬家、清洁和设备补齐成本。",
			warning: "房租低，但交通、生活和额外费用持续吞预算。",
		},
	];

	return (
		<GuideShell
			badge="租前准备"
			title="先写底线，再开始刷房"
			summary="租前准备不是做功课给自己看，而是把预算、通勤、渠道和房源真实性变成筛选规则。规则越早写清，越不容易被低价、照片和催促话术带偏。"
			mantra="看房前没有预算表和通勤底线，就很容易被现场节奏推着走。"
			stats={[
				{ label: "房租经验线", value: "30%" },
				{ label: "应急资金", value: "3-6 月" },
				{ label: "对比样本", value: "3-5 套" },
			]}
			actions={[
				{
					title: "写预算上限",
					description: "把房租、押金、中介费、搬家和通勤成本放在一张表。",
					icon: Banknote,
				},
				{
					title: "定通勤红线",
					description: "用门到门时间筛选，不用地图直线距离骗自己。",
					icon: Route,
				},
				{
					title: "查价格锚点",
					description: "同小区同户型横向比价，低价先问硬伤。",
					icon: Eye,
				},
				{
					title: "准备看房包",
					description: "身份证、预算、卷尺、充电宝、记录模板提前备好。",
					icon: ClipboardList,
				},
			]}
			next={nextNav.preparation}
		>
			<section>
				<SectionHeader
					kicker="Before search"
					title="租前四件事"
					description="这四组判断决定你后面看房效率和谈判底气。"
				/>
				<SectionGrid sections={sections} />
			</section>
			<section>
				<SectionHeader
					kicker="Budget matrix"
					title="费用要按总成本理解"
					description="不要只看月租，很多纠纷来自押金、服务费、物业和退租扣费。"
				/>
				<Matrix rows={matrix} head={["费用项", "签约前确认", "风险信号"]} />
			</section>
			<RecordTemplate
				rows={[
					"月租上限：",
					"可接受押金：",
					"通勤上限：",
					"必须避开：",
					"可接受楼层：",
					"能否合租：",
					"宠物 / 居住证：",
					"候选小区：",
				]}
			/>
		</GuideShell>
	);
}

export function ViewingGuidePage() {
	const sections: Section[] = [
		{
			title: "看房时机",
			kicker: "白天晚上都要看",
			icon: Clock3,
			tone: "green",
			points: [
				"白天看采光、通风、楼间距、施工和公共区卫生。",
				"晚上看噪音、路灯、楼道安全感、夜归动线和邻居生活节奏。",
				"雨天或雨后适合看漏水、返潮和排水，夏天适合看异味和霉菌。",
				"建议找人陪同，现场记录会更完整，也减少被催促的压力。",
			],
		},
		{
			title: "室内检查",
			kicker: "每个设备都试一次",
			icon: Home,
			tone: "blue",
			points: [
				"客厅和卧室看采光、通风、插座、窗户、纱窗、墙体、地板和层高。",
				"厨房看炉灶、操作空间、水龙头、下水、排水口异味和橱柜收纳。",
				"浴室看花洒水压、地漏、霉菌、马桶冲水、洗脸台出水和置物空间。",
				"空调、热水器、洗衣机、冰箱、油烟机都要开机试，不用也要查。",
			],
		},
		{
			title: "公共空间",
			kicker: "物业会写在细节里",
			icon: Building2,
			tone: "amber",
			points: [
				"看垃圾箱位置、异味、清运时间和是否有高压清洗噪音。",
				"看楼道、电梯间、单元门、监控、门禁和是否堆放杂物。",
				"确认快递代收点、停车场、电梯稳定性和公共区清洁频率。",
				"公共区脏乱通常意味着后续报修、邻里和物业协同也更难。",
			],
		},
		{
			title: "周边环境",
			kicker: "对比日夜状态",
			icon: MapPinned,
			tone: "red",
			points: [
				"白天和晚上分别听噪音：车流、施工、广场舞、餐饮、夜市都要算。",
				"核实便利店、超市、菜市场、医院、诊所、公交地铁的真实步行距离。",
				"女生尤其要看夜归路线是否需要穿巷子，路灯和人流是否稳定。",
				"建筑外墙维护、门口秩序和周边人流能反映长期居住体感。",
			],
		},
	];

	const matrix: MatrixRow[] = [
		{
			item: "采光通风",
			check: "白天开窗观察自然光和空气流动，确认是否被遮挡。",
			warning: "白天也昏暗、窗户打不开、房间有霉味或闷味。",
		},
		{
			item: "水电设施",
			check: "开水龙头、花洒、照明和插座，记录水表电表燃气表。",
			warning: "水压忽大忽小、插座松动、排水慢、下水道反味。",
		},
		{
			item: "隔音噪音",
			check: "关窗听室外，敲墙听隔断，晚上复看邻居和街道声音。",
			warning: "临街、楼下餐饮、隔断墙、夜间仍持续噪音。",
		},
		{
			item: "家具家电",
			check: "逐件试用并拍照：空调、冰箱、洗衣机、热水器、床、柜子。",
			warning: "房东说入住后再修，但合同没有维修时间和责任。",
		},
		{
			item: "安全动线",
			check: "看门锁、楼道照明、单元门、监控、夜归路线和消防通道。",
			warning: "楼道堆物、门禁失效、必须穿暗巷、逃生通道被堵。",
		},
	];

	return (
		<GuideShell
			badge="实地看房"
			title="按空间层级检查，不按感觉下单"
			summary="实地看房要把房子拆成室内、公共空间、周边环境三层核验。白天看硬件，晚上看真实生活状态；看到问题先拍照，再谈维修、降价或放弃。"
			mantra="好房源经得起复看；只催你立刻交钱的房源，先暂停。"
			stats={[
				{ label: "建议复看", value: "2 次" },
				{ label: "检查层级", value: "3 层" },
				{ label: "记录材料", value: "照片+视频" },
			]}
			actions={[
				{
					title: "白天看采光",
					description: "确认朝向、遮挡、通风、公共区和施工情况。",
					icon: Sun,
				},
				{
					title: "晚上听噪音",
					description: "观察邻居、路灯、回家路线和临街声音。",
					icon: Moon,
				},
				{
					title: "逐项试设备",
					description: "水电气、空调、热水器、马桶和排水都要试。",
					icon: PlugZap,
				},
				{
					title: "全程留记录",
					description: "拍问题点、表读数、家具家电和聊天承诺。",
					icon: Camera,
				},
			]}
			next={nextNav.viewing}
		>
			<section>
				<SectionHeader
					kicker="On-site checklist"
					title="看房现场四层扫描"
					description="把用户提供的“望闻问切”细化成现场可执行动作。"
				/>
				<SectionGrid sections={sections} />
			</section>
			<section>
				<SectionHeader
					kicker="Audit matrix"
					title="看房问题记录成谈判材料"
					description="看完不要只记“还行”，要把发现的问题转成可对比、可谈判、可留证的记录。"
				/>
				<Matrix rows={matrix} />
			</section>
			<RecordTemplate
				rows={[
					"地址 / 房号：",
					"租金 / 押金：",
					"白天采光：",
					"夜间噪音：",
					"水压 / 排水：",
					"家电问题：",
					"公共区问题：",
					"需要房东确认：",
				]}
			/>
		</GuideShell>
	);
}

export function ContractGuidePage() {
	const sections: Section[] = [
		{
			title: "合同主体",
			kicker: "先核人和房",
			icon: LockKeyhole,
			tone: "green",
			points: [
				"核对房东身份证、房产证和房屋地址，确认姓名和产权信息一致。",
				"中介或二房东签约时，要看原合同、转租授权或房东书面同意。",
				"合同甲乙方全称、身份证号、联系方式和房屋门牌号必须准确。",
				"合同一式两份，租客自己保留一份，不要只拿照片。",
			],
		},
		{
			title: "押金与退款",
			kicker: "退租规则提前写",
			icon: ReceiptText,
			tone: "blue",
			points: [
				"写清押金金额、用途、退还方式、退房后几个工作日内到账。",
				"明确哪些情况会扣押金，正常老化不能被当成人为损坏。",
				"确认清洁费、家具家电折旧费、卫生费是否会收，按什么标准收。",
				"转租成功后的押金路径要写清，是房东退、转租人退还是三方结算。",
			],
		},
		{
			title: "费用与涨租",
			kicker: "所有钱一次列明",
			icon: Banknote,
			tone: "amber",
			points: [
				"房租、押几付几、交租日期、起租日、免租期和付款账户写清楚。",
				"水电气网、物业、管理、清洁、维修、停车、宽带设备费都要明确。",
				"计划住 2 到 3 年时，提前约定续租和每年涨幅上限。",
				"商水商电、民水民电不要靠口头说，合同或账单口径要一致。",
			],
		},
		{
			title: "维修与退租",
			kicker: "责任要能执行",
			icon: Wrench,
			tone: "red",
			points: [
				"家具家电清单要逐项写明数量、品牌或状态，并用照片留证。",
				"非人为损坏、自然老化、房屋结构和基础设施维修通常应约定由房东承担。",
				"漏水、热水器、空调等关键故障要约定响应时间和临时替代方案。",
				"提前退租、房东收回、租期内卖房、转租手续和违约金都要落字。",
			],
		},
	];

	const matrix: MatrixRow[] = [
		{
			item: "定金 / 订金",
			check: "付款前确认款项性质、金额、退还条件和收款人身份。",
			warning: "只说先交钱留房，不给收据或不写可退条件。",
		},
		{
			item: "转租",
			check: "是否允许、提前几天告知、谁找接手、手续费和押金如何处理。",
			warning: "完全禁止转租，或允许转租但房东保留任意拒绝权。",
		},
		{
			item: "违约",
			check: "房东提前收回、租客提前退租、租期内卖房的赔偿方式。",
			warning: "只约束租客违约，不约束房东违约。",
		},
		{
			item: "附加条款",
			check: "宠物、居住证、墙面挂钩、换锁、甲醛、维修承诺写入补充条款。",
			warning: "房东说都可以，但合同空白处没有任何记录。",
		},
		{
			item: "证据",
			check: "合同、转账、聊天、照片、视频、家具清单和表读数统一保存。",
			warning: "现金支付、口头承诺、房屋现状没有任何留底。",
		},
	];

	return (
		<GuideShell
			badge="签约谈判"
			title="价格可以谈，合同底线不要谈丢"
			summary="签约不是把模板填完，而是把身份、费用、押金、维修、转租、退租和违约责任写到能执行。凡是后面可能吵架的地方，都应该在付款前说清楚。"
			mantra="没写进合同或补充条款的承诺，后续很难当作稳定依据。"
			stats={[
				{ label: "核心条款", value: "6 类" },
				{ label: "证据材料", value: "5 件套" },
				{ label: "付款前", value: "先核验" },
			]}
			actions={[
				{
					title: "核身份",
					description: "身份证、房产证、授权和收款账户对齐。",
					icon: LockKeyhole,
				},
				{
					title: "列费用",
					description: "所有固定费用、可能费用和退租扣费一次写清。",
					icon: ReceiptText,
				},
				{
					title: "谈退租",
					description: "提前退租、转租、押金到账和验房标准都要落字。",
					icon: FileText,
				},
				{
					title: "留证据",
					description: "合同、转账、聊天、照片和视频统一保存。",
					icon: Camera,
				},
			]}
			next={nextNav.contract}
		>
			<section>
				<SectionHeader
					kicker="Contract essentials"
					title="合同重点看这四组"
					description="先核主体，再谈钱，最后把维修、退租和违约责任写成可执行条款。"
				/>
				<SectionGrid sections={sections} />
			</section>
			<section>
				<SectionHeader
					kicker="Clause matrix"
					title="高风险条款逐项落字"
					description="这里是签约前的最后检查表。发现空白或含糊，就先补条款再付款。"
				/>
				<Matrix rows={matrix} head={["条款", "应写清", "不要接受"]} />
			</section>
			<section>
				<SectionHeader
					kicker="Legal references"
					title="法律来源只做参考，个案以专业意见为准"
					description="页面只提供租房常见风险的阅读入口，不替代律师或主管部门对具体纠纷的判断。"
				/>
				<SourceCards />
			</section>
		</GuideShell>
	);
}

export function LivingGuidePage() {
	const sections: Section[] = [
		{
			title: "入住当天",
			kicker: "先验收再放松",
			icon: Home,
			tone: "green",
			points: [
				"全屋拍照或录像，重点记录破损、污渍、漏水、霉菌和家电状态。",
				"水表、电表、燃气表读数拍照，和房东或中介同步确认。",
				"清点钥匙、门禁卡、遥控器、网络账号、物业电话和维修联系人。",
				"发现问题当天形成文字记录，明确维修时间和责任方。",
			],
		},
		{
			title: "合租规则",
			kicker: "边界越早越好",
			icon: UsersRound,
			tone: "blue",
			points: [
				"入住前谈作息、卫生、访客、留宿、宠物、空调和公共费用分摊。",
				"公共区域用完就收，厨房和卫生间最好有轮值表。",
				"不要随意触碰室友物品，贵重物品自己保管。",
				"规则用群公告或共享文档留存，不要只靠口头默契。",
			],
		},
		{
			title: "日常维护",
			kicker: "区分自然损耗和人为损坏",
			icon: Wrench,
			tone: "amber",
			points: [
				"租客负责日常清洁、小件消耗品、轻微堵塞和合理保养。",
				"房东通常应负责房屋结构、基础设施和大型家电非人为损坏。",
				"报修先拍照，再电话加文字同步，约定响应时间。",
				"维修完成后再拍照确认，保留费用票据和聊天记录。",
			],
		},
		{
			title: "退租准备",
			kicker: "别等最后一天",
			icon: KeyRound,
			tone: "red",
			points: [
				"按合同提前通知房东，确认验房时间、清洁要求和押金到账时间。",
				"退租前再次系统拍照，和入住记录对照。",
				"自然老化、已报修问题和非人为损坏要拿出历史记录。",
				"钥匙、门禁、遥控器交还时保留交接记录。",
			],
		},
	];

	const matrix: MatrixRow[] = [
		{
			item: "邻里噪音",
			check: "先记录时间和声音来源，必要时友好沟通或找物业协调。",
			warning: "只在情绪上硬刚，没有记录，后续很难推进。",
		},
		{
			item: "室友矛盾",
			check: "围绕规则、事实和费用谈，避免把问题扩大成人身攻击。",
			warning: "没有公共规则，最后只能靠情绪和站队解决。",
		},
		{
			item: "房东关系",
			check: "按时付款，报修和费用争议都走文字确认。",
			warning: "只打电话不留痕，后续容易各说各话。",
		},
		{
			item: "居住改造",
			check: "贴纸、挂钩、换锁、添置大件前先看合同并征得同意。",
			warning: "自行改造导致退租时被扣押金。",
		},
	];

	return (
		<GuideShell
			badge="入住生活"
			title="入住只是开始，留痕才是保护"
			summary="入住后的重点是把验收、合租规则、报修流程和退租准备持续留在记录里。舒服的租房生活，不靠忍耐，也不靠事后争辩。"
			mantra="入住当天拍下来的东西，常常决定退租时能不能说清楚。"
			stats={[
				{ label: "入住记录", value: "当天做" },
				{ label: "报修方式", value: "图文留痕" },
				{ label: "退租准备", value: "提前做" },
			]}
			actions={[
				{
					title: "拍全屋",
					description: "入住状态、表读数、钥匙和家电都要留底。",
					icon: Camera,
				},
				{
					title: "定规则",
					description: "合租卫生、访客、空调和费用分摊提前谈。",
					icon: UsersRound,
				},
				{
					title: "报修留痕",
					description: "照片、文字、时间和维修结果都保存。",
					icon: Wrench,
				},
				{
					title: "退租复盘",
					description: "提前通知、清洁、拍照和交接记录不要漏。",
					icon: KeyRound,
				},
			]}
			next={nextNav.living}
		>
			<section>
				<SectionHeader
					kicker="Living system"
					title="入住后的四个管理动作"
					description="这些动作能减少押金、维修、合租和退租争议。"
				/>
				<SectionGrid sections={sections} />
			</section>
			<section>
				<SectionHeader
					kicker="Daily issues"
					title="常见生活问题怎么处理"
					description="先记录，再沟通；先按合同和规则推进，再考虑投诉或调解。"
				/>
				<Matrix rows={matrix} head={["问题", "建议处理", "风险做法"]} />
			</section>
			<RecordTemplate
				rows={[
					"入住日期：",
					"水表读数：",
					"电表读数：",
					"燃气读数：",
					"钥匙 / 门禁数量：",
					"待维修项目：",
					"物业电话：",
					"房东确认记录：",
				]}
			/>
		</GuideShell>
	);
}

export function TrapsGuidePage() {
	const scenarios: Scenario[] = [
		{
			title: "低价假房源",
			risk: "用明显低于市场价的房源吸引你到现场，再说刚租掉，转推更贵或更差的房子。",
			response: "提前查同小区价格，坚持只看目标房源；房号、价格和照片对不上就停止。",
			icon: ShieldAlert,
		},
		{
			title: "隐形收费",
			risk: "押一付一只是表面，后续追加服务费、清洁费、管理费、网络设备费。",
			response: "签约前让对方一次性列出所有费用，写进合同或补充条款。",
			icon: HandCoins,
		},
		{
			title: "假房东 / 二房东",
			risk: "冒充房东收定金或押金，或者二房东没有转租授权。",
			response: "核身份证、房产证、原合同和授权文件，收款账户最好与合同主体一致。",
			icon: LockKeyhole,
		},
		{
			title: "隔断间",
			risk: "客厅或房间被改成隔断，隔音差、消防风险高、公共空间缩水。",
			response: "敲墙、看户型、问同住人数，合同里写清房间性质和公共空间。",
			icon: DoorOpen,
		},
		{
			title: "甲醛 / 刚装修",
			risk: "首次出租或刚装修后快速出租，气味和空气质量风险更高。",
			response: "闻气味、看装修时间，必要时检测；合同里写明空气质量和处理方式。",
			icon: Sparkles,
		},
		{
			title: "退租扣押金",
			risk: "退租时临时说清洁费、折旧费、翻新费，或把自然老化当损坏。",
			response: "入住和退租都拍照，合同提前写清扣费标准和押金到账时间。",
			icon: ReceiptText,
		},
	];

	const sections: Section[] = [
		{
			title: "费用陷阱",
			kicker: "钱要一次说透",
			icon: Banknote,
			tone: "amber",
			points: [
				"商业水电按民用标准宣传，是最常见的低估成本方式。",
				"物业、网络、管理、清洁、维修、服务费不要等入住后才问。",
				"现金支付、私人账户收款、没有收据，都会削弱后续举证。",
				"押金退还条件不能写得过于笼统，例如只写“房屋完好”。",
			],
		},
		{
			title: "房屋陷阱",
			kicker: "好看不等于安全",
			icon: Home,
			tone: "red",
			points: [
				"隔断房、甲醛房、漏水房、返潮房和临街噪音房都不能只看装修。",
				"首次出租或刚装修完的房子，要额外关注气味和通风。",
				"老小区要看水压、电路、下水、门锁和楼道安全。",
				"历史纠纷、邻里噪音、治安问题很少会主动写在房源描述里。",
			],
		},
		{
			title: "话术陷阱",
			kicker: "催促就是风险信号",
			icon: MessageSquareText,
			tone: "blue",
			points: [
				"“今天不定就没了”常用于压缩你的核验时间。",
				"“合同都一样”不等于条款合理，越说不用看越要细看。",
				"“入住后再修”必须写明维修时间和违约处理。",
				"“口头答应都算数”不如一条补充条款有用。",
			],
		},
		{
			title: "防范动作",
			kicker: "冷静和留痕最有效",
			icon: ClipboardCheck,
			tone: "green",
			points: [
				"先查市场价，再谈房源，不被单套低价带节奏。",
				"只相信书面条款、转账记录和可核验文件。",
				"拍照、录视频、留聊天记录和付款凭证。",
				"发现对方拒绝核验、持续催款、回避合同，就暂停推进。",
			],
		},
	];

	return (
		<GuideShell
			badge="常见陷阱"
			title="先认识套路，现场才不会被带节奏"
			summary="租房陷阱通常不是单点出现，而是低价、催促、含糊合同和不留证据一起出现。你要做的是把每个风险信号转成核验动作。"
			mantra="便宜得不合理、催得很急、写得很含糊，这三件事一起出现就要停。"
			stats={[
				{ label: "高频风险", value: "6 类" },
				{ label: "核心动作", value: "核验" },
				{ label: "底线原则", value: "留痕" },
			]}
			actions={[
				{
					title: "查市场价",
					description: "低价不是福利，先找同小区同户型对比。",
					icon: Eye,
				},
				{
					title: "核身份",
					description: "房东、二房东、中介和授权文件要对齐。",
					icon: LockKeyhole,
				},
				{
					title: "拒催款",
					description: "没有看房、合同和身份核验前不要付款。",
					icon: Siren,
				},
				{
					title: "留证据",
					description: "聊天、照片、转账和合同要能串成证据链。",
					icon: Camera,
				},
			]}
			next={nextNav.traps}
		>
			<section>
				<SectionHeader
					kicker="Risk playbook"
					title="六类高频坑位"
					description="每个坑位都按“风险是什么、现场怎么应对”来读。"
				/>
				<ScenarioGrid scenarios={scenarios} />
			</section>
			<section>
				<SectionHeader
					kicker="Defense system"
					title="把陷阱转成防范动作"
					description="这不是恐吓清单，而是筛房、看房、签约时的判断标准。"
				/>
				<SectionGrid sections={sections} />
			</section>
		</GuideShell>
	);
}

export function RightsGuidePage() {
	const sections: Section[] = [
		{
			title: "先固定证据",
			kicker: "别只留下情绪",
			icon: Camera,
			tone: "green",
			points: [
				"保存合同、补充条款、收据、转账凭证、聊天记录和通话录音。",
				"拍现场照片和视频，包含时间、位置、问题细节和影响范围。",
				"整理报修、催告、对方回复、维修结果和费用票据。",
				"必要时记录证人联系方式，例如室友、邻居、物业或维修人员。",
			],
		},
		{
			title: "先协商",
			kicker: "诉求要具体",
			icon: MessageSquareText,
			tone: "blue",
			points: [
				"用文字说明事实、证据、诉求和希望对方回复的截止时间。",
				"诉求要可执行，例如退还押金、维修、减免租金、解除合同。",
				"每次沟通后做文字确认，避免只停留在电话里。",
				"协商不是忍让，重点是让对方知道你有证据、有边界。",
			],
		},
		{
			title: "再找第三方",
			kicker: "渠道按问题分流",
			icon: Building2,
			tone: "amber",
			points: [
				"房屋质量、租赁备案、违规出租可咨询住建或房管相关渠道。",
				"中介违规、虚假宣传、收费争议可考虑市场监管、12315 或消协。",
				"邻里、社区、物业矛盾可先找物业、社区、街道调解。",
				"明显人身安全、威胁、盗窃、暴力等问题直接报警。",
			],
		},
		{
			title: "最后评估法律路径",
			kicker: "算成本，也看证据",
			icon: Scale,
			tone: "red",
			points: [
				"整理完整证据链，再咨询法律援助、律师或相关主管部门。",
				"评估金额、时间、执行难度和对生活工作的影响。",
				"小额纠纷通常先协商、调解、投诉，必要时再考虑诉讼。",
				"页面不替代法律意见，具体案件以专业判断和当地规则为准。",
			],
		},
	];

	const matrix: MatrixRow[] = [
		{
			item: "押金不退",
			check: "拿出合同、付款凭证、入住/退租照片、清洁记录和交接记录。",
			warning: "没有押金条款、没有房屋现状记录，只能口头争辩。",
		},
		{
			item: "维修拖延",
			check: "保留报修时间、问题照片、影响范围、对方回复和催告记录。",
			warning: "只打电话催，没有文字或图片记录。",
		},
		{
			item: "中介收费",
			check: "保留收费说明、聊天承诺、发票或收据和平台页面截图。",
			warning: "费用口径前后不一致，但没有留下原始页面或聊天。",
		},
		{
			item: "安全问题",
			check: "记录人身威胁、门锁异常、闯入、盗窃等事实，必要时报警。",
			warning: "继续私下拉扯，导致风险扩大或证据灭失。",
		},
	];

	return (
		<GuideShell
			badge="维权指南"
			title="先留证，再推进；先分流，再升级"
			summary="真出问题时，最重要的不是情绪表达，而是把事实、证据、诉求和渠道整理清楚。多数纠纷先走协商和调解，涉及安全或违法风险时直接升级。"
			mantra="证据链越完整，协商、投诉和调解越有推进力。"
			stats={[
				{ label: "证据优先", value: "第一步" },
				{ label: "处理路径", value: "4 层" },
				{ label: "安全问题", value: "先报警" },
			]}
			actions={[
				{
					title: "整理证据包",
					description: "合同、转账、聊天、照片、视频和票据统一归档。",
					icon: FileCheck2,
				},
				{
					title: "写清诉求",
					description: "退款、维修、解约、赔偿要明确金额和期限。",
					icon: MessageSquareText,
				},
				{
					title: "渠道分流",
					description: "按房屋、中介、社区、安全问题选择不同渠道。",
					icon: Building2,
				},
				{
					title: "评估升级",
					description: "金额、时间和证据足够时，再考虑法律路径。",
					icon: Scale,
				},
			]}
			next={nextNav.rights}
		>
			<section>
				<SectionHeader
					kicker="Dispute flow"
					title="纠纷处理四步走"
					description="不要一上来就跳到最后一步，先把证据和诉求整理好。"
				/>
				<SectionGrid sections={sections} />
			</section>
			<section>
				<SectionHeader
					kicker="Evidence matrix"
					title="不同问题需要不同证据"
					description="证据不是越多越好，而是要能证明事实、责任和损失。"
				/>
				<Matrix rows={matrix} head={["问题", "优先证据", "证据缺口"]} />
			</section>
			<section>
				<SectionHeader
					kicker="References"
					title="先看规则，再判断下一步"
					description="这些链接用于建立基础规则认知，具体争议仍建议咨询当地主管部门或专业人士。"
				/>
				<SourceCards />
			</section>
		</GuideShell>
	);
}
