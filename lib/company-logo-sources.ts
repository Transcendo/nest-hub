import type { CompanyKey } from "./company-guides";

export type CompanyLogoSourceStatus =
	| "trusted"
	| "official-page-only"
	| "needs-review"
	| "blocked";

export type CompanyLogoRiskLevel = "low" | "medium" | "high";

export interface CompanyLogoSource {
	key: CompanyKey;
	name: string;
	status: CompanyLogoSourceStatus;
	riskLevel: CompanyLogoRiskLevel;
	sourceUrl: string | null;
	sourceType:
		| "official-brand-resource"
		| "official-media-resource"
		| "official-investor-relations"
		| "official-corporate-page"
		| "not-confirmed";
	assetPath: null;
	lastChecked: "2026-04-30";
	usageNote: string;
}

const noCommittedLogo = "未提交真实 logo 文件；页面使用文字 badge，避免公开仓库批量分发第三方商标素材。";
const trustedOfficial = "已找到官方品牌/媒体资源入口；后续如接入真实 logo，必须从该入口下载并保留来源记录、使用规则和移除路径。";
const officialPageOnly = "仅找到官方页面、IR 或新闻稿中的品牌露出，未确认可下载或可分发授权；不提交真实 logo。";
const blockedWithoutOfficialSource = "未确认官方品牌/媒体资源入口；禁止使用搜索图片、素材站、不明 CDN、Wikimedia、Logopedia 或二次上传资源。";

