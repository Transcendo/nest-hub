import {
	Building2,
	Database,
	ExternalLink,
	MapPinned,
	Route,
} from "lucide-react";
import Link from "next/link";
import { publicAsset } from "@/lib/public-asset";

const companyIcons: Record<string, string> = {
	"阿里巴巴": publicAsset("/company-icons/alibaba.svg"),
	"七牛云": publicAsset("/company-icons/qiniu.svg"),
	"阅文集团": publicAsset("/company-icons/yuewen.svg"),
	"哔哩哔哩": publicAsset("/company-icons/bilibili.svg"),
	"得物": publicAsset("/company-icons/dewu.svg"),
	"UCloud 优刻得": publicAsset("/company-icons/ucloud.svg"),
	"字节跳动": publicAsset("/company-icons/bytedance.svg"),
	"拼多多 / PDD": publicAsset("/company-icons/pdd.svg"),
	"携程 / Trip.com Group": publicAsset("/company-icons/trip-com.svg"),
	"腾讯": publicAsset("/company-icons/tencent.svg"),
	"米哈游": publicAsset("/company-icons/mihoyo.svg"),
	"商汤科技": publicAsset("/company-icons/sensetime.svg"),
	"游族网络": publicAsset("/company-icons/yoozoo.svg"),
	"小红书": publicAsset("/company-icons/xiaohongshu.svg"),
	"喜马拉雅": publicAsset("/company-icons/ximalaya.svg"),
	"巨人网络": publicAsset("/company-icons/giant-network.svg"),
	"莉莉丝游戏": publicAsset("/company-icons/lilith-games.svg"),
	"饿了么 / 拉扎斯": publicAsset("/company-icons/eleme.svg"),
};

const entryIcons: Record<string, string> = {
	"复旦大学江湾校区": publicAsset("/branding/fdu-logo.svg"),
	"阿里巴巴上海": publicAsset("/company-icons/alibaba.svg"),
};

const iconForCompany = (name: string) => companyIcons[name];

const CompanyIcon = ({ name }: { name: string }) => {
	const icon = iconForCompany(name);
	return icon ? (
		<img
			src={icon}
			alt=""
			aria-hidden="true"
			className="size-7 shrink-0 rounded-md border border-zinc-200 bg-white object-contain p-1 dark:border-zinc-700 dark:bg-zinc-900"
		/>
	) : null;
};

const collectedCompanies = [
	{ name: "阿里巴巴", href: "/docs/shanghai/alibaba-renting-guide" },
	{ name: "七牛云", href: "/docs/shanghai/qiniu-renting-guide" },
	{ name: "阅文集团", href: "/docs/shanghai/yuewen-renting-guide" },
	{ name: "哔哩哔哩", href: "/docs/shanghai/bilibili-renting-guide" },
	{ name: "得物", href: "/docs/shanghai/dewu-renting-guide" },
	{ name: "UCloud 优刻得", href: "/docs/shanghai/ucloud-renting-guide" },
	{ name: "字节跳动", href: "/docs/shanghai/bytedance-renting-guide" },
	{ name: "拼多多 / PDD", href: "/docs/shanghai/pdd-renting-guide" },
	{ name: "携程 / Trip.com Group", href: "/docs/shanghai/trip-com-renting-guide" },
	{ name: "腾讯", href: "/docs/shanghai/tencent-renting-guide" },
	{ name: "米哈游", href: "/docs/shanghai/mihoyo-renting-guide" },
	{ name: "商汤科技", href: "/docs/shanghai/sensetime-renting-guide" },
	{ name: "游族网络", href: "/docs/shanghai/yoozoo-renting-guide" },
	{ name: "小红书", href: "/docs/shanghai/xiaohongshu-renting-guide" },
	{ name: "喜马拉雅", href: "/docs/shanghai/ximalaya-renting-guide" },
	{ name: "巨人网络", href: "/docs/shanghai/giant-network-renting-guide" },
	{ name: "莉莉丝游戏", href: "/docs/shanghai/lilith-games-renting-guide" },
	{ name: "饿了么 / 拉扎斯", href: "/docs/shanghai/eleme-renting-guide" },
];

const contentEntries = [
	{
		name: "复旦大学江湾校区",
		href: "/docs/shanghai/fudan-jiangwan-campus-renting-guide",
		description: "高校/研究生租房入口：新江湾城、三门路、五角场、中原。",
	},
	{
		name: "阿里巴巴上海",
		href: "/docs/shanghai/alibaba-renting-guide",
		description: "互联网公司租房入口：张江高科、广兰路、唐镇、金科路。",
	},
];

