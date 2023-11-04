import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";

export default function Page() {
    // sync the logged in user to database
    const router = useRouter();
    // get the page user is standing
    const searchParams = useSearchParams();
    const origin = searchParams.get("origin"); // origin = "dashboard"

    trpc.authCallback.useQuery(undefined, {
        onSuccess: ({ success }) => {
            if (success) {
                // user is synced to db -> redirect user to dashboard
                router.push(origin ? `/${origin}` : "/dashboard");
            }
        },
    }); // undefined cuz this is query, not mutation like post request...

    return <div>hello</div>;
}
