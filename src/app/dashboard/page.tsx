import Dashboard from "@/components/Dashboard";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

// this is server component
const Page = async () => {
    const { getUser } = getKindeServerSession();

    const user = getUser();

    // if user not exist, redirect user to auth-callback (sync user to our database)
    if (!user || !user.id) redirect("/auth-callback?origin=dashboard");
    // the reason for the query parameter is because
    // we want to redirect user to the page they were stand on, avoid disrupting their flow

    // make sure user is synced to database
    const dbUser = await db.user.findFirst({
        where: {
            id: user.id,
        },
    });
    if (!dbUser) {
        redirect("/auth-callback?origin=dashboard");
    }

    return <Dashboard />;
};

export default Page;
