import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            const { getUser } = getKindeServerSession();
            const user = getUser();

            // If you throw, the user will not be able to upload
            if (!user || !user.id) throw new Error("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            const createdFile = await db.file.create({
                data: {
                    key: file.key,
                    name: file.name,
                    uploadStatus: "PROCESSING",
                    url: file.url,
                    userId: metadata.userId,
                },
            });
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
