import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

// this is server component
const Page = () => {
    const { getUser } = getKindeServerSession();

    const user = getUser();

    // if user not exist, redirect user to auth-callback (sync user to our database)
    if (!user || !user.id) redirect("/auth-callback?origin=dashboard");
    // the reason for the query parameter is because after we force user to sign in/up,
    // we want to redirect user to the page they were stand on, avoid disrupting their flow

    return <div>{user.email}</div>;
};

export default Page;
