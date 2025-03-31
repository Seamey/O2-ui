import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonCategoryProduct(){
    return(
        <div className="w-full h-auto  flex flex-col justify-start gap-6">
            <Skeleton className={`w-40 h-8 rounded-lg`}/>
            <div className={` w-full h-[60px] flex justify-between gap-5 `}>
                <Skeleton className={`w-full `}/>
                <Skeleton className={`w-full `}/>
                <Skeleton className={`w-full `}/>
            </div>
        </div>
    )
}