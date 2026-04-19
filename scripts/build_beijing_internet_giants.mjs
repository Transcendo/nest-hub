import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = path.join(process.cwd(), "outputs", "beijing-internet-giants");
const outputPath = path.join(outputDir, "beijing-internet-giants-research.xlsx");

const researchDate = "2026-04-19";

const rows = [
  {
    companyCn: "百度",
    companyEn: "Baidu",
    beijingStatus: "北京总部",
    broadCategory: "搜索/AI/基础技术",
    segment: "搜索引擎 / AI / 智能驾驶",
    business:
      "领先的中文互联网搜索与AI公司，业务覆盖搜索、云服务、智能驾驶和大模型等方向。",
    address:
      "北京市海淀区上地十街10号百度大厦；北京市海淀区西北旺东路10号院百度科技园",
    source1Title: "联系我们 | 百度",
    source1Url: "https://home.baidu.com/contact.html",
    source2Title: "Investor FAQs | Baidu Inc",
    source2Url: "https://ir.baidu.com/shareholder-services/investor-faqs/",
    note: "官方页面明确显示北京地址与总部信息。",
  },
  {
    companyCn: "阿里巴巴",
    companyEn: "Alibaba Group",
    beijingStatus: "北京主要办公地",
    broadCategory: "交易/本地生活/出行",
    segment: "电商 / 云 / 数字经济",
    business:
      "综合性数字经济平台，业务覆盖电商、云计算、本地生活、国际业务和数字媒体等。",
    address: "北京市朝阳区来广营东路与广善路交叉口一带；望京仍有多个公开办公点",
    source1Title: "北京推进科技创新中心建设办公室：阿里巴巴北京新园区投用",
    source1Url: "https://www.ncsti.gov.cn/kjdt/yqdy/yqdt/202405/t20240511_156028.html",
    source2Title: "Alibaba Group Investor Relations",
    source2Url: "https://www.alibabagroup.com/en-US/ir/home",
    note: "政府公开信息称阿里巴巴北京新园区投用；考虑集团全球总部不在北京，本表按北京主要办公地处理。",
  },
  {
    companyCn: "京东",
    companyEn: "JD.com",
    beijingStatus: "北京总部",
    broadCategory: "交易/本地生活/出行",
    segment: "电商 / 供应链科技",
    business:
      "以供应链为核心的技术与服务企业，业务覆盖零售、物流、健康、工业、国际业务等。",
    address: "JD Building, No. 18 Kechuang 11 Street, BDA, Beijing, The People's Republic of China, 101111",
    source1Title: "Contact Us | JD.com, Inc.",
    source1Url: "https://corporate.jd.com/contactUs",
    source2Title: "About JD.com | JD.Com, Inc.",
    source2Url: "https://ir.jd.com/about-JD",
    note: "官方联系页直接披露总部地址。",
  },
  {
    companyCn: "美团",
    companyEn: "Meituan",
    beijingStatus: "北京总部",
    broadCategory: "交易/本地生活/出行",
    segment: "本地生活 / 零售科技",
    business: "以“零售 + 科技”为战略的科技零售公司，覆盖外卖、到店、酒旅、即时零售等业务。",
    address: "Block B&C, Hengjiweiye Building, No.4 Wang Jing East Road, Chaoyang District, Beijing, China",
    source1Title: "Meituan 2024 Annual Report",
    source1Url: "https://media-meituan.todayir.com/202505020944401774654665_en.pdf",
    source2Title: "Investor Relations - Meituan",
    source2Url: "https://www.meituan.com/en-US/investor-relations",
    note: "年报投资者联系信息披露北京望京东路地址。",
  },
  {
    companyCn: "腾讯",
    companyEn: "Tencent",
    beijingStatus: "北京主要办公地",
    broadCategory: "内容平台/社区",
    segment: "社交 / 游戏 / 广告 / 云",
    business: "综合互联网平台公司，业务覆盖社交、内容、游戏、广告、金融科技与云服务等。",
    address: "北京市海淀区中关村软件园二期西扩腾讯北京总部大楼",
    source1Title: "北京市建筑设计研究院：腾讯北京总部大楼",
    source1Url: "https://www.biad.com.cn/project/id/25/",
    source2Title: "Tencent ESG Report 2021",
    source2Url: "https://static.www.tencent.com/uploads/2022/04/16/56e61654efa69f7503f997520a8f2766.pdf",
    note: "腾讯集团总部在深圳；本表仅收录其北京总部办公楼/主要办公地。",
  },
  {
    companyCn: "滴滴",
    companyEn: "DiDi Global Inc.",
    beijingStatus: "北京主要办公地",
    broadCategory: "交易/本地生活/出行",
    segment: "出行 / 交通平台",
    business: "全球化移动出行平台，核心业务围绕网约车、顺风车、代驾、两轮出行等展开。",
    address: "DiDi Xinchenghai, Building 1, Yard 6, North Ring Road, Tangjialing, Haidian District, Beijing, People's Republic of China",
    source1Title: "DiDi Global Inc. - Investor Contacts",
    source1Url: "https://ir.didiglobal.com/faqs-and-resources/investor-contacts/default.aspx",
    source2Title: "DiDi Global Inc. - 20-F",
    source2Url: "https://ir.didiglobal.com/sec-filings/sec-filing/20-f/0001104659-25-047255",
    note: "官方投资者页面披露 principal office 地址。",
  },
  {
    companyCn: "字节跳动",
    companyEn: "ByteDance",
    beijingStatus: "北京主要办公地",
    broadCategory: "内容平台/社区",
    segment: "短视频 / 内容平台 / AI",
    business:
      "全球化内容与平台公司，产品覆盖抖音、TikTok、飞书、豆包、剪映等内容与效率工具。",
    address: "Building 1, Dazhongsi Square, ByteDance, Beijing, China",
    source1Title: "ByteDance - Inspire Creativity, Enrich Life",
    source1Url: "https://www.bytedance.com/en/",
    source2Title: "ByteDance SE Lab",
    source2Url: "https://se-research.bytedance.com/index.html",
    note: "官方站点未在首页明确写总部，但官方北京地址与北京研发组织可核验。",
  },
  {
    companyCn: "快手",
    companyEn: "Kuaishou Technology",
    beijingStatus: "北京总部",
    broadCategory: "内容平台/社区",
    segment: "短视频 / 直播 / 电商",
    business: "领先的内容社区与社交平台，围绕短视频、直播和电商生态构建业务。",
    address: "6, Shangdi West Road, Haidian District, Beijing, the PRC",
    source1Title: "Investor Relations | Kuaishou Technology",
    source1Url: "https://ir.kuaishou.com/",
    source2Title: "Kuaishou Technology Annual Report 2024",
    source2Url:
      "https://ir.kuaishou.com/system/files-encrypted/nasdaq_kms/assets/2025/04/25/19-09-37/Annual%20report%202024_EN.pdf",
    note: "年报明确披露 Head Office and Principal Place of Business in the PRC。",
  },
  {
    companyCn: "知乎",
    companyEn: "Zhihu Inc.",
    beijingStatus: "北京总部",
    broadCategory: "内容平台/社区",
    segment: "知识社区 / 内容平台",
    business: "领先的在线内容社区，围绕问答、会员、搜索、热榜和多元内容形式展开。",
    address: "NO. 18 Xueqing Road, Haidian District, Beijing 100083, China",
    source1Title: "Investor Resources | Zhihu",
    source1Url: "https://ir.zhihu.com/en/investor-resources/",
    source2Title: "联系我们 - 知乎",
    source2Url: "https://www.zhihu.com/contact",
    note: "投资者关系页面直接披露公司总部地址。",
  },
  {
    companyCn: "爱奇艺",
    companyEn: "iQIYI, Inc.",
    beijingStatus: "北京主要办公地",
    broadCategory: "内容平台/社区",
    segment: "长视频 / 在线娱乐",
    business: "中国领先的线上娱乐视频服务商，核心业务为长视频内容与会员服务。",
    address: "21, North Road of Workers’ Stadium, Chaoyang District, Beijing 100027, People's Republic of China",
    source1Title: "Company Overview | iQIYI, Inc.",
    source1Url: "https://ir.iqiyi.com/corporate-profile",
    source2Title: "iQIYI Files Its Annual Report on Form 20-F",
    source2Url: "https://ir.iqiyi.com/node/9666/pdf",
    note: "年报和公司资料均披露北京办公地址。",
  },
  {
    companyCn: "小米",
    companyEn: "Xiaomi Corporation",
    beijingStatus: "北京总部",
    broadCategory: "消费电子/IoT",
    segment: "智能硬件 / 互联网生态",
    business:
      "以智能手机和智能硬件为核心、连接 IoT 平台的消费电子与智能制造公司。",
    address: "Xiaomi Campus, Anningzhuang Road, Haidian District, Beijing",
    source1Title: "IR Contacts | Xiaomi Corporation",
    source1Url: "https://ir.mi.com/investor-resources/ir-contacts/",
    source2Title: "Xiaomi United States - About Us",
    source2Url: "https://www.mi.com/us/about/",
    note: "官方投资者联系页披露北京园区地址。",
  },
  {
    companyCn: "微博",
    companyEn: "Weibo Corporation",
    beijingStatus: "北京主要办公地",
    broadCategory: "内容平台/社区",
    segment: "社交媒体 / 广告",
    business: "以公开社交媒体和内容分发为核心的平台公司，商业化主要来自广告和营销服务。",
    address: "8/F, QIHAO Plaza, No.8 Xinyuan S. Road, Chaoyang District, Beijing 100027, PRC",
    source1Title: "Weibo Corporation Form 6-K",
    source1Url: "https://www.sec.gov/Archives/edgar/data/0001595761/000110465925034868/tm2511937d1_6k.htm",
    source2Title: "Weibo Corporation Investor Relations",
    source2Url: "https://weibocorporation.gcs-web.com/",
    note: "SEC 文件披露 principal executive offices 在北京新源南路启皓广场。",
  },
  {
    companyCn: "搜狐",
    companyEn: "Sohu.com Limited",
    beijingStatus: "北京总部",
    broadCategory: "内容平台/社区",
    segment: "门户媒体 / 在线游戏",
    business: "中文互联网媒体平台和游戏业务集团，覆盖搜狐新闻、搜狐视频、门户和畅游相关业务。",
    address: "Sohu.com Media Plaza, Block 3, No.2, Kexueyuan South Road, Haidian District, Beijing 100190, PRC",
    source1Title: "Sohu.com Annual Report on Form 20-F",
    source1Url: "https://investors.sohu.com/static-files/2bf6b8ed-66b2-4d70-9a48-a195d225d48b",
    source2Title: "Investor Relations | SOHU.com Limited",
    source2Url: "https://investors.sohu.com/",
    note: "年报披露 principal executive offices 在北京海淀搜狐媒体大厦。",
  },
  {
    companyCn: "汽车之家",
    companyEn: "Autohome Inc.",
    beijingStatus: "北京总部",
    broadCategory: "房产/招聘/垂直平台",
    segment: "汽车媒体 / 交易线索",
    business: "汽车消费者在线服务平台，覆盖汽车内容、线索、数据和交易服务。",
    address: "18th Floor Tower B, CEC Plaza, 3 Dan Ling Street, Haidian District, Beijing, PRC",
    source1Title: "Contact Us | Autohome, Inc.",
    source1Url: "https://ir.autohome.com.cn/contact-us",
    source2Title: "Autohome Annual Report",
    source2Url: "https://ir.autohome.com.cn/static-files/6cf495ee-87f4-4ce2-ae39-fa1e41ea5874",
    note: "投资者联系页明确写明 Beijing, China headquarters。",
  },
  {
    companyCn: "BOSS直聘",
    companyEn: "KANZHUN LIMITED / BOSS Zhipin",
    beijingStatus: "北京总部",
    broadCategory: "房产/招聘/垂直平台",
    segment: "在线招聘 / 人力资源科技",
    business: "在线招聘平台，核心产品为 BOSS 直聘，连接求职者与招聘方。",
    address: "21/F, GrandyVic Building, Taiyanggong Middle Road, Chaoyang District, Beijing 100020, PRC",
    source1Title: "KANZHUN LIMITED 2024 Form 20-F",
    source1Url: "https://www.sec.gov/Archives/edgar/data/1842827/000141057825000682/bz-20241231x20f.htm",
    source2Title: "Investor Relations | Kanzhun Limited",
    source2Url: "https://ir.zhipin.com/",
    note: "年报披露 principal executive offices 在北京太阳宫。",
  },
  {
    companyCn: "58同城",
    companyEn: "58.com",
    beijingStatus: "北京主要办公地",
    broadCategory: "房产/招聘/垂直平台",
    segment: "分类信息 / 招聘 / 房产",
    business: "分类信息平台，业务覆盖招聘、房产、本地服务和二手交易等场景。",
    address: "Building 105, 10 Jiuxianqiao North Road Jia, Chaoyang District, Beijing 100015, PRC",
    source1Title: "58.com SEC filing",
    source1Url: "https://edgar.secdatabase.com/2518/110465920005100/filing-main.htm",
    source2Title: "58同城",
    source2Url: "https://www.58.com/",
    note: "公司已私有化；地址采用其公开 SEC 文件中的 principal executive offices。",
  },
  {
    companyCn: "陌陌 / Hello Group",
    companyEn: "Hello Group Inc.",
    beijingStatus: "北京总部",
    broadCategory: "内容平台/社区",
    segment: "社交 / 直播 / 线上娱乐",
    business: "在线社交与娱乐公司，产品包括陌陌、探探等社交应用。",
    address: "20th Floor, Block B, Tower 2, Wangjing SOHO, No.1 Futongdong Street, Chaoyang District, Beijing 100102, PRC",
    source1Title: "Contact old | Hello Group",
    source1Url: "https://www.hellogroup.com/contactold",
    source2Title: "Hello Group Files Annual Report on Form 20-F",
    source2Url: "https://ir.hellogroup.com/news-releases/news-release-details/hello-group-files-annual-report-form-20-f-fiscal-year-2024",
    note: "官网联系页和年报公告均披露北京望京 SOHO 地址。",
  },
  {
    companyCn: "贝壳",
    companyEn: "KE Holdings Inc. / Beike",
    beijingStatus: "北京总部",
    broadCategory: "房产/招聘/垂直平台",
    segment: "房产交易 / 居住服务",
    business: "线上线下一体化房产交易和居住服务平台，旗下包括链家和贝壳平台。",
    address: "Oriental Electronic Technology Building, No.2 Chuangye Road, Haidian District, Beijing, PRC",
    source1Title: "KE Holdings Inc. 2024 Form 20-F",
    source1Url: "https://www.sec.gov/Archives/edgar/data/1809587/000141057825000783/beke-20241231x20f.htm",
    source2Title: "Investor Relations - KE Holdings Inc.",
    source2Url: "https://investors.ke.com/",
    note: "年报披露 principal executive offices 在北京海淀东方电子科技大厦。",
  },
  {
    companyCn: "好未来",
    companyEn: "TAL Education Group",
    beijingStatus: "北京总部",
    broadCategory: "教育科技",
    segment: "教育科技 / 学习服务",
    business: "智能学习解决方案提供商，业务覆盖学习内容、学习硬件和教育服务等。",
    address: "TAL Building No.1, Courtyard No.9, Qixin Middle Street, Changping District, Beijing, China",
    source1Title: "TAL InvestorRoom - Annual General Meeting",
    source1Url: "https://ir.100tal.com/Annual-General-Meeting",
    source2Title: "TAL Education Group 2025 Form 20-F",
    source2Url: "https://www.sec.gov/Archives/edgar/data/1499620/000141057825001415/tal-20250228x20f.htm",
    note: "官方股东大会页面和年报披露北京昌平 TAL Building 地址。",
  },
  {
    companyCn: "金山办公",
    companyEn: "Kingsoft Office",
    beijingStatus: "北京总部",
    broadCategory: "企业服务/办公软件",
    segment: "办公软件 / AI 协作",
    business: "办公软件与数字办公服务公司，产品包括 WPS Office、WPS 365 和 WPS AI。",
    address: "北京市海淀区西二旗中路33号院小米科技园D栋金山软件集团大厦",
    source1Title: "金山办公投资者关系 - 取得联系",
    source1Url: "https://ir.wps.cn/contact.html",
    source2Title: "金山办公官方网站",
    source2Url: "https://www.wps.cn/",
    note: "官方投资者关系页披露企业和投资者联络地址。",
  },
  {
    companyCn: "用友",
    companyEn: "Yonyou",
    beijingStatus: "北京总部",
    broadCategory: "企业服务/办公软件",
    segment: "企业软件 / SaaS / 数智化服务",
    business: "企业数智化软件和云服务提供商，覆盖财务、人力、供应链、采购和协同等场景。",
    address: "北京市海淀区北清路68号用友产业园",
    source1Title: "用友联系方式 - 用友集团官网",
    source1Url: "https://www.yonyou.com/yy/contact.html",
    source2Title: "用友集团官网",
    source2Url: "https://www.yonyou.com/",
    note: "官方联系页披露北京海淀北清路用友产业园地址。",
  },
  {
    companyCn: "360",
    companyEn: "Qihoo 360 / 360 Security Center",
    beijingStatus: "北京主要办公地",
    broadCategory: "安全/企业安全",
    segment: "网络安全 / 安全服务",
    business: "中国领先的互联网安全服务提供商，业务覆盖安全产品、安全大脑和政企安全。",
    address: "北京市朝阳区酒仙桥路6号院电子城国际电子总部",
    source1Title: "About Qihoo 360_360Safe Center",
    source1Url: "https://www.360.cn/about/index_eng.html",
    source2Title: "联系我们",
    source2Url: "https://www.360.cn/about/contactus.html",
    note: "官方页面更偏向产品与联系信息，地址字段按公开联系信息填写。",
  },
  {
    companyCn: "奇安信",
    companyEn: "QIANXIN",
    beijingStatus: "北京总部",
    broadCategory: "安全/企业安全",
    segment: "网络安全 / 政企安全",
    business: "网络安全公司，面向政企客户提供安全产品、服务和攻防能力。",
    address: "北京市西城区新动力金融科技中心7层；北京市西城区西直门外南路26号院1号楼",
    source1Title: "投资者关系 - 奇安信",
    source1Url: "https://www.qianxin.com/investment/index",
    source2Title: "公司机构 - 奇安信",
    source2Url: "https://hk.qianxin.com/about/headquarters",
    note: "官方投资者关系和机构页面披露北京西城办公地址。",
  },
  {
    companyCn: "第四范式",
    companyEn: "4Paradigm",
    beijingStatus: "北京总部",
    broadCategory: "企业服务/办公软件",
    segment: "企业 AI / 决策智能",
    business: "企业级 AI 平台与行业智能化解决方案提供商。",
    address: "Block A, Hongyuan New Era, Shangdi West Road, Haidian District, Beijing, PRC",
    source1Title: "4Paradigm 2024 ESG Report",
    source1Url: "https://ir.4paradigm.com/en/upload/file/2025/0425/2025042500793.pdf",
    source2Title: "4Paradigm Investor Relations",
    source2Url: "https://ir.4paradigm.com/en/",
    note: "港交所披露文件和投资者关系材料显示北京上地地址。",
  },
  {
    companyCn: "地平线",
    companyEn: "Horizon Robotics",
    beijingStatus: "北京总部",
    broadCategory: "智能汽车/自动驾驶",
    segment: "智能驾驶计算 / 车载 AI",
    business: "智能驾驶计算方案公司，提供车载芯片、算法和辅助驾驶解决方案。",
    address: "Unit No.1, 3rd Floor, Building No.2, Fenghao East Road No.9, Haidian District, Beijing, China",
    source1Title: "Horizon Robotics Privacy Policy",
    source1Url: "https://en.horizon.auto/privacy-policy/",
    source2Title: "Contact Us - Horizon Robotics",
    source2Url: "https://en.horizon.auto/contact-us/",
    note: "官方隐私政策披露北京地平线信息技术有限公司注册地址和通信地址。",
  },
  {
    companyCn: "理想汽车",
    companyEn: "Li Auto Inc.",
    beijingStatus: "北京总部",
    broadCategory: "智能汽车/自动驾驶",
    segment: "智能汽车 / 车载软件",
    business: "智能电动车公司，研发、设计、生产和销售家庭用户导向的新能源车。",
    address: "Li Auto Inc. R&D Headquarters, Number 11 of Wenliang Street, Shunyi District, Beijing 101399, PRC",
    source1Title: "Investor Resources | Li Auto Inc.",
    source1Url: "https://ir.lixiang.com/investor-faqs",
    source2Title: "Li Auto Inc. 2024 Form 20-F",
    source2Url: "https://www.sec.gov/Archives/edgar/data/1791706/000141057825000678/li-20241231x20f.htm",
    note: "官方投资者 FAQ 明确写明 headquarters located in Beijing 及研发总部地址。",
  },
  {
    companyCn: "昆仑万维",
    companyEn: "Kunlun Tech",
    beijingStatus: "北京总部",
    broadCategory: "内容平台/社区",
    segment: "AI / 内容娱乐 / 海外社交",
    business: "全球化互联网和 AI 公司，业务覆盖 AI、信息分发、社交娱乐和游戏等。",
    address: "北京市东城区西总布胡同46号明阳国际中心B座",
    source1Title: "投资者关系 - 昆仑万维",
    source1Url: "https://www.kunlun.com/investor/",
    source2Title: "昆仑万维集团官方网站",
    source2Url: "https://www.kunlun.com/",
    note: "官网投资者关系页和页脚联系信息披露北京东城地址。",
  },
  {
    companyCn: "完美世界",
    companyEn: "Perfect World",
    beijingStatus: "北京总部",
    broadCategory: "内容平台/社区",
    segment: "游戏 / 影视内容",
    business: "文娱内容公司，业务覆盖游戏研发运营、影视内容和相关文化娱乐业务。",
    address: "北京市朝阳区北苑路86号院306号完美世界大厦",
    source1Title: "完美世界 - 联系我们",
    source1Url: "https://www.pwrd.com/mobile/zh/contactus.html",
    source2Title: "完美世界 - 公司介绍",
    source2Url: "https://www.wanmei.com/zh/intro.html",
    note: "官网联系页披露邮寄地址。",
  },
  {
    companyCn: "掌阅科技",
    companyEn: "iReader Technology",
    beijingStatus: "北京总部",
    broadCategory: "内容平台/社区",
    segment: "数字阅读 / 内容平台",
    business: "数字阅读平台和内容服务公司，围绕掌阅 App、内容版权和阅读硬件展开。",
    address: "中国北京市朝阳区四惠东四惠大厦二层2029E",
    source1Title: "掌阅科技 2024 年年度报告",
    source1Url: "https://big5.sse.com.cn/site/cht/www.sse.com.cn/disclosure/listedinfo/announcement/c/new/2025-04-19/603533_20250419_BGWM.pdf",
    source2Title: "掌阅科技官网",
    source2Url: "https://www.zhangyue.com/",
    note: "年报披露董事会秘书和证券事务代表联系地址。",
  },
];

