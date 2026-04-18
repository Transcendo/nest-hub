<p align="center">
  <img src="public/branding/nest-hub-logo.svg" alt="NestHub" width="96" />
</p>

<h1 align="center">NestHub</h1>

<p align="center">
  面向租房决策的城市内容站，把通用避坑流程、城市总览和公司办公区租房指南整理成可持续维护的知识库。
</p>

[![Website](https://img.shields.io/badge/site-nest--hub.eggcampus.com-0f172a?style=flat)](https://nest-hub.eggcampus.com)
[![GitLab](https://img.shields.io/badge/repo-gitlab-fc6d26?style=flat&logo=gitlab&logoColor=white)](https://gitlab.eggcampus.com/ec/nest-hub)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat)](LICENSE)

## 项目定位

NestHub 当前是一个基于 **Next.js + Fumadocs** 的静态内容站，用来发布结构化租房参考内容。

它重点解决三类问题：

- **先避坑**：把租前准备、实地看房、签约谈判、入住生活、常见陷阱和维权路径整理成通用流程。
- **按城市进入**：北京、上海、杭州、深圳作为一级城市入口，方便后续持续扩展。
- **按办公区落地**：已收录的公司指南会围绕通勤、地铁、班车、小区和签约风险组织内容。

当前内容以北京和通用避坑指南为主，上海已有张江方向入口，杭州和深圳保留稳定城市入口用于后续扩展。

线上默认地址：<https://nest-hub.eggcampus.com>

## 当前内容结构

```text
content/docs/
├─ avoid-pitfalls/        # 通用租房避坑指南
├─ beijing/               # 北京城市总览与公司租房指南
├─ shanghai/              # 上海城市入口与张江方向内容
├─ hangzhou/              # 杭州城市入口，待继续补充
└─ shenzhen/              # 深圳城市入口，待继续补充
```

北京当前收录：

- 京东总部租房指南
- 阿里巴巴北京租房指南
- 字节跳动北京租房指南
- 百度北京租房指南
- 小米北京租房指南
- 快手北京租房指南

## 技术栈

- **框架**：Next.js 16，App Router
- **内容系统**：Fumadocs + MDX
- **样式**：Tailwind CSS 4
- **UI 基础**：Fumadocs UI、Radix UI、Lucide React
- **运行时**：React 19
- **包管理器**：pnpm 10
- **部署形态**：Next.js static export，输出到 `out/`

## 本地开发

推荐使用 Node.js 22，与当前 CI 构建环境保持一致。

```bash
pnpm install
pnpm dev
```

打开本地站点：

- 首页：<http://localhost:3000>
- 文档入口：<http://localhost:3000/docs>
- 避坑指南：<http://localhost:3000/docs/avoid-pitfalls>

## 常用命令

```bash
pnpm dev          # 启动本地开发服务器
pnpm build        # 构建静态站点，输出到 out/
pnpm start        # 本地预览 out/ 静态产物
pnpm typecheck    # TypeScript 类型检查
```

## 环境变量

生产环境的 metadata、sitemap 和 OG 链接依赖：

```bash
NEXT_PUBLIC_SITE_URL=https://nest-hub.eggcampus.com
```

## 目录说明

```text
app/
├─ page.tsx               # NestHub 首页
├─ docs/                  # Fumadocs 文档路由
└─ api/search/            # Fumadocs 搜索索引接口

components/
├─ docs/                  # 文档页自定义组件
├─ icons/                 # 站点图标与 Logo
└─ ui/                    # 通用 UI 组件

content/docs/             # 已发布到站点导航的 MDX 内容
AI Knowledge/             # 研究草稿和主题资料沉淀
lib/
├─ site-config.tsx        # 站点名称、顶栏导航、布局配置
├─ source.ts              # Fumadocs 内容源
├─ metadata.ts            # SEO、OG、favicon 配置
└─ public-asset.ts        # 静态资源路径处理

public/
├─ branding/              # NestHub Logo 与历史品牌资源
├─ city-guides/           # 城市内容配图
├─ company-icons/         # 公司图标
└─ favicon/               # favicon 与 web manifest
```

## 内容维护方式

新增研究型内容时，优先放在 `AI Knowledge/` 中沉淀资料和草稿；确认要发布到站点后，再整理到 `content/docs/`。

新增站点页面时：

1. 在 `content/docs/<topic>/` 下新增 `.mdx` 文件。
2. 在同目录 `meta.json` 中登记页面顺序。
3. 如果是新的一级栏目，更新 `content/docs/meta.json`。
4. 如果需要出现在顶部导航，更新 `lib/site-config.tsx`。
5. 使用可信来源，区分事实、推断和建议，避免没有依据的租金或推荐结论。

## 部署

项目已配置为静态导出：

- `next.config.js` 使用 `output: "export"`。
- `pnpm build` 会生成 `out/`。
- 生产域名是 `https://nest-hub.eggcampus.com`。

### GitLab CI/CD

当前生产部署基于 GitLab CI/CD 和静态 nginx 容器：

- `.gitlab-ci.yml`
- `cicd/script/`
- `cicd/docker/Dockerfile`

发布流程：

1. Push `main` 到 GitLab。
2. CI 执行 `pnpm install --frozen-lockfile`。
3. CI 构建静态 `out/` 目录。
4. CI 构建并推送 nginx 镜像。
5. CI 将容器部署到 `ec-r-pro-project-1`。
6. `ec-r-gateway-1` 对外暴露 `nest-hub.eggcampus.com`。

### 说明

- 当前以根域名方式部署，不使用 `basePath`。
- 生产环境直接提供静态文件，不依赖长期运行的 Next.js 服务。
