import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function SkeletonProductComponent() {
    return (
        <div className={` w-full  pt-5`}>
            <div className={` flex justify-between pb-5`}>
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-6 w-[100px]" />
            </div>
            <div className={`flex gap-3 overflow-auto scrollbar-hide`}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex flex-col p-3 space-y-3 w-[290px] h-[240px] bg-white">
                        <Skeleton className="h-[70%] w-full rounded-xl" />
                        <div className="h-[40%] flex flex-col gap-2">
                            <Skeleton className="h-4 w-full" />
                            <div className={` flex gap-1`}>
                                <Skeleton className="h-4 w-[160px]" />
                                <Skeleton className="h-4 w-[60px]" />
                            </div>
                            <div className={` flex gap-1`}>
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}