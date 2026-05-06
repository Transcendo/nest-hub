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
		commute: "只知道东湖高新区 / 光谷时，先按楼栋、园区入口、2 号线、11 号线、有轨电车和班车拆圈层，不要把整个光谷当一个租房点。",
		status: "已收录",
		source: "https://www.wehdz.gov.cn/",
		guideHref: "/docs/wuhan/donghu-high-tech-zone-renting-guide",
	},
	{
		name: "光谷软件园",
		area: "关山大道 / 软件园中路周边",
		track: "软件、游戏、互联网外包、研发团队",
		commute: "适合优先比较关山大道、软件园路、民族大道、杨家湾和光谷广场换乘带；签约前先确认楼栋和园区入口。",
		status: "已收录",
		source: "https://www.ovuni.com/",
		guideHref: "/docs/wuhan/guanggu-software-park-renting-guide",
	},
	{
		name: "光谷未来科技城",
		area: "高新大道东段、未来一路 / 未来三路方向",
		track: "硬科技、AI、半导体、科研平台",
		commute: "园区尺度大，先按楼栋、门岗、11 号线、班车和晚归路线拆圈，再决定住近场还是退回成熟生活圈。",
		status: "已收录",
		source: "https://www.wehdz.gov.cn/2022/ztzl_75799/zsyz_75806/zsdt/202210/t20221023_2065135.shtml",
		guideHref: "/docs/wuhan/future-tech-city-renting-guide",
	},
	{
		name: "光谷智能制造产业园",
		area: "光谷东、左岭、东湖科学城东向组团",
		track: "集成电路、新型显示、智能终端、新能源汽车、工业互联网",
		commute: "政务网招商地图公开介绍其位于光谷之东、长江以南；租房先核实际楼栋、门岗、班车、倒班和夜间回家路线，再在左岭近场、高新大道、未来科技城和关山大道之间取舍。",
		status: "已收录",
		source: "https://www.wehdz.gov.cn/2022/ztzl_75799/zsyz_75806/zsdt/202210/t20221023_2065131.shtml",
		guideHref: "/docs/wuhan/guanggu-intelligent-manufacturing-park-renting-guide",
	},
	{
		name: "光谷生物城",
		area: "东湖高新区 / 生命健康园区组团",
		track: "生物医药、医疗器械、智慧医疗、园区运营",
		commute: "政府招商地图公开介绍其为武汉国家生物产业基地；租房先问清生物创新园、医药园、器械园、健康园等具体楼栋和门岗。",
		status: "已收录",
		source: "https://www.wehdz.gov.cn/2022/ztzl_75799/zsyz_75806/zsdt/202210/t20221023_2065132.shtml",
		guideHref: "/docs/wuhan/biolake-renting-guide",
	},
	{
		name: "小米武汉",
		area: "光谷中心城 / 高新大道与花山大道交会处",
		track: "AIoT、大数据、云服务、电商、新零售等研发团队",
		commute: "东湖高新区政务网公开报道小米武汉总部大楼位于高新大道与花山大道交会处、毗邻 11 号线光谷五路站；租房先按光谷中心城、高新大道和关山大道成熟圈核验。",
		status: "已收录",
		source: "https://www.wehdz.gov.cn/2022/zmq_75779/xwdt_75782/202210/t20221027_2072179.shtml",
		guideHref: "/docs/wuhan/xiaomi-renting-guide",
	},
	{
		name: "金山软件武汉",
		area: "光谷中心城 / 光谷四路、南新街、金培路与光谷金融港",
		track: "办公软件、游戏、云服务、研发与运营团队",
		commute: "金山官网加入我们页面公开介绍武汉园区东侧紧临光谷四路、南部靠近南新街、西侧靠近金培路；东湖高新区政务网也曾提到金山武汉总部入驻光谷金融港，租房要先核当前楼栋再分圈。",
		status: "已收录",
		source: "https://www.kingsoft.com/joinus",
		guideHref: "/docs/wuhan/kingsoft-renting-guide",
	},
	{
		name: "华为武汉",
		area: "江岸区三阳路8号天悦外滩金融中心A座",
		track: "ICT、云、政企、交付与研发协作团队",
		commute: "官网公开联系地址在三阳路；租房先按汉口近场和地铁换乘拆圈，若团队实际在光谷 / 驻场则切换到对应楼栋判断。",
		status: "已收录",
		source: "https://www.huawei.com/cn/contact-us",
		guideHref: "/docs/wuhan/huawei-renting-guide",
	},
	{
		name: "阿里巴巴武汉",
		area: "武昌区徐东大街与友谊大道交会处 / 武汉阿里中心",
		track: "华中总部、菜鸟、钉钉、飞猪、高德、本地生活等生态业务",
		commute: "武汉市政府门户网站公开报道武汉阿里中心位于徐东大街与友谊大道交会处；租房先按徐东近场、湖北大学 / 友谊大道、岳家嘴 / 中北路和汉口过江圈分层。",
		status: "已收录",
		source: "https://www.wuhan.gov.cn/sy/whyw/202510/t20251022_2664441.shtml",
		guideHref: "/docs/wuhan/alibaba-renting-guide",
	},
	{
		name: "斗鱼",
		area: "洪山区关山大道新发展国际中心A座",
		track: "直播、内容平台、游戏社区",
		commute: "官网公开联系方式显示关山大道办公锚点，租房优先按关山大道、光谷软件园、杨家湾和 2 号线换乘带核验。",
		status: "已收录",
		source: "https://www.douyu.com/cms/about/contact.html",
		guideHref: "/docs/wuhan/douyu-renting-guide",
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
		name: "烽火通信",
		area: "东湖高新区 / 高新四路6号",
		track: "通信设备、光网络、政企数字化",
		commute: "官网公开总部通讯地址在高新四路6号，租房优先按高新四路、光谷大道、关山大道和班车 / 夜间通勤核验。",
		status: "已收录",
		source: "https://www.fiberhome.com/contactus.html",
		guideHref: "/docs/wuhan/fiberhome-renting-guide",
	},
	{
		name: "中信科移动",
		area: "江夏区藏龙岛潭湖二路1号",
		track: "移动通信、5G / 6G、无线网络研发与产业化",
		commute: "官网公开武汉地址在藏龙岛潭湖二路1号，租房要从江夏藏龙岛、2 号线南延线、光谷南和班车 / 夜间通勤拆圈，不要直接套用高新四路或关山大道模型。",
		status: "已收录",
		source: "https://www.cictmobile.com/about/contact.html",
		guideHref: "/docs/wuhan/cict-mobile-renting-guide",
	},
	{
		name: "华中科技大学 / 武汉大学周边科研人群",
		area: "珞喻路、鲁巷、光谷广场、东湖周边",
		track: "高校、科研、实习、联合培养",
		commute: "华科官网公开地址在珞喻路1037号，武大官网公开地址在八一路299号；租房优先按校门 / 实验室、2 号线换乘和光谷实习路线核验。",
		status: "已收录",
		source: "https://www.hust.edu.cn/",
		guideHref: "/docs/wuhan/hust-whu-campus-renting-guide",
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
		label: "汉口三阳路 / 江岸办公带",
		who: "公开办公锚点在三阳路、江汉路、大智路、黄浦路一线，或需要频繁见客户的人。",
		areas: "三阳路、大智路、循礼门、江汉路、黄浦路、香港路",
		risk: "老房质量、楼梯房、晚归街巷和过江通勤；不要把公开联系地址直接等同于所有团队打卡点。",
	},
	{
		label: "武昌徐东 / 友谊大道办公带",
		who: "办公锚点在徐东大街、友谊大道、武汉阿里中心或武昌成熟商圈，且想兼顾汉口 / 武昌活动的人。",
		areas: "徐东、湖北大学、岳家嘴、中北路、积玉桥、汉口过江换乘点",
		risk: "商圈噪音、老小区房龄、过江通勤和地铁换乘时间；先实测门到门，不要只按武昌核心区想象。",
	},
	{
		label: "高新大道 / 未来科技城东向带",
		who: "办公点在未来科技城、东湖科学城、半导体和硬科技园区的人。",
		areas: "光谷六路、光谷七路、未来一路、左岭外扩",
		risk: "生活配套密度、夜间交通和班车依赖度；新房多不等于适合刚入职。",
	},
	{
		label: "左岭 / 光谷智能制造近场",
		who: "办公点在光谷东、左岭、智能制造园区或需要倒班 / 晚归的硬科技新人。",
		areas: "左岭、光谷东近场、高新大道东段、园区班车点周边",
		risk: "园区大且最后一公里强，必须核楼栋、门岗、班车、夜间打车和商业水电；不要只按低月租签长约。",
	},
	{
		label: "光谷生物城 / 生命健康近场",
		who: "办公点在生物创新园、生物医药园、医疗器械园、医学健康园或智慧健康园的人。",
		areas: "高新二路、高新大道、光谷三路至光谷六路、光谷东成熟过渡圈",
		risk: "园区组团大，必须确认具体楼栋、门岗、班车和晚归路线；不要把园区名当成单一地址。",
	},
	{
		label: "江夏藏龙岛 / 光谷南",
		who: "办公点在潭湖二路、藏龙岛、江夏光谷南或 2 号线南延线附近，且需要兼顾近场和换乘的人。",
		areas: "藏龙岛、潭湖二路、佛祖岭、藏龙东街、光谷南、金融港南侧",
		risk: "最后一公里、班车点、夜间打车和生活配套差异大；不要把江夏近场和关山大道成熟圈混成一个通勤半径。",
	},
	{
		label: "武昌高校 / 科研过渡带",
		who: "研究生、实习生、双通勤情侣，或先在高校 / 企业之间过渡的人。",
		areas: "街道口、广埠屯、珞狮路、东湖、鲁磨路",
		risk: "老小区维修、合租室友、隔断和押付结构；短租要确认退租规则。",
	},
];

