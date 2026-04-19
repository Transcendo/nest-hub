import { createMDX } from "fumadocs-mdx/next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));
const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "nest-hub";
const basePath = isGithubPages ? `/${repoName}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	basePath,
	assetPrefix: basePath || undefined,
	env: {
		NEXT_PUBLIC_BASE_PATH: basePath,
	},
	experimental: {
		optimizePackageImports: [
			"lucide-react",
			"framer-motion",
			"@radix-ui/react-tabs",
			"@radix-ui/react-scroll-area",
		],
	},
	turbopack: {
		root: rootDir,
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "http",
				hostname: "**",
			},
		],
	},
};

const withMDX = createMDX({
	contentDirBasePath: "/content/docs",
});
export default withMDX(nextConfig);
