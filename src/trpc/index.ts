import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
export const appRouter = router({
    // define our backend API logic here
    authCallback: publicProcedure.query(() => {
        const { getUser } = getKindeServerSession();
        const user = getUser();

        // if user not exist, throw error
        if (!user.id || !user.email)
            throw new TRPCError({ code: "UNAUTHORIZED" });

        // check if the user already in database?
        // we will have database later...

        return { success: true };
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
