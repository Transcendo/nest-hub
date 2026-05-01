import {
	Building2,
	Database,
	ExternalLink,
	MapPinned,
	Route,
} from "lucide-react";

const ecosystemRows = [
	{
		company: "腾讯",
		status: "已拆分",
		guideHref: "/docs/shenzhen/tencent-renting-guide",
		shenzhenRole: "深圳总部 / 社交、游戏、云与金融科技核心公司",
		area: "南山科技园 / 深圳湾总部带",
		track: "社交、游戏、云计算、金融科技、AI",
		mapLogic: "腾讯深圳租房先按南山科技园 / 深圳湾总部带处理，楼栋确认比公司名更重要。入职前仍要确认具体楼栋。",
		source: "https://www.tencent.com.cn/zh-cn/about.html",
	},
	{
		company: "华为",
		status: "已拆分",
		guideHref: "/docs/shenzhen/huawei-renting-guide",
		shenzhenRole: "深圳龙岗坂田基地 / 全球 ICT 与终端研发核心",
		area: "龙岗坂田 / 华为基地",
		track: "通信设备、云、终端、汽车智能化、AI",
		mapLogic: "华为深圳租房不要套南山经验，先按坂田独立通勤市场处理。班车点、地铁 5/10 号线和最后一公里比“深圳均价”更重要。入职前仍要确认具体楼栋。",
		source: "https://www.huawei.com/en/contact-us?tab=Offices",
	},
	{
		company: "大疆 DJI",
		status: "已拆分",
		guideHref: "/docs/shenzhen/dji-renting-guide",
		shenzhenRole: "全球总部 / 空间智能与影像硬件代表",
		area: "南山西丽 / 大疆天空之城",
		track: "无人机、机器人、影像硬件、空间智能",
		mapLogic: "大疆租房核心是西丽和留仙洞通勤，不是后海深圳湾。先测坡路、骑行、公交接驳和晚归，再谈住近还是住远。入职前仍要确认具体楼栋。",
		source: "https://www.dji.com/cn/newsroom/news/dji-skycity-officially-launch",
	},
	{
		company: "比亚迪 BYD",
		status: "已拆分",
		guideHref: "/docs/shenzhen/byd-renting-guide",
		shenzhenRole: "深圳总部 / 新能源车与电池龙头",
		area: "坪山 / 比亚迪园区",
		track: "新能源汽车、电池、电子、轨道交通",
		mapLogic: "比亚迪坪山岗位和南山完全不是一个租房市场。优先确认园区、班车和上下班时段，再看坪山中心、坑梓、龙岗东部。入职前仍要确认具体楼栋。",
		source: "https://www.bydglobal.com/sites/Satellite?pagename=BYD_EN%2FPage%2FBYD_ENBydArticle%2FInvestService",
	},
	{
		company: "中兴通讯 ZTE",
		status: "已拆分",
		guideHref: "/docs/shenzhen/zte-renting-guide",
		shenzhenRole: "深圳总部 / 通信设备与 ICT 公司",
		area: "南山科技园 / 科技南路中兴通讯大厦",
		track: "通信设备、运营商网络、终端、企业 ICT",
		mapLogic: "中兴通讯深圳租房按科技园南区判断，适合和腾讯、迈瑞、金蝶、创维的南山通勤半径一起比较。入职前仍要确认具体楼栋。",
		source: "https://www.zte.com.cn/content/zte-site/www-zte-com-cn/global/about/corporate_information.html",
	},
	{
		company: "迈瑞医疗",
		status: "已拆分",
		guideHref: "/docs/shenzhen/mindray-renting-guide",
		shenzhenRole: "深圳总部 / 医疗器械龙头",
		area: "南山高新区 / 科技十二路迈瑞大厦",
		track: "医疗设备、生命信息、体外诊断、医学影像",
		mapLogic: "迈瑞医疗深圳租房先按南山高新区处理。医学设备公司作息可能和互联网不同，但通勤坑一样：楼栋入口、晚归路线和费用结构要核死。入职前仍要确认具体楼栋。",
		source: "https://www.mindray.com/en/contact",
	},
	{
		company: "顺丰控股",
		status: "已拆分",
		guideHref: "/docs/shenzhen/sf-express-renting-guide",
		shenzhenRole: "深圳总部 / 物流科技与供应链公司",
		area: "南山科技园 / 总部办公点，宝安福永等物流基地另核",
		track: "快递物流、供应链、航空货运、同城配送",
		mapLogic: "顺丰深圳岗位必须先分清总部办公、科技岗、运营岗和物流基地。别拿南山总部口径去套宝安/机场/福永岗位。入职前仍要确认具体楼栋。",
		source: "https://ir.sf-express.com/media/v0bnjot2/2024-annual-report-e.pdf",
	},
	{
		company: "金蝶",
		status: "已拆分",
		guideHref: "/docs/shenzhen/kingdee-renting-guide",
		shenzhenRole: "深圳总部 / 企业管理软件与云服务公司",
		area: "南山科技园 / 金蝶软件园",
		track: "ERP、企业 SaaS、财务云、产业软件",
		mapLogic: "金蝶深圳租房按科技园软件园口径处理。预算紧张时别死磕近场，西丽和宝安外扩可能更稳。入职前仍要确认具体楼栋。",
		source: "https://investor.kingdee.com/en/contact-us/",
	},
	{
		company: "深信服",
		status: "已拆分",
		guideHref: "/docs/shenzhen/sangfor-renting-guide",
		shenzhenRole: "深圳总部 / 网络安全与云基础设施公司",
		area: "南山西丽 / 仙洞路深信服科技大厦",
		track: "网络安全、云计算、基础设施软件",
		mapLogic: "深信服租房要按西丽 / 留仙洞处理。不要被“南山”两个字骗到后海预算，最后一公里和坡路体感才是关键。入职前仍要确认具体楼栋。",
		source: "https://www.sangfor.com.cn/about-us/contact/branchzongbu",
	},
	{
		company: "传音控股",
		status: "已拆分",
		guideHref: "/docs/shenzhen/transsion-renting-guide",
		shenzhenRole: "深圳总部 / 新兴市场智能终端公司",
		area: "南山留仙洞总部基地 / T33 大厦",
		track: "手机终端、IoT、移动互联网服务",
		mapLogic: "传音深圳租房更接近留仙洞 / 西丽逻辑，不要直接按深圳湾或后海价格想象。入职前仍要确认具体楼栋。",
		source: "https://www.transsion.com/en/concern",
	},
	{
		company: "影石 Insta360",
		status: "已拆分",
		guideHref: "/docs/shenzhen/insta360-renting-guide",
		shenzhenRole: "深圳总部 / 运动影像与全景相机公司",
		area: "前海 / 恒裕前海金融中心",
		track: "智能影像、运动相机、AI 影像工具",
		mapLogic: "影石深圳租房先按前海判断。前海不是科技园，地铁线、跨区拥堵和南山西部/宝安中心的取舍要单独算。入职前仍要确认具体楼栋。",
		source: "https://www.insta360.com/cn/contact",
	},
	{
		company: "优必选 UBTECH",
		status: "已拆分",
		guideHref: "/docs/shenzhen/ubtech-renting-guide",
		shenzhenRole: "深圳总部 / 人形机器人与服务机器人公司",
		area: "南山智园 / 西丽大学城片区",
		track: "人形机器人、AI 教育、服务机器人",
		mapLogic: "优必选租房核心是南山智园和西丽大学城，不是深圳湾。研发园区的最后一公里和夜路要实测。入职前仍要确认具体楼栋。",
		source: "https://www.ubtrobot.com/en/about/companyProfile",
	},
	{
		company: "速腾聚创 RoboSense",
		status: "已拆分",
		guideHref: "/docs/shenzhen/robosense-renting-guide",
		shenzhenRole: "深圳总部 / 激光雷达与机器人感知公司",
		area: "南山桃源 / 留仙大道红花岭工业区",
		track: "激光雷达、自动驾驶、机器人感知",
		mapLogic: "速腾聚创租房要优先算桃源/留仙大道的接驳，而不是拿南山平均通勤做判断。入职前仍要确认具体楼栋。",
		source: "https://www.robosense.ai/contact",
	},
	{
		company: "荣耀 HONOR",
		status: "已拆分",
		guideHref: "/docs/shenzhen/honor-renting-guide",
		shenzhenRole: "深圳终端公司 / 消费电子与 AI 终端",
		area: "深圳办公点需按团队楼栋复核",
		track: "智能手机、终端系统、IoT、AI 终端",
		mapLogic: "荣耀深圳租房不要只靠“深圳总部”四个字。先确认团队楼栋，再决定是按南山、福田、坂田还是其他办公带找房。入职前仍要确认具体楼栋。",
		source: "https://www.honor.com/cn/contact-us",
	},
	{
		company: "微众银行 WeBank",
		status: "已拆分",
		guideHref: "/docs/shenzhen/webank-renting-guide",
		shenzhenRole: "深圳前海民营银行 / 金融科技样本",
		area: "深圳湾科技生态园 / 南山沙河西路",
		track: "互联网银行、金融科技、AI 风控",
		mapLogic: "微众银行租房按深圳湾科技生态园处理，介于高新园、白石洲和后海之间，不能只看直线距离。入职前仍要确认具体楼栋。",
		source: "https://res.webank.com/",
	},
	{
		company: "平安集团",
		status: "已拆分",
		guideHref: "/docs/shenzhen/pingan-renting-guide",
		shenzhenRole: "深圳总部 / 金融、保险与金融科技集团",
		area: "福田 CBD / 平安金融中心",
		track: "保险、银行、资管、医疗健康、金融科技",
		mapLogic: "平安深圳租房先按福田 CBD 判断。福田强在换乘，但品质整租贵；预算紧就看梅林、莲花北、龙华线。入职前仍要确认具体楼栋。",
		source: "https://group.pingan.com/about_us/governance.html",
	},
	{
		company: "招商银行",
		status: "已拆分",
		guideHref: "/docs/shenzhen/cmb-renting-guide",
		shenzhenRole: "深圳总部 / 零售银行与金融科技样本",
		area: "福田车公庙 / 招商银行大厦",
		track: "银行、财富管理、支付、金融科技",
		mapLogic: "招商银行深圳租房按车公庙强换乘处理。别只追求离大厦近，地铁可达和稳定通勤更值钱。入职前仍要确认具体楼栋。",
		source: "https://www.cmbchina.com/cmbinfo/crp/List.aspx/ContentInfo.aspx?guid=c5565f28-9e5b-45ba-b825-5ce91a10ceb2",
	},
	{
		company: "华大基因 BGI",
		status: "已拆分",
		guideHref: "/docs/shenzhen/bgi-renting-guide",
		shenzhenRole: "深圳总部 / 生命科学与基因科技公司",
		area: "盐田 / 华大基因中心",
		track: "基因测序、生命科学、精准医学",
		mapLogic: "华大基因盐田岗位是独立东部通勤题。别拿南山/福田经验硬套，先核 8 号线、班车和园区作息。入职前仍要确认具体楼栋。",
		source: "https://en.genomics.cn/contact.html",
	},
	{
		company: "欣旺达",
		status: "已拆分",
		guideHref: "/docs/shenzhen/sunwoda-renting-guide",
		shenzhenRole: "深圳总部 / 电池与新能源产业链公司",
		area: "宝安石岩 / 欣旺达总部工业园",
		track: "消费电池、动力电池、储能、智能硬件制造",
		mapLogic: "欣旺达租房先按石岩产业园区判断。南山通勤参照价值很低，班车、早班晚班和园区门禁更重要。入职前仍要确认具体楼栋。",
		source: "https://www.sunwoda.com/contact.html",
	},
	{
		company: "万科",
		status: "已拆分",
		guideHref: "/docs/shenzhen/vanke-renting-guide",
		shenzhenRole: "深圳总部 / 居住与城市开发公司",
		area: "盐田大梅沙注册总部 / 福田梅林办公点",
		track: "住宅开发、物业、城市服务、长租公寓",
		mapLogic: "万科租房必须先区分办公点：如果在福田梅林，按梅林/莲花北/龙华线；如果在盐田，则完全换一套判断。入职前仍要确认具体楼栋。",
		source: "https://www.vanke.com/en/other/contact",
	},
	{
		company: "创维 Skyworth",
		status: "已拆分",
		guideHref: "/docs/shenzhen/skyworth-renting-guide",
		shenzhenRole: "深圳总部 / 智能电视与显示终端公司",
		area: "南山高新区 / 科技园办公点",
		track: "显示终端、智能家居、半导体显示、新能源",
		mapLogic: "创维深圳租房按南山高新区/科技园处理。和中兴、迈瑞、金蝶类似，近场贵，外扩要实测通勤。入职前仍要确认具体楼栋。",
		source: "https://global.skyworth.com/contactus.php",
	},
];

