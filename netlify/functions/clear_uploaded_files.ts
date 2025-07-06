import type { Config } from "@netlify/functions"
import { clearFiles } from "$lib/db/s3";

export default async () => {
    await clearFiles();
}

export const config: Config = {
    schedule: "*/10 * * * *", // Every 10 minutes
}