const categoryOrder = [
  "内容平台/社区",
  "交易/本地生活/出行",
  "房产/招聘/垂直平台",
  "企业服务/办公软件",
  "消费电子/IoT",
  "搜索/AI/基础技术",
  "安全/企业安全",
  "教育科技",
  "智能汽车/自动驾驶",
];

const dataRowCount = rows.length + 1;
const dataRange = `A1:M${dataRowCount}`;
const categoryStartRow = 9;
const categoryEndRow = categoryStartRow + categoryOrder.length - 1;
const categoryTotalRow = categoryEndRow + 1;
const summaryBodyEndRow = Math.max(20, categoryTotalRow + 1);

const workbook = Workbook.create();

const summary = workbook.worksheets.add("摘要");
const data = workbook.worksheets.add("公司清单");
const notes = workbook.worksheets.add("说明");

// Summary sheet
summary.getRange("A1:M1").merge();
summary.getRange("A1").values = [["北京互联网大厂调研（扩展版）"]];
summary.getRange("A1:M1").format = {
  fill: "#0F172A",
  font: { color: "#FFFFFF", bold: true, size: 18 },
  horizontalAlignment: "center",
  verticalAlignment: "middle",
  wrapText: true,
};
summary.getRange("A2:M2").merge();
summary.getRange("A2").values = [[`研究日期：${researchDate} | 口径：总部/主要办公地在北京、且为互联网平台/科技公司`]];
summary.getRange("A2:M2").format = {
  fill: "#E2E8F0",
  font: { color: "#334155", size: 10 },
  horizontalAlignment: "center",
  verticalAlignment: "middle",
  wrapText: true,
};

