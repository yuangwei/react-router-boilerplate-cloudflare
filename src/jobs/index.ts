import { defineJobs } from "@/lib/queue";

const jobs = defineJobs<Env>({});

export default jobs;
