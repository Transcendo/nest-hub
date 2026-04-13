import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import {
	createFileSystemGeneratorCache,
	createGenerator,
	remarkAutoTypeTable,
} from "fumadocs-typescript";

export const docs = defineDocs({
	dir: "./content/docs",
	docs: {
		postprocess: {
			includeProcessedMarkdown: true,
		},
		async: true,
	},
});

const generator = createGenerator({
	cache: createFileSystemGeneratorCache(".next/fumadocs-typescript"),
});

export default defineConfig({
	mdxOptions: {
		remarkNpmOptions: {
			persist: {
				id: "persist-install",
			},
		},
		remarkPlugins: [[remarkAutoTypeTable, { generator }]],
	},
	plugins: [lastModified()],
});
