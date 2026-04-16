import Link from "next/link";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { cityCards, docsLayoutProps, valueProps } from "@/lib/site-config";

export default function HomePage() {
	return (
		<HomeLayout
			{...docsLayoutProps}
			className="min-h-dvh bg-gradient-to-b from-background via-background to-muted/30"
		>
			<section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 sm:py-20">
				<div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
					<div className="max-w-3xl space-y-5">
						<p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
							NestHub
						</p>
						<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
							互联网大厂租房指南，用 Fumadocs 统一维护的多城市决策入口。
						</h1>
						<p className="text-base leading-7 text-muted-foreground sm:text-lg">
							先看避坑指南，再按城市进入具体通勤带和办公区页面。目标不是堆房源，而是帮你更快排除不合适的区域、预算和签约方案。
						</p>
						<div className="flex flex-wrap gap-3 pt-2">
							<Link
								className="inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
								href="/docs/avoid-pitfalls"
							>
								先看避坑指南
							</Link>
							<Link
								className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
								href="/docs"
							>
								进入文档目录
							</Link>
						</div>
					</div>

					<div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm">
						<p className="text-sm font-medium text-muted-foreground">使用方式</p>
						<ol className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
							<li>1. 先读避坑指南，建立统一的看房和签约检查标准。</li>
							<li>2. 进入对应城市页，先确定通勤半径和生活半径。</li>
							<li>3. 再进入具体办公区页面，看真实租金带与小区建议。</li>
						</ol>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
					{cityCards.map((card) => (
						<Link
							key={card.title}
							href={card.href}
							className="rounded-2xl border border-border bg-background/80 p-6 transition hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm"
						>
							<h2 className="text-lg font-semibold">{card.title}</h2>
							<p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p>
						</Link>
					))}
				</div>

				<div className="grid gap-4 md:grid-cols-3">
					{valueProps.map((item) => (
						<div
							key={item.title}
							className="rounded-2xl border border-border/70 bg-background/70 p-6"
						>
							<h2 className="text-lg font-semibold">{item.title}</h2>
							<p className="mt-2 text-sm leading-6 text-muted-foreground">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</section>
		</HomeLayout>
	);
}
