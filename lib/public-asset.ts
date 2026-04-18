const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicAsset(path: string) {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;

	return `${basePath}${normalizedPath}`;
}
