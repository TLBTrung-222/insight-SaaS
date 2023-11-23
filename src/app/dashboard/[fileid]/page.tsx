import ChatWrapper from "@/components/chat/ChatWrapper";
import PdfRenderer from "@/components/PdfRenderer";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

interface PageProps {
    params: {
        fileid: string;
    };
}

export default async function Page({ params }: PageProps) {
    // retrieve the file id
    const fileId = params.fileid;

    // get file's content from db and render it
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user || !user.id)
        redirect(`/auth-callback?origin=dashboard/${fileId}`);

    // make db call
    const file = await db.file.findFirst({
        where: {
            id: fileId,
            userId: user.id,
        },
    });

    if (!file) notFound();

    console.log(file);

    return (
        <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
            <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
                {/* Left sidebar & main wrapper */}
                <div className="flex-1 xl:flex">
                    <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
                        {/* Main area */}
                        <PdfRenderer url={file.url} />
                    </div>
                </div>

                <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
                    <ChatWrapper
                    // isSubscribed={plan.isSubscribed}
                    // fileId={file.id}
                    />
                </div>
            </div>
        </div>
    );
}