const ecosystemRows = [
	{
		company: "阿里巴巴",
		status: "已收录",
		shanghaiRole: "上海主要办公区",
		area: "浦东张江 / 金科路",
		track: "电商、云、本地生活",
		mapLogic: "张江通勤带，优先看 2/13 号线、班车、广兰路和唐镇外扩。",
		href: "/docs/shanghai/alibaba-renting-guide",
		source: "https://www.alibabagroup.com/",
	},
	{
		company: "拼多多 / PDD",
		status: "已收录",
		shanghaiRole: "上海总部 / principal executive offices",
		area: "长宁娄山关路 / 金虹桥",
		track: "电商、农业、跨境电商",
		mapLogic: "长宁内环通勤，优先看娄山关路、古北、天山、威宁路、北新泾。",

		href: "/docs/shanghai/pdd-renting-guide",
		source: "https://investor.pddholdings.com/static-files/fd20e450-1dfb-416d-b39d-784b071f6bd6",
	},
	{
		company: "哔哩哔哩",
		status: "已收录",
		shanghaiRole: "上海总部",
		area: "杨浦五角场 / 政立路国正中心",
		track: "视频社区、游戏、直播",
		mapLogic: "五角场和新江湾通勤带，和复旦江湾/杨浦滨江租房逻辑部分重叠。",

		href: "/docs/shanghai/bilibili-renting-guide",
		source: "https://ir.bilibili.com/en/investor-resources/",
	},
	{
		company: "小红书",
		status: "已收录",
		shanghaiRole: "上海总部",
		area: "黄浦新天地 / SOHO 复兴广场",
		track: "生活方式社区、电商、广告",
		mapLogic: "市中心通勤，优先看 9/10/13 号线和夜间回家路线，预算压力高。",

		href: "/docs/shanghai/xiaohongshu-renting-guide",
		source: "https://www.xiaohongshu.com/contact",
	},
	{
		company: "携程 / Trip.com Group",
		status: "已收录",
		shanghaiRole: "上海总部 / principal executive offices",
		area: "长宁凌空 SOHO / 金钟路",
		track: "在线旅游、商旅、本地服务",
		mapLogic: "长宁西部通勤，优先看淞虹路、北新泾、天山西路和 2 号线西段。",

		href: "/docs/shanghai/trip-com-renting-guide",
		source: "https://investors.trip.com/static-files/08bd6175-f635-419c-9b88-f9f4eefe79ff",
	},
	{
		company: "字节跳动",
		status: "已收录",
		shanghaiRole: "上海主要办公区",
		area: "闵行科技绿洲 / 杨浦尚浦领世",
		track: "内容平台、广告、AI、效率工具",
		mapLogic: "多办公点，必须先确认团队楼栋；闵行看 9/12 号线，杨浦看 10 号线/新江湾。",

		href: "/docs/shanghai/bytedance-renting-guide",
		source: "https://www.shyp.gov.cn/shypq/yshj-gzdt/20210318/376645.html",
	},
	{
		company: "腾讯",
		status: "已收录",
		shanghaiRole: "华东总部 / 上海主要办公区",
		area: "徐汇滨江 / 漕河泾",
		track: "社交、游戏、广告、云、AI",
		mapLogic: "徐汇滨江和漕河泾两套通勤逻辑，先确认是龙爱路滨江还是虹梅路/漕河泾。",

		href: "/docs/shanghai/tencent-renting-guide",
		source: "https://map.baidu.com/place/130db0493d992b5ef8221385",
	},
	{
		company: "饿了么 / 拉扎斯",
		status: "已收录",
		shanghaiRole: "上海运营主体",
		area: "普陀 / 阿里本地生活办公区",
		track: "即时零售、外卖、本地生活",
		mapLogic: "普陀通勤更看 7/13/15 号线和内环高架周边居住区，别直接套张江逻辑。",

		href: "/docs/shanghai/eleme-renting-guide",
		source: "https://www.shpt.gov.cn/qyzs-yinshang/20231013/919722.html",
	},
	{
		company: "得物",
		status: "已收录",
		shanghaiRole: "上海总部 / 运营主体",
		area: "杨浦黄兴路 / 互联宝地",
		track: "潮流电商、鉴别、社区",
		mapLogic: "杨浦滨江/大桥通勤，优先看黄兴路、江浦路、鞍山新村、控江路。",

		href: "/docs/shanghai/dewu-renting-guide",
		source: "https://www.dewucdn.com/about.html",
	},
	{
		company: "米哈游",
		status: "已收录",
		shanghaiRole: "上海总部 / 研发办公区",
		area: "徐汇漕河泾 / 光启园",
		track: "游戏、二次元内容、全球发行",
		mapLogic: "徐汇漕河泾通勤，优先看桂林路、漕宝路、田林、宜山路和徐汇中环外扩。",

		href: "/docs/shanghai/mihoyo-renting-guide",
		source: "https://shnie.org.cn/web/member/detail/id/116.html",
	},
	{
		company: "莉莉丝游戏",
		status: "已收录",
		shanghaiRole: "上海总部 / 公开注册口径",
		area: "嘉定银翔路 / 南翔",
		track: "游戏研发、全球发行",
		mapLogic: "嘉定/南翔通勤，和市中心互联网公司完全不同，要先确认实际办公点和班车。",

		href: "/docs/shanghai/lilith-games-renting-guide",
		source: "https://www.lilith.com/corporate_responsibility/3/?locale=zh_CN",
	},
	{
		company: "游族网络",
		status: "已收录",
		shanghaiRole: "上海总部",
		area: "徐汇宜山路 / 华鑫商务中心",
		track: "游戏研发、全球发行",
		mapLogic: "徐汇内中环通勤，宜山路、桂林路、漕宝路、田林都能作为租房候选。",

		href: "/docs/shanghai/yoozoo-renting-guide",
		source: "https://www.yoozoo.com/connect",
	},
	{
		company: "巨人网络",
		status: "已收录",
		shanghaiRole: "上海总部",
		area: "松江新城 / 巨人园区",
		track: "游戏研发、发行",
		mapLogic: "松江是独立通勤题，优先看 9 号线、园区班车和自驾，不要按徐汇租房半径估算。",

		href: "/docs/shanghai/giant-network-renting-guide",
		source: "https://www.ztgame.com/contact.html",
	},
	{
		company: "阅文集团",
		status: "已收录",
		shanghaiRole: "上海总部",
		area: "浦东陆家嘴滨江中心",
		track: "数字阅读、IP、网文生态",
		mapLogic: "陆家嘴/滨江通勤，预算压力高，可向杨浦滨江、塘桥、世纪大道和 4/14 号线外扩。",

		href: "/docs/shanghai/yuewen-renting-guide",
		source: "https://www.yuewen.com/contact",
	},
	{
		company: "喜马拉雅",
		status: "已收录",
		shanghaiRole: "上海总部 / 主要办公区",
		area: "静安汶水路 / 静安国际科创社区",
		track: "在线音频、内容平台",
		mapLogic: "静安北部通勤，优先看 1 号线汶水路、彭浦、延长路、大宁和广中路。",

		href: "/docs/shanghai/ximalaya-renting-guide",
		source: "https://www.ximalaya.com/more/aboutus/",
	},
	{
		company: "商汤科技",
		status: "已收录",
		shanghaiRole: "中国总部 / 全球研发总部",
		area: "徐汇漕河泾 / 虹梅路商汤科技大厦",
		track: "AI、计算机视觉、大模型、智能汽车",
		mapLogic: "漕河泾 AI 通勤带，和米哈游、腾讯漕河泾、游族可共用租房判断。",

		href: "/docs/shanghai/sensetime-renting-guide",
		source: "https://www.sensetime.com/cn/news-detail/841?categoryId=72",
	},
	{
		company: "UCloud 优刻得",
		status: "已收录",
		shanghaiRole: "上海总公司",
		area: "杨浦隆昌路 / 城市概念园区",
		track: "云计算、基础设施、政企服务",
		mapLogic: "杨浦东部通勤，优先看隆昌路、周家嘴路、黄兴公园、内江路和 12/18 号线。",

		href: "/docs/shanghai/ucloud-renting-guide",
		source: "https://www.ucloud.cn/site/about/contact/",
	},
	{
		company: "七牛云",
		status: "已收录",
		shanghaiRole: "上海总部",
		area: "浦东张江 / 亮秀路",
		track: "云服务、音视频云、AI",
		mapLogic: "张江东区通勤，和阿里张江、喜马拉雅旧址、人工智能岛一带可共用居住池。",

		href: "/docs/shanghai/qiniu-renting-guide",
		source: "https://www.qiniu.com/company",
	},
];

