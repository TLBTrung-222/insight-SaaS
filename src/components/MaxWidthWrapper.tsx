import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
    className,
    children,
}: {
    className?: string; // we want to add custom tailwind properties from outside
    children: ReactNode; // this component receive a react node to render inside
}) => {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
                className
            )}
        >
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