const cardRanges = ["A4:C6", "D4:F6", "G4:I6", "J4:L6"];
const cardFormulas = [
  `="样本公司"&CHAR(10)&(COUNTA('公司清单'!A:A)-1)`,
  `="北京总部"&CHAR(10)&COUNTIF('公司清单'!D:D,"北京总部")`,
  `="北京主要办公地"&CHAR(10)&COUNTIF('公司清单'!D:D,"北京主要办公地")`,
  `="赛道大类"&CHAR(10)&COUNTA(A${categoryStartRow}:A${categoryEndRow})`,
];

cardRanges.forEach((addr, idx) => {
  summary.getRange(addr).merge();
  summary.getRange(addr.split(":")[0]).formulas = [[cardFormulas[idx]]];
  summary.getRange(addr).format = {
    fill:
      idx === 0
        ? "#DBEAFE"
        : idx === 1
          ? "#DCFCE7"
          : idx === 2
            ? "#FEF3C7"
            : "#E0E7FF",
    font: { color: "#0F172A", bold: true, size: 14 },
    horizontalAlignment: "center",
    verticalAlignment: "middle",
    wrapText: true,
  };
});

summary.getRange(`A8:B${categoryEndRow}`).values = [
  ["赛道大类", "公司数"],
  ...categoryOrder.map((category, index) => [
    category,
    `=COUNTIF('公司清单'!$E:$E,A${categoryStartRow + index})`,
  ]),
];
summary.getRange(`A8:B${categoryEndRow}`).format = {
  wrapText: true,
  verticalAlignment: "middle",
};
summary.getRange("A8:B8").format = {
  fill: "#1E293B",
  font: { color: "#FFFFFF", bold: true },
  horizontalAlignment: "center",
  verticalAlignment: "middle",
  wrapText: true,
};
summary.getRange(`A${categoryStartRow}:B${categoryEndRow}`).format.horizontalAlignment = "center";
summary.getRange(`A${categoryStartRow}:A${categoryEndRow}`).format.horizontalAlignment = "left";
summary.getRange(`A${categoryTotalRow}:B${categoryTotalRow}`).values = [
  ["总计", `=SUM(B${categoryStartRow}:B${categoryEndRow})`],
];
summary.getRange(`A${categoryTotalRow}:B${categoryTotalRow}`).format = {
  fill: "#F8FAFC",
  font: { bold: true },
  horizontalAlignment: "center",
  verticalAlignment: "middle",
};
summary.getRange(`D8:L${summaryBodyEndRow}`).format.fill = "#FFFFFF";
summary.getRange(`D8:L${summaryBodyEndRow}`).format.borders = { preset: "outside", style: "thin", color: "#CBD5E1" };

