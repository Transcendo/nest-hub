import {
	Building2,
	Database,
	ExternalLink,
	MapPinned,
	Route,
} from "lucide-react";

const ecosystemRows = [
	{
		company: "腾讯 / 微信",
		status: "已收录",
		guangzhouRole: "微信与腾讯广州研发代表，琶洲 / 海珠互联网办公带的核心锚点",
		area: "海珠琶洲 / T.I.T 创意园周边 / 微信相关办公区",
		track: "社交、内容、支付、企业服务、AI 应用",
		mapLogic: "腾讯广州租房不能只写“广州分部”，要按微信相关团队、琶洲和海珠办公点拆。先确认楼栋，再在赤岗、客村、磨碟沙、琶洲、新港东之间判断通勤。",
		source: "https://www.tencent.com/en-us/about.html",
		guideHref: "/docs/guangzhou/tencent-wechat-renting-guide",
	},
	{
		company: "网易游戏",
		status: "已收录",
		guangzhouRole: "广州游戏研发与运营重镇，天河 / 科韵路 / 智慧城方向需要单独拆页",
		area: "天河科韵路 / 天河智慧城 / 番禺网易相关园区需逐页核验",
		track: "游戏研发、发行、内容平台、AI 工具",
		mapLogic: "网易广州岗位先问清团队在哪个园区。天河科韵路、智慧城和番禺不是同一套租房策略，别拿一个“网易广州”覆盖全部。",
		source: "https://www.neteasegames.com/",
		guideHref: "/docs/guangzhou/netease-games-renting-guide",
	},
	{
		company: "唯品会",
		status: "已收录",
		guangzhouRole: "广州总部电商公司，适合做荔湾 / 海珠 / 天河西侧通勤判断",
		area: "荔湾 / 海珠交界与总部办公点周边需按楼栋核验",
		track: "电商、供应链、品牌零售、数据运营",
		mapLogic: "唯品会租房重点不是追天河 CBD，而是确认总部办公点与地铁接驳。预算敏感的新员工要把荔湾、海珠、越秀西侧一起比较。",
		source: "https://www.vip.com/about-us",
		guideHref: "/docs/guangzhou/vipshop-renting-guide",
	},
	{
		company: "小鹏汽车",
		status: "已收录",
		guangzhouRole: "广州智能汽车总部样本，车企研发、产品和职能岗位需求稳定",
		area: "天河 / 黄埔 / 番禺等办公与研发基地需按岗位核验",
		track: "新能源汽车、自动驾驶、智能座舱、车联网",
		mapLogic: "小鹏广州岗位必须先确认是总部职能、研发、销售运营还是工厂 / 园区。不同岗位可能对应完全不同的通勤圈。",
		source: "https://www.xpeng.com/",
		guideHref: "/docs/guangzhou/xpeng-renting-guide",
	},
	{
		company: "广汽埃安",
		status: "已收录",
		guangzhouRole: "广州本地新能源车公司，黄埔 / 番禺 / 产业园通勤需要独立判断",
		area: "番禺 / 黄埔 / 广汽智联新能源产业园相关办公与生产基地",
		track: "新能源汽车、三电、智能制造、车联网",
		mapLogic: "广汽埃安更接近产业园租房题，不是互联网 CBD 租房题。先核班车、园区门禁、上下班时段，再看番禺、黄埔和地铁线。",
		source: "https://www.aion.com.cn/",
		guideHref: "/docs/guangzhou/gac-aion-renting-guide",
	},
	{
		company: "广汽集团",
		status: "已收录",
		guangzhouRole: "广州汽车产业链总部锚点，适合和埃安、小鹏、自动驾驶公司形成汽车科技专题",
		area: "珠江新城 / 番禺 / 黄埔等集团与产业基地需分岗位核验",
		track: "汽车集团、研发制造、供应链、出行服务",
		mapLogic: "广汽集团不要只按珠江新城写。总部、研发、产业基地和合资公司通勤差异很大，后续公司页必须先拆办公点。",
		source: "https://www.gacgroup.com/en/",
		guideHref: "/docs/guangzhou/gac-group-renting-guide",
	},
	{
		company: "文远知行 WeRide",
		status: "已收录",
		guangzhouRole: "广州自动驾驶代表公司，黄埔 / 国际生物岛 / 科学城方向适合单独拆页",
		area: "黄埔 / 广州开发区 / 生物岛等自动驾驶测试与办公带",
		track: "自动驾驶、Robotaxi、智能出行、AI 交通",
		mapLogic: "文远知行租房要把办公点、测试运营点和通勤时间分开。黄埔科学城和海珠生物岛体感完全不同。",
		source: "https://www.weride.ai/",
		guideHref: "/docs/guangzhou/weride-renting-guide",
	},
	{
		company: "小马智行 Pony.ai",
		status: "已收录",
		guangzhouRole: "自动驾驶公司广州样本，适合与文远知行、小鹏形成智能汽车租房集群",
		area: "南沙 / 黄埔 / 核心办公点需按团队核验",
		track: "自动驾驶、Robotaxi、智能物流、AI 系统",
		mapLogic: "小马智行广州租房不能只看公司名。自动驾驶公司常有办公、测试、运营多点位，先确认实际打卡地。",
		source: "https://pony.ai/",
		guideHref: "/docs/guangzhou/pony-ai-renting-guide",
	},
	{
		company: "亿航智能 EHang",
		status: "已收录",
		guangzhouRole: "低空经济与无人驾驶航空器公司，广州科技制造样本",
		area: "黄埔 / 广州开发区 / 科学城方向需按办公与基地核验",
		track: "低空经济、无人驾驶航空器、智能制造",
		mapLogic: "亿航智能更像硬科技 / 制造型通勤题。看房时要优先确认园区交通、晚归路线和公共交通班次，而不是只看直线距离。",
		source: "https://www.ehang.com/about/",
		guideHref: "/docs/guangzhou/ehang-renting-guide",
	},
	{
		company: "三七互娱",
		status: "已收录",
		guangzhouRole: "广州游戏公司代表，适合补齐天河 / 琶洲以外的游戏产业租房需求",
		area: "广州办公点需按官方地址和团队楼栋核验",
		track: "游戏研发、发行、海外业务、内容运营",
		mapLogic: "三七互娱后续要重点写游戏岗位作息和晚归安全。广州游戏公司不一定都在同一个办公带，楼栋确认是第一步。",
		source: "https://www.37wan.net/",
		guideHref: "/docs/guangzhou/37games-renting-guide",
	},
	{
		company: "多益网络",
		status: "已收录",
		guangzhouRole: "广州本地游戏研发公司，适合做游戏行业新人租房入口",
		area: "黄埔 / 科学城相关办公区需按官方信息复核",
		track: "游戏研发、运营、内容创作",
		mapLogic: "多益网络租房要按具体园区处理，尤其关注黄埔 / 科学城的通勤和生活密度，不要套天河写法。",
		source: "https://www.duoyi.com/",
		guideHref: "/docs/guangzhou/duoyi-renting-guide",
	},
	{
		company: "欢聚集团 JOYY",
		status: "已收录",
		guangzhouRole: "广州直播与出海互联网公司样本，适合做内容平台 / 海外业务岗位租房页",
		area: "番禺 / 广州办公点需按实际团队核验",
		track: "直播、社交娱乐、海外内容平台、音视频技术",
		mapLogic: "欢聚广州租房要特别区分办公点和团队作息。内容平台岗位晚归概率高，地铁末班和夜间回家路线要写清楚。",
		source: "https://ir.joyy.com/",
		guideHref: "/docs/guangzhou/joyy-renting-guide",
	},
	{
		company: "酷狗音乐",
		status: "已收录",
		guangzhouRole: "广州音乐与内容平台代表，可与腾讯音乐体系形成内容行业租房入口",
		area: "广州办公点需按腾讯音乐 / 酷狗官方信息复核",
		track: "音乐内容、音频社区、版权运营、推荐系统",
		mapLogic: "酷狗广州租房不适合只写成泛娱乐公司。后续要先核办公点，再判断天河、海珠还是番禺方向。",
		source: "https://www.kugou.com/",
		guideHref: "/docs/guangzhou/kugou-renting-guide",
	},
	{
		company: "希音 SHEIN",
		status: "已收录",
		guangzhouRole: "跨境电商与供应链公司，在广州有强招聘与产业链需求",
		area: "番禺 / 海珠 / 供应链与办公点需按团队核验",
		track: "跨境电商、供应链、服装产业、数据运营",
		mapLogic: "SHEIN 广州租房要谨慎写：先确认岗位实际办公地和是否涉及供应链 / 仓配 / 设计协同，再决定海珠、番禺还是更外圈。",
		source: "https://www.sheingroup.com/",
		guideHref: "/docs/guangzhou/shein-renting-guide",
	},
	{
		company: "视源股份 CVTE / 希沃 seewo",
		status: "已收录",
		guangzhouRole: "广州教育科技与智能硬件公司，黄埔 / 科学城通勤代表",
		area: "黄埔科学城 / 广州开发区相关园区",
		track: "教育科技、交互智能平板、企业显示、硬件研发",
		mapLogic: "CVTE / 希沃租房应按黄埔科学城处理。核心问题是园区接驳、通勤稳定性和生活配套密度。",
		source: "https://www.cvte.com/",
		guideHref: "/docs/guangzhou/cvte-seewo-renting-guide",
	},
	{
		company: "汇量科技 Mobvista",
		status: "已收录",
		guangzhouRole: "广州广告技术与出海营销公司，适合做数字营销 / 海外增长岗位租房页",
		area: "广州办公点需按官方联系信息和团队楼栋核验",
		track: "广告技术、海外增长、移动营销、SaaS",
		mapLogic: "Mobvista 租房页要围绕出海互联网岗位写，重点是办公区、晚归、合租和预算，不要写成传统广告公司。",
		source: "https://www.mobvista.com/",
		guideHref: "/docs/guangzhou/mobvista-renting-guide",
	},
	{
		company: "金域医学",
		status: "已收录",
		guangzhouRole: "广州医疗科技与检验服务公司，可补齐生命科学 / 医疗科技通勤样本",
		area: "黄埔 / 科学城 / 医疗检验基地需按岗位核验",
		track: "医学检验、生命科学、医疗数据、实验室服务",
		mapLogic: "金域医学租房要和互联网岗位分开写：实验室、研发、职能和区域运营的办公点不同，作息也不同。",
		source: "https://www.kingmed.com.cn/",
		guideHref: "/docs/guangzhou/kingmed-renting-guide",
	},
	{
		company: "海大集团",
		status: "已收录",
		guangzhouRole: "广州本地产业科技公司，可作为番禺 / 南村 / 产业园通勤样本",
		area: "番禺 / 南村 / 集团总部与产业园周边",
		track: "农业科技、供应链、数字化管理、产业互联网",
		mapLogic: "海大集团适合覆盖番禺产业总部通勤，不要把广州内容全挤在天河和琶洲。候选区域要看南村、万博、大学城和地铁接驳。",
		source: "https://www.cninfo.com.cn/new/disclosure/stock?stockCode=002311&orgId=9900008491",
		guideHref: "/docs/guangzhou/haid-renting-guide",
	},
];

