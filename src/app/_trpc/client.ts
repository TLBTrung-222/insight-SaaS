// create trpc react hook

import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/trpc/index";

export const trpc = createTRPCReact<AppRouter>({});
// the AppRouter type here is extremely important
// without it, tRPC won't know the type of the api response from the server
