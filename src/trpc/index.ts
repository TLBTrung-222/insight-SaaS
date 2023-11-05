// set up API endpoints (each endpoint need a procedure to request to)

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
export const appRouter = router({
    // define our backend API logic here
    authCallback: publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession();
        const user = getUser();

        // make sure user has id and email
        if (!user.id || !user.email)
            throw new TRPCError({ code: "UNAUTHORIZED" });

        // check if the user already in database?
        // find the first user with id equal to current logged in user
        const dbUser = await db.user.findFirst({
            where: {
                id: user.id,
            },
        });

        if (!dbUser) {
            // create user in db
            await db.user.create({
                data: {
                    id: user.id,
                    email: user.email,
                },
            });
        }

        return { success: true };
    }),

    getUserFiles: privateProcedure.query(async ({ ctx }) => {
        const { userId } = ctx;

        return await db.file.findMany({
            where: {
                id: userId,
            },
        });
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
