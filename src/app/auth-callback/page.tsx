"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";

export default function Page() {
    // sync the logged in user to database
    const router = useRouter();
    // get the page user is standing
    const searchParams = useSearchParams();
    const origin = searchParams.get("origin"); // origin = "dashboard"

    trpc.authCallback.useQuery(undefined, {
        // undefined cuz this is query, not mutation like post request...
        onSuccess: ({ success }) => {
            if (success) {
                // user is synced to db -> redirect user to dashboard
                router.push(origin ? `/${origin}` : "/dashboard");
            }
        },
        onError: (err) => {
            // hanlde the error throw by authCallback procedure
            if (err.data?.code === "UNAUTHORIZED") {
                router.push("/sign-in"); // redirect user to sign-in
            }
        },

        retry: true,
        retryDelay: 500,
    });

    return (
        <div className="w-full mt-24 flex justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
                <h3 className="font-semibold text-xl">
                    Setting up your account...
                </h3>
                <p>You will be redirected automatically.</p>
            </div>
        </div>
    );
}
