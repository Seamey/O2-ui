import {FeedbackType} from "@/app/types/Feedback";
import RatingStar from "@/lib/RatingSwitchCase";
import {daysSince} from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function FeedbackCard({
                                         user: {name, avatar},
                                         rating,
                                         created_at,
                                         comment,
                                     }: FeedbackType) {
    return (
        <div className="bg-primary-light-10 rounded-[10px] w-full mt-5">
            {/* for header */}
            <div className="flex ">
                {/* image */}
                <div className="w-[50px] h-[50px] mt-3 mx-3 border-[1px] border-primary rounded-full">
                    <Image
                        unoptimized
                        src={
                            `${process.env.NEXT_PUBLIC_O2_API_URL + avatar}`.trim() ||
                            "/avatar.png"
                        }
                        alt="avatar"
                        width={50}
                        height={50}
                        className="object-cover w-full h-full rounded-full"
                    />
                </div>
                {/* name and star */}
                <div className="flex flex-col justify-between pt-3">
                    <p>{name}</p>
                    <div className="flex">
                        <RatingStar rating={rating}/>{" "}
                        <span className="text-body text-accent mx-3">|</span>{" "}
                        {daysSince(created_at)}
                    </div>
                </div>
            </div>
            {/* feedback content */}
            <p className="text-body py-3 ml-[75px]">{comment}</p>
        </div>
    );
}