const commuteBelts = [
	{
		name: "琶洲 / 海珠互联网带",
		companies: "腾讯 / 微信、SHEIN 部分团队、内容与电商相关公司",
		areas: "琶洲、磨碟沙、新港东、赤岗、客村、江泰路、万胜围",
		warning: "琶洲新办公楼多，但近场租金和公寓溢价高；预算紧的人要把海珠老社区、8 号线和 18 号线换乘一起算。",
	},
	{
		name: "天河 / 科韵路 / 智慧城",
		companies: "网易游戏、小鹏部分团队、游戏与互联网分部",
		areas: "科韵路、员村、车陂、棠下、黄村、天河智慧城、龙洞",
		warning: "天河不是一个点。珠江新城、科韵路和智慧城通勤完全不同，先确认楼栋，不要被“天河上班”四个字骗。",
	},
	{
		name: "黄埔科学城 / 广州开发区",
		companies: "文远知行、亿航智能、CVTE / 希沃、金域医学、多益网络等",
		areas: "科学城、萝岗、香雪、苏元、暹岗、黄埔军校 / 鱼珠换乘方向",
		warning: "黄埔适合硬科技和研发岗位，但最后一公里、园区班车和夜间交通要实测。",
	},
	{
		name: "番禺万博 / 南村 / 大学城",
		companies: "欢聚集团、海大集团、广汽 / 电商供应链相关团队",
		areas: "万博、南村、员岗、汉溪长隆、大学城、洛溪、广州南站外扩",
		warning: "番禺房源多、预算友好，但跨区去天河 / 海珠会被通勤吞掉。适合办公点就在番禺或有稳定班车的人。",
	},
	{
		name: "珠江新城 / 金融城 / 越秀商务带",
		companies: "广汽集团总部职能、金融科技、总部职能岗位",
		areas: "珠江新城、猎德、潭村、员村、越秀、五羊邨、杨箕",
		warning: "中心区通勤方便但贵。新员工别把预算都砸在近场，先看合租、老小区和地铁直达。",
	},
	{
		name: "南沙 / 汽车与自动驾驶外圈",
		companies: "小马智行、智能汽车测试运营、部分制造与自动驾驶岗位",
		areas: "南沙、蕉门、金洲、黄阁、番禺南部、4 / 18 号线沿线",
		warning: "南沙和主城不是一个租房市场。只适合明确在南沙办公或测试运营的人，别为了便宜住太远。",
	},
];

