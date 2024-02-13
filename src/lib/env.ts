import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		BASE_URL: z.string().url(),
	},
	runtimeEnv: import.meta.env,
});