const summaryChart = summary.charts.add("ColumnClustered", summary.getRange(`A8:B${categoryEndRow}`), "Auto");
summaryChart.title.text = "赛道分布";
summaryChart.setPosition(summary.getRange(`D8:L${summaryBodyEndRow}`));
summaryChart.hasLegend = false;

summary.getRange("A22:M23").merge();
summary.getRange("A22").values = [[
  "说明：北京定位区分“北京总部”和“北京主要办公地”；后者仅表示官方页披露北京 principal office / office address。",
]];
summary.getRange("A22:M23").format = {
  fill: "#F8FAFC",
  font: { color: "#475569", size: 10 },
  horizontalAlignment: "left",
  verticalAlignment: "top",
  wrapText: true,
};
summary.getRange(`A1:M${summaryBodyEndRow}`).format.rowHeightPx = 26;
summary.getRange("A4:M6").format.rowHeightPx = 56;
summary.getRange(`A8:B${categoryTotalRow}`).format.rowHeightPx = 24;
summary.getRange("A22:M23").format.rowHeightPx = 36;

summary.getRange(`A1:M${summaryBodyEndRow}`).format.columnWidthPx = 120;
summary.getRange(`A1:C${summaryBodyEndRow}`).format.columnWidthPx = 160;
summary.getRange(`D1:F${summaryBodyEndRow}`).format.columnWidthPx = 160;
summary.getRange(`G1:I${summaryBodyEndRow}`).format.columnWidthPx = 160;
summary.getRange(`J1:L${summaryBodyEndRow}`).format.columnWidthPx = 160;
summary.getRange(`M1:M${summaryBodyEndRow}`).format.columnWidthPx = 140;
summary.getRange(`A8:B${categoryTotalRow}`).format.columnWidthPx = 170;
summary.getRange(`A8:B${categoryTotalRow}`).format.rowHeightPx = 28;

