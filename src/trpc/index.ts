import { router } from "./trpc";
export const appRouter = router({
    // define our backend API logic here
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
