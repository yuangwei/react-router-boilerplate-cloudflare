export interface UploadResult {
	success: boolean;
	url?: string;
	key?: string;
	error?: string;
}

export async function uploadToR2(
	env: Env,
	file: File,
	folder: string = "uploads",
	name?: string,
): Promise<UploadResult> {
	try {
		const timestamp = Date.now();
		const randomId = Math.random().toString(36).substring(2, 15);
		const extension = file.name.split(".").pop() || "bin";
		const key = `${folder}/${name || `${timestamp}-${randomId}.${extension}`}`;

		const arrayBuffer = await file.arrayBuffer();
		const result = await env.R2_BUCKET.put(key, arrayBuffer, {
			httpMetadata: {
				contentType: file.type,
				cacheControl: "public, max-age=31536000",
			},
			customMetadata: {
				originalName: file.name,
				uploadedAt: new Date().toISOString(),
				size: file.size.toString(),
			},
		});

		if (!result) {
			return {
				success: false,
				error: "Upload failed",
			};
		}

		const publicUrl = `https://${env.CLOUDFLARE_R2_URL}/${key}`;

		return {
			success: true,
			url: publicUrl,
			key: key,
		};
	} catch (error) {
		console.error("R2 upload error:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Upload failed",
		};
	}
}

export async function getFromR2(
	env: Env,
	key: string,
): Promise<R2Object | null> {
	return env.R2_BUCKET.get(key);
}

export async function listR2Files(env: Env, path: string) {
	return env.R2_BUCKET.list({
		prefix: path,
	});
}