// Data sheet
const headers = [
  "序号",
  "公司中文名",
  "英文名/品牌",
  "北京定位",
  "赛道大类",
  "细分赛道",
  "核心业务一句话",
  "北京地址/所在地",
  "主要来源标题",
  "主要来源链接",
  "次要来源标题",
  "次要来源链接",
  "备注",
];

data.getRange(dataRange).values = [
  headers,
  ...rows.map((row, index) => [
    index + 1,
    row.companyCn,
    row.companyEn,
    row.beijingStatus,
    row.broadCategory,
    row.segment,
    row.business,
    row.address,
    row.source1Title,
    row.source1Url,
    row.source2Title,
    row.source2Url,
    row.note,
  ]),
];

data.getRange(dataRange).format = {
  wrapText: true,
  verticalAlignment: "top",
};
data.getRange("A1:M1").format = {
  fill: "#0F172A",
  font: { color: "#FFFFFF", bold: true, size: 10 },
  horizontalAlignment: "center",
  verticalAlignment: "middle",
  wrapText: true,
};
data.getRange(`A2:M${dataRowCount}`).format.font = { size: 10 };
data.getRange(`A2:A${dataRowCount}`).format.horizontalAlignment = "center";
data.getRange(`D2:F${dataRowCount}`).format.horizontalAlignment = "center";
data.getRange(dataRange).format.rowHeightPx = 68;
data.getRange("A1:M1").format.rowHeightPx = 36;

