import type { Context } from "hono";

export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
	meta?: {
		count?: number;
		pagination?: {
			page: number;
			limit: number;
			total: number;
			totalPages: number;
		};
	};
}

export function success<T>(
	c: Context,
	data?: T,
	message?: string,
	meta?: ApiResponse<T>["meta"],
) {
	const response: ApiResponse<T> = {
		success: true,
		data,
		message,
	};

	if (meta) {
		response.meta = meta;
	}

	return c.json(response);
}

export function error(
	c: Context,
	error: string,
	statusCode: number = 500,
	message?: string,
) {
	const response: ApiResponse = {
		success: false,
		error,
		message,
	};

	// @ts-ignore
	return c.json(response, statusCode);
}