const mapMarkers = [
	{ label: "腾讯 / 微信", detail: "海珠琶洲 / T.I.T 周边", x: 49, y: 45, status: "已收录" },
	{ label: "网易游戏", detail: "天河 / 科韵路 / 智慧城", x: 62, y: 35, status: "已收录" },
	{ label: "唯品会", detail: "荔湾 / 海珠交界", x: 36, y: 49, status: "已收录" },
	{ label: "小鹏 / 广汽", detail: "汽车科技与总部职能", x: 56, y: 52, status: "已收录" },
	{ label: "文远 / 亿航 / CVTE", detail: "黄埔科学城", x: 74, y: 33, status: "已收录" },
	{ label: "欢聚 / 海大", detail: "番禺万博 / 南村", x: 49, y: 66, status: "已收录" },
	{ label: "小马智行", detail: "南沙 / 自动驾驶", x: 61, y: 82, status: "已收录" },
];

const viewingRhythm = [
	{
		phase: "先分办公区和生活圈",
		detail: "琶洲/海珠、天河、黄埔科学城、番禺、南沙通勤逻辑不同；先定地铁、通勤方向和下班后生活半径。",
	},
	{
		phase: "问清中介费和押金规则",
		detail: "广州不同片区、不同房源形态收费差异明显，签前要确认中介费、押几付几、水电、维修和提前退租。",
	},
	{
		phase: "把天气和高峰算进去",
		detail: "雨季、地铁拥挤、城中村步行路段和夜间回家路线会改变真实体验，热门房源不要只看白天。",
	},
];