data.getRange("A:A").format.columnWidthPx = 48;
data.getRange("B:B").format.columnWidthPx = 86;
data.getRange("C:C").format.columnWidthPx = 122;
data.getRange("D:D").format.columnWidthPx = 112;
data.getRange("E:E").format.columnWidthPx = 124;
data.getRange("F:F").format.columnWidthPx = 142;
data.getRange("G:G").format.columnWidthPx = 280;
data.getRange("H:H").format.columnWidthPx = 250;
data.getRange("I:I").format.columnWidthPx = 160;
data.getRange("J:J").format.columnWidthPx = 260;
data.getRange("K:K").format.columnWidthPx = 160;
data.getRange("L:L").format.columnWidthPx = 260;
data.getRange("M:M").format.columnWidthPx = 180;

data.freezePanes.freezeRows(1);
data.tables.add(dataRange, true);

// Notes sheet
notes.getRange("A1:H1").merge();
notes.getRange("A1").values = [["口径说明"]];
notes.getRange("A1:H1").format = {
  fill: "#0F172A",
  font: { color: "#FFFFFF", bold: true, size: 16 },
  horizontalAlignment: "center",
  verticalAlignment: "middle",
};

const noteRows = [
  ["研究日期", researchDate],
  ["样本范围", "优先选取总部或主要办公地在北京、且为互联网平台/科技领域具有代表性的公司。"],
  ["北京定位", "“北京总部”表示官方页面明确写明总部/主办公地址在北京；“北京主要办公地”表示公开信息明确披露北京 principal office 或办公地址，但未在本表进一步强行等同法定总部。"],
  ["地址口径", "优先使用官网、投资者关系页、年报、隐私政策、联系页等官方页面披露的北京地址。"],
  ["来源口径", "每家公司保留两条最相关的官方来源，便于后续追溯与补充。"],
];

notes.getRange(`A3:B${2 + noteRows.length}`).values = noteRows;
notes.getRange(`A3:B${2 + noteRows.length}`).format = {
  wrapText: true,
  verticalAlignment: "top",
};
notes.getRange(`A3:A${2 + noteRows.length}`).format = {
  fill: "#E2E8F0",
  font: { bold: true },
  horizontalAlignment: "center",
  verticalAlignment: "middle",
};
notes.getRange(`A3:B${2 + noteRows.length}`).format.rowHeightPx = 42;
notes.getRange("A:A").format.columnWidthPx = 110;
notes.getRange("B:B").format.columnWidthPx = 760;

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

console.log(outputPath);
