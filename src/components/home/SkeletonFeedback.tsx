import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonFeedback() {
    return (
        <div className={` w-full h-auto flex flex-col gap-5`}>
            <div className={` flex justify-between `}>
                <Skeleton className={` w-60 h-6 rounded-lg`}/>
                <Skeleton className={` w-24 h-8 rounded-lg`}/>
            </div>

            <div className={` w-full h-auto mb-5`}>
                <div className={` w-full h-full flex gap-2`}>
                    <Skeleton className={` h-10 w-10 rounded-full`}/>
                    <div className={` flex flex-col gap-2`}>
                        <Skeleton className={` w-20 h-4 rounded-lg`}/>
                        <Skeleton className={` w-40 h-2 rounded-lg`}/>
                        <Skeleton className={` w-80 h-10 rounded-xl`}/>
                    </div>
                </div>

            </div>
        </div>
    )
}