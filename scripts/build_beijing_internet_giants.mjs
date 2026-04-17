import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = path.join(process.cwd(), "outputs", "beijing-internet-giants");
const outputPath = path.join(outputDir, "beijing-internet-giants-research.xlsx");

const researchDate = "2026-04-17";

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
    address: "北京市朝阳区望京东路4号恒基伟业大厦C座2层（公开隐私联系地址）",
    source1Title: "美团 - 帮大家吃得更好，生活更好",
    source1Url: "https://www.meituan.com/",
    source2Title: "美团隐私政策",
    source2Url:
      "https://rules-center.meituan.com/v1/mss_7482cc6672ce4e76a32d7d7c3161ac24/rules-center/bce22151-92cd-4f9c-bf52-6c96168b1938-2632250/%E7%BE%8E%E5%9B%A2%E9%9A%90%E7%A7%81%E6%94%BF%E7%AD%96-2022%E5%B9%B43%E6%9C%88%E7%89%88%E6%9C%AC.pdf?openInApp=2",
    note: "地址来自公开隐私政策中的联系信息，适合作为北京办公/联系地址使用。",
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
];

const categoryOrder = [
  "内容平台/社区",
  "交易/本地生活/出行",
  "消费电子/IoT",
  "搜索/AI/基础技术",
  "安全/企业安全",
];

const workbook = Workbook.create();

const summary = workbook.worksheets.add("摘要");
const data = workbook.worksheets.add("公司清单");
const notes = workbook.worksheets.add("说明");

// Summary sheet
summary.getRange("A1:M1").merge();
summary.getRange("A1").values = [["北京互联网大厂调研（第一版）"]];
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
  `="赛道大类"&CHAR(10)&COUNTA(A9:A13)`,
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

summary.getRange("A8:B13").values = [
  ["赛道大类", "公司数"],
  ...categoryOrder.map((category) => [category, `=COUNTIF('公司清单'!$E:$E,A${9 + categoryOrder.indexOf(category)})`]),
];
summary.getRange("A8:B13").format = {
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
summary.getRange("A9:B13").format.horizontalAlignment = "center";
summary.getRange("A9:A13").format.horizontalAlignment = "left";
summary.getRange("A14:B14").values = [["总计", "=SUM(B9:B13)"]];
summary.getRange("A14:B14").format = {
  fill: "#F8FAFC",
  font: { bold: true },
  horizontalAlignment: "center",
  verticalAlignment: "middle",
};
summary.getRange("D8:L20").format.fill = "#FFFFFF";
summary.getRange("D8:L20").format.borders = { preset: "outside", style: "thin", color: "#CBD5E1" };

const summaryChart = summary.charts.add("ColumnClustered", summary.getRange("A8:B13"), "Auto");
summaryChart.title.text = "赛道分布";
summaryChart.setPosition(summary.getRange("D8:L20"));
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
summary.getRange("A1:M20").format.rowHeightPx = 26;
summary.getRange("A4:M6").format.rowHeightPx = 56;
summary.getRange("A8:B14").format.rowHeightPx = 24;
summary.getRange("A22:M23").format.rowHeightPx = 36;

summary.getRange("A1:M20").format.columnWidthPx = 120;
summary.getRange("A1:C20").format.columnWidthPx = 160;
summary.getRange("D1:F20").format.columnWidthPx = 160;
summary.getRange("G1:I20").format.columnWidthPx = 160;
summary.getRange("J1:L20").format.columnWidthPx = 160;
summary.getRange("M1:M20").format.columnWidthPx = 140;
summary.getRange("A8:B14").format.columnWidthPx = 170;
summary.getRange("A8:B14").format.rowHeightPx = 28;

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

data.getRange("A1:M11").values = [
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

data.getRange("A1:M11").format = {
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
data.getRange("A2:M11").format.font = { size: 10 };
data.getRange("A2:A11").format.horizontalAlignment = "center";
data.getRange("D2:F11").format.horizontalAlignment = "center";
data.getRange("A1:M11").format.rowHeightPx = 68;
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
data.tables.add("A1:M11", true);

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
