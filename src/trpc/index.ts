// set up API endpoints (each endpoint need a procedure to request to)

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod"; // this lib use for validation in API request

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
        // get user from context (passed from middleware)
        const { userId } = ctx;

        // list all files from this user
        return await db.file.findMany({
            where: {
                userId: userId,
            },
        });
    }),

    // this is post request
    // we are saying when anyone call this procedure, they need to pass in
    // an object with id as a string type
    // Why we need this? Typscript is run at buildtime, the code below run at run time
    deleteFile: privateProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;

            const file = await db.file.findFirst({
                where: {
                    id: input.id,
                    userId: userId, // make sure only the one who own that file can delete that file (not others user's file)
                },
            });

            if (!file) throw new TRPCError({ code: "NOT_FOUND" });

            await db.file.delete({
                where: {
                    id: input.id,
                },
            });

            return file;
        }),

    // get a file with key from database
    getFile: privateProcedure
        .input(z.object({ key: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;

            const file = await db.file.findFirst({
                where: {
                    key: input.key,
                    userId: userId,
                },
            });

            if (!file) throw new TRPCError({ code: "NOT_FOUND" });

            return file;
        }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
