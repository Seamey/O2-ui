import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonNavbar() {
    return (
        <div className={`   w-full bg-white border-b border-b-slate-100 h-14 px-2`}>
            <div className=" max-w-[95%] mx-auto w-full flex h-full justify-between items-center">
                <div>
                    <Skeleton className={` h-10 w-10 rounded-full`}/>
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton className="w-9 h-9 bg-gray-400 rounded-xl"/>
                    <Skeleton className="w-9 h-9 bg-gray-400 rounded-xl"/>
                </div>
            </div>
        </div>

    )
}