const commuteBelts = [
	{
		name: "南山科技园 / 粤海 / 深圳湾",
		companies: "腾讯、中兴、迈瑞、金蝶、创维、微众银行",
		areas: "科技园、深大、粤海、白石洲、后海、深圳湾、宝安中心外扩",
		warning: "深圳最容易被租金打爆的区域，别只看离公司近；要把楼栋、地铁线、骑行和晚归一起算。",
	},
	{
		name: "西丽 / 留仙洞 / 大学城",
		companies: "大疆、深信服、传音、优必选、速腾聚创",
		areas: "西丽、留仙洞、大学城、茶光、塘朗、深圳北、兴东",
		warning: "这条带比深圳湾便宜一些但楼栋分散，最后一公里和坡路体感很要命。",
	},
	{
		name: "坂田 / 龙华 / 深圳北",
		companies: "华为及 ICT 生态公司",
		areas: "坂田、五和、民治、深圳北、龙华、布吉、杨美",
		warning: "坂田不是“南山远一点”，是另一套租房市场；班车、地铁 5/10 号线和骑行接驳必须单独核。",
	},
	{
		name: "福田 CBD / 车公庙",
		companies: "平安、招商银行、金融科技与总部职能岗位",
		areas: "车公庙、岗厦、石厦、香蜜湖、梅林、莲花北、龙华 4 号线",
		warning: "福田换乘强、生活便利，但整租和品质房源贵；预算紧要接受向梅林、龙华或罗湖外扩。",
	},
	{
		name: "前海 / 宝安中心 / 南山西部",
		companies: "影石 Insta360、前海金融与创新公司",
		areas: "前海、宝安中心、翻身、新安、南山西部、11 号线沿线",
		warning: "前海看起来离南山近，但不同地铁线体验差很多；不要只按直线距离选房。",
	},
	{
		name: "坪山 / 盐田 / 宝安北部等产业外圈",
		companies: "比亚迪、华大基因、欣旺达、万科部分办公点",
		areas: "坪山、坑梓、盐田、罗湖东部、石岩、光明、龙岗东部",
		warning: "外圈产业岗位更依赖班车和园区通勤，先确认岗位实际办公地，别拿南山房源做参照物。",
	},
];