const sourceBackedDate = "2026-05-02";

export function GuangzhouOverview() {
	const observedCount = ecosystemRows.length;
	const stats = [
		{ label: "观察样本", value: String(observedCount) },
		{ label: "核心通勤带", value: String(commuteBelts.length) },
		{ label: "公司指南", value: String(ecosystemRows.filter((row) => row.guideHref).length) },
	];

	return (
		<div className="not-prose my-8 space-y-8">
			<section className="overflow-hidden rounded-lg border border-zinc-200 bg-[#fff9f2] text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
				<div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
					<div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-md border border-orange-700/20 bg-white px-3 py-1 text-xs font-semibold text-orange-800 dark:border-orange-400/30 dark:bg-zinc-900 dark:text-orange-200">
								<MapPinned className="size-3.5" />
								广州大厂与租房地图入口
							</div>
							<div className="space-y-3">
								<h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
									先分清琶洲、天河、黄埔、番禺和南沙
								</h2>
								<p className="max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
									广州不是只有珠江新城。微信和内容平台看海珠 / 琶洲，网易和互联网分部看天河 / 科韵路，自动驾驶与硬科技看黄埔科学城，游戏、电商和产业总部还会落到番禺、南沙。先确认办公楼栋和岗位类型，再决定住主城、近场还是地铁外扩。
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
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_45%,rgba(249,115,22,0.22),transparent_30%),radial-gradient(circle_at_74%_34%,rgba(34,197,94,0.16),transparent_28%),radial-gradient(circle_at_50%_68%,rgba(14,165,233,0.16),transparent_28%)]" />
						<div className="relative flex h-full min-h-[300px] flex-col justify-between p-6">
							<div className="grid grid-cols-2 gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-300">
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">海珠琶洲 / 微信</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">天河 / 网易游戏</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">黄埔科学城 / 硬科技</span>
								<span className="rounded-full bg-white/80 px-3 py-1 shadow-sm dark:bg-zinc-950/70">番禺 / 南沙 / 汽车科技</span>
							</div>
							<div className="rounded-xl border border-zinc-200 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/75">
								<div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
									广州租房的核心是“别把所有 offer 都套天河模板”
								</div>
								<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
									琶洲、天河、黄埔、番禺、南沙的房源和通勤完全不同。公司页已经按办公区和岗位类型拆分，不用一个广州均价糊弄人。
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
								<Route className="size-4 text-orange-700 dark:text-orange-300" />
								广州科技办公区示意图
							</div>
							<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
								坐标是近似区位，用来判断通勤方向，不替代高德、百度地图的实时路线。
							</p>
						</div>
						<div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
							<span className="inline-flex items-center gap-1.5">
								<span className="size-2.5 rounded-full bg-emerald-500" />
								已收录
							</span>
						</div>
					</div>

					<div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-zinc-200 bg-[#fffaf3] dark:border-zinc-800 dark:bg-zinc-900">
						<svg
							viewBox="0 0 100 62.5"
							className="absolute inset-0 h-full w-full"
							role="img"
							aria-label="广州科技办公区示意地图"
						>
							<rect width="100" height="62.5" fill="currentColor" opacity="0" />
							<path d="M20 42 C34 37, 48 35, 63 40 C75 44, 84 48, 92 52" fill="none" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
							<path d="M42 25 C54 26, 66 29, 78 35" fill="none" stroke="#22c55e" strokeWidth="1.1" strokeLinecap="round" opacity="0.45" />
							<path d="M50 46 C50 55, 54 65, 62 84" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
							<ellipse cx="50" cy="45" rx="20" ry="12" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.14" />
							<ellipse cx="74" cy="34" rx="14" ry="9" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.12" />
							<text x="49" y="43" textAnchor="middle" className="fill-orange-700 text-[2.4px] font-semibold dark:fill-orange-300">琶洲</text>
							<text x="62" y="34" textAnchor="middle" className="fill-orange-700 text-[2.4px] font-semibold dark:fill-orange-300">天河</text>
							<text x="74" y="31" textAnchor="middle" className="fill-orange-700 text-[2.4px] font-semibold dark:fill-orange-300">黄埔</text>
							<text x="49" y="69" textAnchor="middle" className="fill-orange-700 text-[2.4px] font-semibold dark:fill-orange-300">番禺</text>
							<text x="61" y="86" textAnchor="middle" className="fill-orange-700 text-[2.4px] font-semibold dark:fill-orange-300">南沙</text>
						</svg>
						{mapMarkers.map((marker) => (
							<div
								key={`${marker.label}-${marker.detail}`}
								className="group absolute -translate-x-1/2 -translate-y-1/2"
								style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
							>
								<div className="size-3 rounded-full border-2 border-white bg-emerald-500 shadow-md shadow-emerald-900/20 dark:border-zinc-950" />
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
						<Building2 className="size-4 text-orange-700 dark:text-orange-300" />
						当前状态
					</div>
					<p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
						广州总览已建立 {observedCount} 家公司观察样本和 {commuteBelts.length} 条核心通勤带，并把腾讯 / 微信、网易游戏、唯品会、小鹏、广汽埃安、文远知行等高搜索需求样本拆成公司级租房指南。
					</p>
					<div className="mt-4 rounded-lg border border-dashed border-zinc-200 px-3 py-3 text-sm leading-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
						本页和公司页都不写未经核验的房源、价格和中介渠道；只做官方来源支撑的公司样本与通勤方向判断。
					</div>
				</div>
			</section>

			<section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
				<div className="mb-4 flex items-start justify-between gap-3">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
							<Route className="size-4 text-orange-700 dark:text-orange-300" />
							广州核心通勤带
						</div>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							广州租房先按办公区分层：琶洲 / 海珠、天河、黄埔科学城、番禺、珠江新城和南沙的预算、房龄、通勤方式差异很大。
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
				<div className="mb-4 flex items-start justify-between gap-3">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
							<Route className="size-4 text-orange-700 dark:text-orange-300" />
							广州城市看房节奏
						</div>
						<p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							广州看房要按琶洲、天河、黄埔、番禺、南沙拆开。老小区、城中村、公寓和产业园房源混在一起时，规则比图片更重要。
						</p>
					</div>
				</div>
				<div className="grid gap-3 md:grid-cols-3">
					{viewingRhythm.map((item) => (
						<div key={item.phase} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
							<div className="font-semibold text-zinc-950 dark:text-zinc-50">{item.phase}</div>
							<div className="mt-3 rounded-md bg-orange-50 text-orange-900 dark:bg-orange-950 dark:text-orange-100 px-3 py-2 text-sm leading-6">
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
							<Database className="size-4 text-orange-700 dark:text-orange-300" />
							广州科技公司生态信息表
						</div>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
							数据口径：优先使用公司官网、投资者关系页、政府公开信息等可信来源；当前只建立公司样本和通勤方向，不使用第三方地图抓取、来源不明接口或未经核验的租金数据。
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
								<th className="px-3 py-3">广州定位</th>
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
										<a href={row.guideHref} className="underline-offset-4 hover:underline">{row.company}</a>
									</td>
									<td className="px-3 py-3">
										<span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
											{row.status}
										</span>
									</td>
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">{row.guangzhouRole}</td>
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">{row.area}</td>
									<td className="px-3 py-3 text-zinc-700 dark:text-zinc-300">{row.track}</td>
									<td className="max-w-[300px] px-3 py-3 leading-6 text-zinc-600 dark:text-zinc-400">{row.mapLogic}</td>
									<td className="px-3 py-3">
										<a
											href={row.source}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center gap-1 text-xs font-medium text-orange-800 underline-offset-4 hover:underline dark:text-orange-200"
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
