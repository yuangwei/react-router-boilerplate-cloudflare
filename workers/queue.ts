import jobs from "@/jobs";
import { createQueueConsumer } from "@/lib/queue";

const consumer = createQueueConsumer(jobs);

export default async function (batch: MessageBatch, env: Env, ctx: ExecutionContext) {
  return consumer.queue(batch, env, ctx);
};