const viewingRhythm = [
	{
		step: "到城前 24 小时",
		action: "让 HR / 主管把实际楼栋、园区入口、班车点、上下班时间和是否驻场说清楚；只拿到“光谷 / 武汉研发中心”时，先不要约远端房源。",
	},
	{
		step: "第一天白天",
		action: "先从办公点反推 2-3 个候选圈：近场步行 / 公交换乘、地铁换乘、成熟生活圈；同一条线路至少看一个合租、一个整租或公寓样本。",
	},
	{
		step: "第一天晚高峰",
		action: "实测园区门岗到小区门的门到门时间，特别是关山大道堵点、11 号线末班、光谷东夜间打车和跨江回汉口 / 武昌的成本。",
	},
	{
		step: "第二天签前",
		action: "带着预算上限复看 1-2 套候选房，逐项核验民水民电、服务费 / 中介费、押付、转租授权、退租违约金和维修责任；还没确认楼栋就先短租过渡。",
	},
];

const signingRedLines = [
	"房源离“公司名”很近，但离实际园区门岗 / 工位很远。",
	"只给总价不拆服务费、中介费、物业费、水电费和网络费。",
	"二房东、转租或合租房无法提供业主授权、原合同或清晰收款主体。",
	"光谷东 / 左岭 / 未来科技城房源夜间回家强依赖打车，但中介只带白天看房。",
	"老小区房龄、漏水、隔断、噪音、采光和电梯情况没有现场确认。",
	"合同里提前退租、押金扣除、维修责任和转租规则含糊。",
];