export const companyLogoSources = {
	"360": { key: "360", name: "360", status: "trusted", riskLevel: "low", sourceUrl: "https://360.cn/about/contactus.html?page=logo", sourceType: "official-brand-resource", assetPath: null, lastChecked: "2026-04-30", usageNote: `${trustedOfficial} ${noCommittedLogo}` },
	"4paradigm": { key: "4paradigm", name: "第四范式", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://www.4paradigm.com/content/details_10_49318.html", sourceType: "official-corporate-page", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
	"58": { key: "58", name: "58同城", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	alibaba: { key: "alibaba", name: "阿里巴巴", status: "trusted", riskLevel: "low", sourceUrl: "https://ali-home.alibaba.com/resource-logos", sourceType: "official-brand-resource", assetPath: null, lastChecked: "2026-04-30", usageNote: `${trustedOfficial} ${noCommittedLogo}` },
	autohome: { key: "autohome", name: "汽车之家", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	baidu: { key: "baidu", name: "百度", status: "trusted", riskLevel: "low", sourceUrl: "https://home.baidu.com/media_resource/show_detail/res_id/2/tab_id/1", sourceType: "official-media-resource", assetPath: null, lastChecked: "2026-04-30", usageNote: `${trustedOfficial} ${noCommittedLogo}` },
	beike: { key: "beike", name: "贝壳", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	bilibili: { key: "bilibili", name: "哔哩哔哩", status: "trusted", riskLevel: "low", sourceUrl: "https://p.bstarstatic.com/fe-lib/images/web/Brand%20Guidelines.pdf", sourceType: "official-brand-resource", assetPath: null, lastChecked: "2026-04-30", usageNote: `${trustedOfficial} ${noCommittedLogo}` },
	"boss-zhipin": { key: "boss-zhipin", name: "BOSS直聘", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	bytedance: { key: "bytedance", name: "字节跳动", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://www.bytedance.com/zh/corporate", sourceType: "official-corporate-page", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
	didi: { key: "didi", name: "滴滴", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	dewu: { key: "dewu", name: "得物", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	eleme: { key: "eleme", name: "饿了么", status: "trusted", riskLevel: "low", sourceUrl: "https://brand.ele.me/", sourceType: "official-brand-resource", assetPath: null, lastChecked: "2026-04-30", usageNote: `${trustedOfficial} ${noCommittedLogo}` },
	"giant-network": { key: "giant-network", name: "巨人网络", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	"hello-group": { key: "hello-group", name: "陌陌 / Hello Group", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://www.immomo.com/", sourceType: "official-corporate-page", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
	"horizon-robotics": { key: "horizon-robotics", name: "地平线", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://www.horizon.cc/", sourceType: "official-corporate-page", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
	iqiyi: { key: "iqiyi", name: "爱奇艺", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://ir.iqiyi.com/", sourceType: "official-investor-relations", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
	ireader: { key: "ireader", name: "掌阅科技", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	jd: { key: "jd", name: "京东", status: "trusted", riskLevel: "low", sourceUrl: "https://jdrdl.jd.com/Brand-Logo.html", sourceType: "official-brand-resource", assetPath: null, lastChecked: "2026-04-30", usageNote: `${trustedOfficial} ${noCommittedLogo}` },
	"kingsoft-office": { key: "kingsoft-office", name: "金山办公", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://www.wps.cn/", sourceType: "official-corporate-page", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
	kuaishou: { key: "kuaishou", name: "快手", status: "trusted", riskLevel: "low", sourceUrl: "https://www.kuaishou.com/official/material-lib", sourceType: "official-brand-resource", assetPath: null, lastChecked: "2026-04-30", usageNote: `${trustedOfficial} ${noCommittedLogo}` },
	"kunlun-tech": { key: "kunlun-tech", name: "昆仑万维", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	"li-auto": { key: "li-auto", name: "理想汽车", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://www.lixiang.com/picture.html", sourceType: "official-media-resource", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
	"lilith-games": { key: "lilith-games", name: "莉莉丝游戏", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	meituan: { key: "meituan", name: "美团", status: "trusted", riskLevel: "low", sourceUrl: "https://www.meituan.com/media", sourceType: "official-media-resource", assetPath: null, lastChecked: "2026-04-30", usageNote: `${trustedOfficial} ${noCommittedLogo}` },
	mihoyo: { key: "mihoyo", name: "米哈游", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	pdd: { key: "pdd", name: "拼多多 / PDD", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://investor.pddholdings.com/", sourceType: "official-investor-relations", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
	"perfect-world": { key: "perfect-world", name: "完美世界", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	qianxin: { key: "qianxin", name: "奇安信", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	qiniu: { key: "qiniu", name: "七牛云", status: "trusted", riskLevel: "low", sourceUrl: "https://developer.qiniu.com/brand", sourceType: "official-brand-resource", assetPath: null, lastChecked: "2026-04-30", usageNote: `${trustedOfficial} ${noCommittedLogo}` },
	sensetime: { key: "sensetime", name: "商汤科技", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://www.sensetime.com/", sourceType: "official-corporate-page", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
	sohu: { key: "sohu", name: "搜狐", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	tal: { key: "tal", name: "好未来", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://www.100tal.com/", sourceType: "official-corporate-page", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
	tencent: { key: "tencent", name: "腾讯", status: "trusted", riskLevel: "low", sourceUrl: "https://www.tencent.net.cn/zh-hk/newsroom/media-resources/logos/", sourceType: "official-media-resource", assetPath: null, lastChecked: "2026-04-30", usageNote: `${trustedOfficial} ${noCommittedLogo}` },
	"trip-com": { key: "trip-com", name: "携程", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://group.trip.com/media", sourceType: "official-media-resource", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
	ucloud: { key: "ucloud", name: "UCloud 优刻得", status: "trusted", riskLevel: "low", sourceUrl: "https://www.ucloud.cn/site/iconDown/icondown.html", sourceType: "official-brand-resource", assetPath: null, lastChecked: "2026-04-30", usageNote: `${trustedOfficial} ${noCommittedLogo}` },
	weibo: { key: "weibo", name: "微博", status: "trusted", riskLevel: "low", sourceUrl: "https://open.weibo.com/wiki/%E5%BE%AE%E5%8D%9A%E6%A0%87%E8%AF%86%E4%B8%8B%E8%BD%BD", sourceType: "official-brand-resource", assetPath: null, lastChecked: "2026-04-30", usageNote: `${trustedOfficial} ${noCommittedLogo}` },
	xiaohongshu: { key: "xiaohongshu", name: "小红书", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	xiaomi: { key: "xiaomi", name: "小米", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://www.mi.com/global/discover/article?id=1660", sourceType: "official-corporate-page", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
	ximalaya: { key: "ximalaya", name: "喜马拉雅", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	yonyou: { key: "yonyou", name: "用友", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://www.yonyou.com/", sourceType: "official-corporate-page", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
	yoozoo: { key: "yoozoo", name: "游族网络", status: "blocked", riskLevel: "high", sourceUrl: null, sourceType: "not-confirmed", assetPath: null, lastChecked: "2026-04-30", usageNote: `${blockedWithoutOfficialSource} ${noCommittedLogo}` },
	yuewen: { key: "yuewen", name: "阅文集团", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://www.yuewen.com/?part=brand", sourceType: "official-corporate-page", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
	zhihu: { key: "zhihu", name: "知乎", status: "official-page-only", riskLevel: "medium", sourceUrl: "https://ir.zhihu.com/", sourceType: "official-investor-relations", assetPath: null, lastChecked: "2026-04-30", usageNote: `${officialPageOnly} ${noCommittedLogo}` },
} as const satisfies Record<CompanyKey, CompanyLogoSource>;

export const trustedCompanyLogoSources = Object.values(companyLogoSources).filter(
	(source) => source.status === "trusted",
);
