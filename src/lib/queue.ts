export type AnyEnv = Record<string, any>;

export interface JobContext<E extends AnyEnv = AnyEnv> {
	env: E;
	attempts: number;
	messageId: string;
	timestamp: Date;
}

export type JobHandler<P = any, E extends AnyEnv = AnyEnv> = (
	payload: P,
	ctx: JobContext<E>,
) => Promise<void> | void;

export type JobRegistry<E extends AnyEnv = AnyEnv> = {
	[queueName: string]: {
		[jobName: string]: JobHandler<any, E>;
	};
};

export function defineJobs<E extends AnyEnv = AnyEnv>(
	registry: JobRegistry<E>,
) {
	return registry;
}

export function createQueueConsumer<E extends AnyEnv = AnyEnv>(
	registry: JobRegistry<E>,
) {
	return {
		async queue(batch: MessageBatch<any>, env: E, ctx: ExecutionContext) {
			for (const msg of batch.messages) {
				console.log(msg);
				try {
					const body = msg.body as {
						q: string; // queueName
						t: string; // jobName
						p: any; // payload
					};

					const queueDef = registry[body.q];
					const handler = queueDef?.[body.t];

					if (!handler) {
						console.error(
							`[JobRouter] Unknown job: q=${body.q}, t=${body.t}, messageId=${msg.id}`,
						);
						continue;
					}

					const jobCtx: JobContext<E> = {
						env,
						attempts: msg.attempts,
						messageId: msg.id,
						timestamp: msg.timestamp,
					};

					await Promise.resolve(handler(body.p, jobCtx));
				} catch (err) {
					console.error("[JobRouter] Job execution error:", err);
				}
			}
		},
	};
}

export async function dispatchJob<E extends AnyEnv>(
	env: E,
	options: {
		queue: keyof E & string; // 必须是 Env 中的一个 binding
		jobQueueName: string;
		jobName: string;
		payload?: any;
		delaySeconds?: number;
	},
) {
	const binding = env[options.queue];

	if (!binding || typeof binding.send !== "function") {
		throw new Error(
			`Queue binding "${options.queue}" not found on env or has no send()`,
		);
	}

	const body = {
		q: options.jobQueueName,
		t: options.jobName,
		p: options.payload ?? null,
	};

	if (options.delaySeconds && options.delaySeconds > 0) {
		await binding.send(body, { delaySeconds: options.delaySeconds });
	} else {
		await binding.send(body);
	}
}

export async function dispatchJobBatch<E extends AnyEnv>(
	env: E,
	options: {
		queue: keyof E & string;
		jobs: {
			jobQueueName: string;
			jobName: string;
			payload?: any;
			delaySeconds?: number;
		}[];
	},
) {
	const binding = env[options.queue];

	if (!binding || typeof binding.sendBatch !== "function") {
		throw new Error(
			`Queue binding "${options.queue}" not found on env or has no sendBatch()`,
		);
	}

	const batch = options.jobs.map((job) => {
		const body = {
			q: job.jobQueueName,
			t: job.jobName,
			p: job.payload ?? null,
		};

		if (job.delaySeconds && job.delaySeconds > 0) {
			return { body, delaySeconds: job.delaySeconds };
		}

		return { body };
	});

	await binding.sendBatch(batch);
}