const mapMarkers = [
	{ label: "东湖高新区 / 光谷", x: "70%", y: "42%", type: "已收录" },
	{ label: "光谷软件园 / 关山大道", x: "55%", y: "52%", type: "已收录" },
	{ label: "未来科技城", x: "82%", y: "48%", type: "已收录" },
	{ label: "光谷智能制造 / 左岭", x: "90%", y: "53%", type: "已收录" },
	{ label: "光谷广场 / 2号线", x: "46%", y: "60%", type: "换乘" },
	{ label: "光谷生物城", x: "73%", y: "56%", type: "已收录" },
	{ label: "小米武汉 / 光谷五路", x: "78%", y: "44%", type: "已收录" },
	{ label: "金山软件 / 光谷四路", x: "76%", y: "47%", type: "已收录" },
	{ label: "华为武汉 / 三阳路", x: "18%", y: "36%", type: "已收录" },
	{ label: "阿里巴巴 / 徐东友谊大道", x: "30%", y: "47%", type: "已收录" },
	{ label: "街道口 / 高校带", x: "32%", y: "58%", type: "过渡" },
	{ label: "华科 / 武大高校带", x: "37%", y: "61%", type: "已收录" },
	{ label: "斗鱼 / 关山大道", x: "57%", y: "57%", type: "已收录" },
	{ label: "烽火通信 / 高新四路", x: "65%", y: "62%", type: "已收录" },
	{ label: "中信科移动 / 藏龙岛", x: "53%", y: "72%", type: "已收录" },
	{ label: "长江存储 / 未来三路", x: "86%", y: "58%", type: "已收录" },
];

