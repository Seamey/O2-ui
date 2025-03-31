import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonBannerDiscount(){
    return(
        <div className="w-full h-40 rounded-lg ">
            <Skeleton className={` w-full h-full`}/>
        </div>
    )
}