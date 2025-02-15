import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "NEXT_PUBLIC_", // ✅ Add this line
  server: {},
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_WIX_CLIENT_ID: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_WIX_CLIENT_ID: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
  },
});