const mapMarkers = [
	{ label: "阿里", detail: "张江 / 金科路", x: 72, y: 48, status: "已收录" },
	{ label: "七牛", detail: "张江 / 亮秀路", x: 75, y: 50, status: "已收录" },
	{ label: "阅文", detail: "陆家嘴滨江", x: 61, y: 48, status: "已收录" },
	{ label: "B站", detail: "五角场", x: 58, y: 33, status: "已收录" },
	{ label: "得物", detail: "黄兴路", x: 56, y: 40, status: "已收录" },
	{ label: "UCloud", detail: "隆昌路", x: 58, y: 42, status: "已收录" },
	{ label: "字节", detail: "杨浦 / 闵行", x: 53, y: 35, status: "已收录" },
	{ label: "PDD", detail: "娄山关路", x: 38, y: 48, status: "已收录" },
	{ label: "携程", detail: "凌空 SOHO", x: 30, y: 45, status: "已收录" },
	{ label: "小红书", detail: "新天地", x: 51, y: 54, status: "已收录" },
	{ label: "饿了么", detail: "普陀", x: 48, y: 39, status: "已收录" },
	{ label: "腾讯", detail: "徐汇滨江", x: 47, y: 61, status: "已收录" },
	{ label: "米哈游", detail: "漕河泾", x: 40, y: 62, status: "已收录" },
	{ label: "商汤", detail: "虹梅路", x: 39, y: 60, status: "已收录" },
	{ label: "游族", detail: "宜山路", x: 42, y: 59, status: "已收录" },
	{ label: "喜马拉雅", detail: "汶水路", x: 47, y: 31, status: "已收录" },
	{ label: "巨人", detail: "松江", x: 20, y: 72, status: "已收录" },
	{ label: "莉莉丝", detail: "南翔 / 嘉定", x: 25, y: 28, status: "已收录" },
];

