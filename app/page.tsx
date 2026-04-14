import Link from "next/link";

const cards = [
	{
		title: "京东租房指南",
		description: "围绕京东北京总部, 经海路, 次渠, 嘉会湖一带的租房决策建议。",
		href: "/docs/jd-beijing-renting-guide",
	},
	{
		title: "租房避坑指南",
		description: "签约前先过一遍这份清单, 能少踩很多坑。",
		href: "/docs/mandatory-read/renting-pitfalls",
	},
	{
		title: "进入文档目录",
		description: "查看 NestHub 当前已经整理好的租房与居住决策内容。",
		href: "/docs",
	},
];

export default function HomePage() {
	return (
		<main className="min-h-dvh bg-gradient-to-b from-background to-muted/30">
			<section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20">
				<div className="max-w-3xl space-y-5">
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
						NestHub
					</p>
					<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
						给北京打工人看的租房, 通勤与居住决策指南。
					</h1>
					<p className="text-base leading-7 text-muted-foreground sm:text-lg">
						聚焦真实租房问题, 包括区域选择, 地铁通勤, 价格带判断, 合租与整租取舍, 以及签约前必须避开的坑。
					</p>
					<div className="flex flex-wrap gap-3 pt-2">
						<Link
							className="inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
							href="/docs"
						>
							进入文档目录
						</Link>
						<Link
							className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
							href="/docs/jd-beijing-renting-guide"
						>
							查看京东租房指南
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