const mapMarkers = [
	{ label: "腾讯 / 中兴 / 迈瑞 / 金蝶", detail: "南山科技园 / 粤海", x: 32, y: 40, status: "已拆分" },
	{ label: "微众银行 / 深圳湾", detail: "深圳湾科技生态园", x: 38, y: 49, status: "已拆分" },
	{ label: "大疆 / 深信服 / 传音", detail: "西丽 / 留仙洞", x: 27, y: 28, status: "已拆分" },
	{ label: "华为", detail: "坂田 / 龙岗", x: 61, y: 28, status: "已拆分" },
	{ label: "平安 / 招商银行", detail: "福田 CBD / 车公庙", x: 53, y: 51, status: "已拆分" },
	{ label: "影石 Insta360", detail: "前海", x: 22, y: 53, status: "已拆分" },
	{ label: "欣旺达", detail: "宝安石岩", x: 22, y: 18, status: "已拆分" },
	{ label: "比亚迪", detail: "坪山", x: 84, y: 43, status: "已拆分" },
	{ label: "华大基因 / 万科", detail: "盐田", x: 74, y: 58, status: "已拆分" },
];

const sourceBackedDate = "2026-05-02";

export function ShenzhenOverview() {
	const observedCount = ecosystemRows.length;
	const stats = [
		{ label: "观察样本", value: String(observedCount) },
		{ label: "核心通勤带", value: String(commuteBelts.length) },
		{ label: "公司指南", value: String(observedCount) },
	];

	return (
		<div className="not-prose my-8 space-y-8">
			<section className="overflow-hidden rounded-lg border border-zinc-200 bg-[#f7fbff] text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
				<div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
					<div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-md border border-sky-700/20 bg-white px-3 py-1 text-xs font-semibold text-sky-800 dark:border-sky-400/30 dark:bg-zinc-900 dark:text-sky-200">
								<MapPinned className="size-3.5" />
								深圳科技公司与租房地图入口
							</div>
							<div className="space-y-3">
								<h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
									先分清南山、西丽、坂田、福田和产业外圈
								</h2>
								<p className="max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
									深圳租房最坑的点不是“公司多”，而是公司分布在完全不同的通勤系统里：南山科技园和深圳湾吃预算，西丽/留仙洞吃最后一公里，坂田看班车和 5/10 号线，福田看换乘便利，坪山、盐田、石岩这类产业外圈要单独算。先确认办公楼栋，再谈住哪。
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
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_42%,rgba(14,165,233,0.22),transparent_30%),radial-gradient(circle_at_58%_28%,rgba(34,197,94,0.18),transparent_28%),radial-gradient(circle_at_82%_47%,rgba(245,158,11,0.16),transparent_28%)]" />
						<div className="relative flex h-full min-h-[300px] flex-col justify-between p-6">
							<div className="grid grid-cols-2 gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-300">
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">南山科技园 / 深圳湾</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">西丽 / 留仙洞</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">坂田 / 龙华</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">福田 / 前海 / 外圈</span>
							</div>
							<div className="rounded-xl border border-zinc-200 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/75">
								<div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
									深圳租房的核心是“别把全市当成一个南山”
								</div>
								<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
									南山、坂田、福田、前海、坪山、盐田和宝安北部的房源结构完全不同。公司名只能粗定位，楼栋和团队办公点才决定住哪。
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
								<Route className="size-4 text-sky-700 dark:text-sky-300" />
								深圳科技办公区示意图
							</div>
							<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
								坐标是近似区位，用来判断通勤方向，不替代高德、百度地图的实时路线。
							</p>
						</div>
						<div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
							<span className="inline-flex items-center gap-1.5">
								<span className="size-2.5 rounded-full bg-emerald-500" />
								已拆分
							</span>
						</div>
					</div>

					<div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-zinc-200 bg-[#f8fbff] dark:border-zinc-800 dark:bg-zinc-900">
						<svg
							viewBox="0 0 100 62.5"
							className="absolute inset-0 h-full w-full"
							role="img"
							aria-label="深圳科技办公区示意地图"
						>
							<rect width="100" height="62.5" fill="currentColor" opacity="0" />
							<path d="M18 50 C28 45, 36 43, 46 48 C55 53, 66 55, 78 58" fill="none" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
							<path d="M22 18 C35 20, 49 23, 62 28 C74 33, 82 40, 90 45" fill="none" stroke="#22c55e" strokeWidth="1.1" strokeLinecap="round" opacity="0.45" />
							<path d="M30 28 C28 36, 31 44, 36 52" fill="none" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
							<ellipse cx="38" cy="44" rx="18" ry="13" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.14" />
							<ellipse cx="60" cy="32" rx="16" ry="10" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.12" />
							<text x="34" y="43" textAnchor="middle" className="fill-sky-700 text-[2.4px] font-semibold dark:fill-sky-300">南山</text>
							<text x="27" y="30" textAnchor="middle" className="fill-sky-700 text-[2.4px] font-semibold dark:fill-sky-300">西丽</text>
							<text x="61" y="31" textAnchor="middle" className="fill-sky-700 text-[2.4px] font-semibold dark:fill-sky-300">坂田</text>
							<text x="53" y="54" textAnchor="middle" className="fill-sky-700 text-[2.4px] font-semibold dark:fill-sky-300">福田</text>
							<text x="84" y="46" textAnchor="middle" className="fill-sky-700 text-[2.4px] font-semibold dark:fill-sky-300">坪山</text>
						</svg>
						{mapMarkers.map((marker) => (
							<div
								key={`${marker.label}-${marker.detail}`}
								className="group absolute -translate-x-1/2 -translate-y-1/2"
								style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
							>
								<div className={`size-3 rounded-full border-2 border-white shadow-md dark:border-zinc-950 ${marker.status === "已拆分" ? "bg-emerald-500 shadow-emerald-900/20" : "bg-amber-500 shadow-amber-900/20"}`} />
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
						<Building2 className="size-4 text-sky-700 dark:text-sky-300" />
						当前状态
					</div>
					<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
						深圳总览已建立 {observedCount} 家公司观察样本和 {commuteBelts.length} 条核心通勤带，并已拆成独立企业租房指南。后续继续按真实办公楼栋和现场反馈校准。
					</p>
					<div className="mt-4 rounded-lg border border-dashed border-zinc-200 px-3 py-3 text-sm leading-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
						本页不写未经核验的房源、价格和中介渠道；只做官方来源支撑的公司样本与通勤方向判断。
					</div>
				</div>
			</section>

			<section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<div className="mb-4 flex items-start justify-between gap-3">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
							<Route className="size-4 text-sky-700 dark:text-sky-300" />
							深圳核心通勤带
						</div>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							深圳租房必须按办公区分层：南山、西丽、坂田、福田、前海和产业外圈的租金、房龄、通勤方式差异很大。
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
							<Database className="size-4 text-sky-700 dark:text-sky-300" />
							深圳科技公司生态信息表
						</div>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							数据口径：只使用公司官网、投资者关系页、政府公开信息等官方可信来源；不从第三方地图采集，不使用来源不明接口。当前已把深圳样本池拆成独立企业租房指南，后续继续按公司和片区校准。
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
								<th className="px-3 py-3">深圳定位</th>
								<th className="px-3 py-3">地图片区</th>
								<th className="px-3 py-3">赛道</th>
								<th className="px-3 py-3">通勤判断</th>
								<th className="px-3 py-3">来源</th>
							</tr>
						</thead>
						<tbody>
							{ecosystemRows.map((row) => (
								<tr key={row.company} className="border-b border-zinc-100 align-top dark:border-zinc-800">
									<td className="px-3 py-3 font-semibold text-zinc-950 dark:text-zinc-50">{row.company}</td>
					<td className="px-3 py-3">
						{row.guideHref ? (
							<a
								href={row.guideHref}
								className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800 underline-offset-4 hover:underline dark:bg-emerald-950 dark:text-emerald-200"
							>
								{row.status}
							</a>
						) : (
							<span className="rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-200">
								{row.status}
							</span>
						)}
					</td>
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">{row.shenzhenRole}</td>
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">{row.area}</td>
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">{row.track}</td>
									<td className="max-w-[300px] px-3 py-3 leading-6 text-zinc-600 dark:text-zinc-400">{row.mapLogic}</td>
									<td className="px-3 py-3">
										<a
											href={row.source}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center gap-1 text-xs font-medium text-sky-800 underline-offset-4 hover:underline dark:text-sky-200"
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