const commuteBelts = [
	{
		name: "张江 / 浦东科技带",
		companies: "阿里、七牛云、张江 AI / 云服务公司",
		areas: "张江高科、广兰路、金科路、唐镇、孙桥、花木",
		warning: "2 号线早高峰很硬，班车和最后 1 公里决定体感。",
	},
	{
		name: "杨浦 / 五角场 / 新江湾",
		companies: "哔哩哔哩、得物、UCloud、字节杨浦办公点",
		areas: "五角场、三门路、新江湾城、江湾镇、黄兴路、鞍山新村",
		warning: "高校、社区和办公混合，租房要区分复旦圈、五角场圈和杨浦滨江圈。",
	},
	{
		name: "长宁 / 虹桥 / 凌空 SOHO",
		companies: "拼多多、携程",
		areas: "娄山关路、天山、古北、威宁路、北新泾、淞虹路",
		warning: "内环和 2 号线溢价明显，低预算要向北新泾、淞虹路外扩。",
	},
	{
		name: "徐汇 / 漕河泾 / 西岸",
		companies: "腾讯、米哈游、商汤、游族、部分字节办公点",
		areas: "漕河泾、桂林路、田林、宜山路、龙华、徐汇滨江、梅陇",
		warning: "公司密集但租金不低，漕河泾和西岸不是同一个通勤题。",
	},
	{
		name: "黄浦 / 静安 / 市中心",
		companies: "小红书、喜马拉雅、部分内容/消费互联网公司",
		areas: "新天地、打浦桥、南京西路、汶水路、大宁、延长路",
		warning: "市中心方便但贵，老房、商住、噪音和停车问题更常见。",
	},
	{
		name: "外圈园区",
		companies: "巨人网络、莉莉丝等游戏公司",
		areas: "松江新城、南翔、嘉定新城、九亭、泗泾",
		warning: "必须先问班车/自驾/地铁末端接驳，别用市区距离感判断。",
	},
];

const sourceBackedDate = "2026-04-28";

