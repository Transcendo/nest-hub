import { repositoryUrl } from "@/lib/site-constants";

export function LegalDisclaimer() {
	return (
		<footer className="mx-auto w-full max-w-7xl px-4 pb-8 text-xs leading-6 text-[#617069] sm:px-6 lg:px-8 dark:text-[#9eaea6]">
			<div className="rounded-[8px] border border-[#101615]/10 bg-white/70 p-4 dark:border-white/12 dark:bg-[#101615]/70">
				<p>
					NestHub 是非官方租房信息整理项目，与页面中提及的企业不存在隶属、赞助、认证或合作关系。
					企业名称、商标、Logo 及相关标识归各自权利人所有，仅用于识别公司与地理位置导览。
					若权利人认为使用不当，可通过{" "}
					<a
						className="font-semibold text-[#101615] underline underline-offset-2 dark:text-[#f5fff8]"
						href={`${repositoryUrl}/issues`}
						target="_blank"
						rel="noreferrer"
					>
						GitHub Issue
					</a>{" "}
					联系我们移除或调整。
				</p>
			</div>
		</footer>
	);
}
