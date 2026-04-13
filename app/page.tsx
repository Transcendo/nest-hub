import Link from "next/link";

const cards = [
	{
		title: "Companies",
		description: "按公司维度沉淀创业项目研究，适合长期积累。",
		href: "/docs/companies",
	},
	{
		title: "Themes",
		description: "按方向和赛道组织研究框架，不再按日期堆信息。",
		href: "/docs/themes",
	},
	{
		title: "Latest",
		description: "直接查看最近整理的一篇公司研究。",
		href: "/docs/companies/sycamore",
	},
];

export default function HomePage() {
	return (
		<main className="min-h-dvh bg-gradient-to-b from-background to-muted/30">
			<section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20">
				<div className="max-w-3xl space-y-5">
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
						Business Idea
					</p>
					<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
						A public research archive for startup ideas, companies, and themes.
					</h1>
					<p className="text-base leading-7 text-muted-foreground sm:text-lg">
						这里不是日历式流水账，而是把值得长期跟踪的创业公司、方向和判断沉淀成可复用的研究资产。
					</p>
					<div className="flex flex-wrap gap-3 pt-2">
						<Link
							className="inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
							href="/docs/companies"
						>
							进入研究目录
						</Link>
						<Link
							className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
							href="/docs/companies/sycamore"
						>
							查看最新公司页
						</Link>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-3">
					{cards.map((card) => (
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
			</section>
		</main>
	);
}