export function ShanghaiOverview() {
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
								上海互联网公司与租房地图入口
							</div>
							<div className="space-y-3">
								<h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
									先判断通勤带，再进入公司指南
								</h2>
								<p className="max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
									上海互联网公司不是只在张江：杨浦五角场、长宁虹桥、徐汇漕河泾、黄浦新天地、静安大宁、松江/嘉定外圈都有强办公点。先确认公司楼栋和线路，再决定住近场、地铁沿线还是外扩预算圈。
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
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.22),transparent_32%),radial-gradient(circle_at_70%_45%,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_45%_75%,rgba(245,158,11,0.16),transparent_30%)]" />
						<div className="relative flex h-full min-h-[300px] flex-col justify-between p-6">
							<div className="grid grid-cols-2 gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-300">
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">张江 / 浦东</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">杨浦 / 五角场</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">长宁 / 虹桥</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">徐汇 / 漕河泾</span>
							</div>
							<div className="rounded-xl border border-zinc-200 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/75">
								<div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
									上海租房的核心不是“离市中心多近”
								</div>
								<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
									张江、漕河泾、五角场、凌空 SOHO、松江园区的通勤逻辑完全不同。先用地图判断方向，再看房源。
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
								上海互联网办公区示意图
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
							aria-label="上海互联网办公区示意地图"
						>
							<rect width="100" height="62.5" fill="currentColor" opacity="0" />
							<path d="M8 45 C22 39, 35 42, 50 50 C65 58, 80 54, 92 48" fill="none" stroke="#0f766e" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
							<path d="M24 20 C36 29, 49 35, 70 47" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" opacity="0.45" />
							<path d="M50 12 C48 27, 47 43, 47 58" fill="none" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
							<ellipse cx="51" cy="48" rx="13" ry="8" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.18" />
							<ellipse cx="55" cy="43" rx="30" ry="20" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.12" />
							<text x="54" y="50" textAnchor="middle" className="fill-zinc-500 text-[3px] font-semibold dark:fill-zinc-400">中心城区</text>
							<text x="74" y="43" textAnchor="middle" className="fill-teal-700 text-[2.4px] font-semibold dark:fill-teal-300">张江</text>
							<text x="56" y="29" textAnchor="middle" className="fill-teal-700 text-[2.4px] font-semibold dark:fill-teal-300">杨浦</text>
							<text x="33" y="41" textAnchor="middle" className="fill-teal-700 text-[2.4px] font-semibold dark:fill-teal-300">长宁</text>
							<text x="40" y="67%" textAnchor="middle" className="fill-teal-700 text-[2.4px] font-semibold dark:fill-teal-300">徐汇</text>
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
						已完成 {collectedCount} 个上海公司指南；上海生态样本先扩展为 {ecosystemRows.length} 家，后续可继续按片区扩展更多公司。
					</p>
					<div className="mt-4 grid gap-2">
						{collectedCompanies.map((company) => (
							<Link
								key={company.name}
								href={company.href}
								className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 transition-colors hover:border-teal-600 hover:text-teal-800 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
							>
								<span className="flex min-w-0 items-center gap-2">
									<CompanyIcon name={company.name} />
									<span className="truncate">{company.name}</span>
								</span>
								<span className="shrink-0 text-xs text-zinc-500">进入指南</span>
							</Link>
						))}
					</div>
					<div className="mt-5 border-t border-zinc-100 pt-4 dark:border-zinc-800">
						<div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">已有上海入口</div>
						<div className="mt-3 grid gap-2">
							{contentEntries.map((entry) => (
								<Link
									key={entry.name}
									href={entry.href}
									className="flex gap-3 rounded-lg border border-zinc-200 px-3 py-2 transition-colors hover:border-teal-600 dark:border-zinc-800 dark:hover:border-teal-300"
								>
									{entryIcons[entry.name] ? (
										<img
											src={entryIcons[entry.name]}
											alt=""
											aria-hidden="true"
											className="size-7 shrink-0 rounded-md border border-zinc-200 bg-white object-contain p-1 dark:border-zinc-700 dark:bg-zinc-900"
										/>
									) : null}
									<span className="min-w-0">
										<div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{entry.name}</div>
										<div className="mt-1 text-xs leading-5 text-zinc-500">{entry.description}</div>
									</span>
								</Link>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<div className="mb-4 flex items-start justify-between gap-3">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
							<Route className="size-4 text-teal-700 dark:text-teal-300" />
							上海核心通勤带
						</div>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							同一城市里，张江、五角场、长宁、漕河泾、松江的租房策略完全不同。先按办公区归类，再看预算。
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
							上海互联网公司生态信息表
						</div>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							数据口径：优先使用官网、投资者关系页、年报、政府公开信息和地图公开信息核验上海总部或主要办公地；当前生态样本中的公司均已形成独立租房指南。
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
								<th className="px-3 py-3">上海定位</th>
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
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">{row.shanghaiRole}</td>
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
