"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
    // sync the logged in user to database
    const router = useRouter();
    // get the page user is standing
    const searchParams = useSearchParams();
    const origin = searchParams.get("origin"); // origin = "dashboard"

    return <div>hello</div>;
}