const sourceRows = [
	{ label: "武汉东湖新技术开发区政务网", href: "https://www.wehdz.gov.cn/" },
	{ label: "东湖高新区政务网光谷未来科技城", href: "https://www.wehdz.gov.cn/2022/ztzl_75799/zsyz_75806/zsdt/202210/t20221023_2065135.shtml" },
	{ label: "东湖高新区政务网光谷智能制造产业园", href: "https://www.wehdz.gov.cn/2022/ztzl_75799/zsyz_75806/zsdt/202210/t20221023_2065131.shtml" },
	{ label: "东湖高新区政务网光谷生物城", href: "https://www.wehdz.gov.cn/2022/ztzl_75799/zsyz_75806/zsdt/202210/t20221023_2065132.shtml" },
	{ label: "武汉市人民政府光谷未来产业报道", href: "https://www.wuhan.gov.cn/sy/whyw/202410/t20241018_2470641.shtml" },
	{ label: "中电光谷产业资源共享平台", href: "https://www.ovuni.com/" },
	{ label: "东湖高新区政务网小米武汉总部报道", href: "https://www.wehdz.gov.cn/2022/zmq_75779/xwdt_75782/202210/t20221027_2072179.shtml" },
	{ label: "金山官网加入我们", href: "https://www.kingsoft.com/joinus" },
	{ label: "贝壳武汉租房", href: "https://wh.zu.ke.com/zufang/" },
	{ label: "链家武汉租房", href: "https://wh.lianjia.com/zufang/" },
	{ label: "华为官网联系我们", href: "https://www.huawei.com/cn/contact-us" },
	{ label: "武汉市人民政府阿里大消息报道", href: "https://www.wuhan.gov.cn/sy/whyw/202510/t20251022_2664441.shtml" },
	{ label: "武汉市人民政府互联网总部报道", href: "https://www.wuhan.gov.cn/sy/whyw/202510/t20251023_2665054.shtml" },
	{ label: "斗鱼官网联系我们", href: "https://www.douyu.com/cms/about/contact.html" },
	{ label: "斗鱼官网关于我们", href: "https://www.douyu.com/cms/about/about_us.html" },
	{ label: "长江存储官网联系方式", href: "https://www.ymtc.com/cn/contact.html" },
	{ label: "烽火通信官网联系我们", href: "https://www.fiberhome.com/contactus.html" },
	{ label: "中信科移动官网联系我们", href: "https://www.cictmobile.com/about/contact.html" },
	{ label: "中信科移动官网公司简介", href: "https://www.cictmobile.com/about/profile.html" },
	{ label: "华中科技大学官网", href: "https://www.hust.edu.cn/" },
	{ label: "武汉大学官网", href: "https://www.whu.edu.cn/" },
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
							武汉科技 offer 的租房判断核心不是行政区，而是实际打卡楼栋落在关山大道、光谷软件园、高新大道、未来科技城、江夏藏龙岛、汉口三阳路、武昌徐东友谊大道，还是武昌高校 / 换乘带。先建立城市总览和片区入口，正式公司页只在办公锚点足够清楚后逐步拆分。
						</p>
					</div>
					<div className="grid grid-cols-3 gap-2 text-center text-xs">
						<div className="rounded-[8px] border border-white/70 bg-white/75 p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
							<div className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">9</div>
							<div className="text-[#101615]/60 dark:text-white/60">通勤带</div>
						</div>
						<div className="rounded-[8px] border border-white/70 bg-white/75 p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
							<div className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">14</div>
							<div className="text-[#101615]/60 dark:text-white/60">样本锚点</div>
						</div>
						<div className="rounded-[8px] border border-white/70 bg-white/75 p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
							<div className="text-lg font-semibold text-amber-700 dark:text-amber-300">14</div>
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

			<section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
				<div className="rounded-[10px] border border-[#101615]/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
					<h3 className="text-base font-semibold text-[#101615] dark:text-white">到武汉后 48 小时看房节奏</h3>
					<div className="mt-4 space-y-3">
						{viewingRhythm.map((item) => (
							<div key={item.step} className="rounded-[8px] border border-[#101615]/10 bg-[#f8faf9] p-3 dark:border-white/10 dark:bg-white/[0.03]">
								<div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{item.step}</div>
								<p className="mt-2 text-sm leading-6 text-[#101615]/70 dark:text-white/70">{item.action}</p>
							</div>
						))}
					</div>
				</div>
				<div className="rounded-[10px] border border-amber-200 bg-amber-50/70 p-4 shadow-sm dark:border-amber-400/20 dark:bg-amber-950/20">
					<h3 className="text-base font-semibold text-[#101615] dark:text-white">签约红线：这些没核清就别交钱</h3>
					<ul className="mt-4 space-y-2 text-sm leading-6 text-[#101615]/70 dark:text-white/70">
						{signingRedLines.map((item) => (
							<li key={item} className="flex gap-2">
								<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
								<span>{item}</span>
							</li>
						))}
					</ul>
					<p className="mt-3 text-xs leading-5 text-[#101615]/55 dark:text-white/55">武汉公司页会继续按具体楼栋拆分；城市总览只负责帮你先排除明显错误的通勤线和合同风险。</p>
				</div>
			</section>

			<section className="grid gap-4 md:grid-cols-2">
				<div className="rounded-[10px] border border-[#101615]/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
					<h3 className="text-base font-semibold text-[#101615] dark:text-white">当前收录 / 扩展方向</h3>
					<ul className="mt-3 space-y-2 text-sm leading-6 text-[#101615]/70 dark:text-white/70">
						<li>武汉入口先以城市总览和片区判断为主，帮助 offer / 实习人群在确认楼栋前建立租房边界。</li>
						<li>东湖高新区 / 光谷科技公司入口、光谷软件园、未来科技城、光谷生物城、小米武汉、金山软件武汉、阿里巴巴武汉、斗鱼、长江存储、烽火通信、华为武汉和华科 / 武大高校带已拆成正式指南；其他公司锚点会继续按公开来源成熟度推进。</li>
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
