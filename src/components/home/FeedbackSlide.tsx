import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules";
import Image from "next/image";
import TimeDifferenceComponent from "@/components/home/TimeDifferenceComponent";

type Feedback = {
    id: string;
    userName: string;
    description: string;
    userProfile: string;
    created_at: string;
};

type FeedbackSlideProps = {
    feedback: Feedback[];
    env: string | undefined;
};

const FeedbackSlide: React.FC<FeedbackSlideProps> = ({feedback, env}) => {
    return (
        <section className="w-full rounded-[10px]">
            <div className="w-full rounded-[10px]">
                <ul className="h-auto mb-5 w-full rounded-[10px]">
                    <Swiper
                        className="h-full w-full rounded-[10px]"
                        pagination={{type: "bullets", clickable: true}}
                        autoplay={true}
                        loop={true}
                        modules={[Autoplay, Navigation]}
                    >
                        {feedback.map(
                            ({id, userProfile, userName, description, created_at}: Feedback) => (
                                <SwiperSlide key={id}>
                                    <div className="flex gap-3">
                                        <Image
                                            className="w-[40px] h-[40px] rounded-full bg-cover border border-primary"
                                            width={100}
                                            height={100}
                                            unoptimized
                                            src={`${env}${userProfile}`}
                                            alt={userName}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <div className={` flex flex-col`}>
                                                <h1 className="text-base font-medium uppercase">{userName}</h1>
                                                <p className="text-sm font-light text-gray-500 flex items-center gap-1">
                                                    ផ្តល់មតិកែលម្អ <TimeDifferenceComponent createdAt={created_at}/>
                                                </p>
                                            </div>
                                            <p className="text-sm font-light lowercase">{description}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        )}
                    </Swiper>
                </ul>
            </div>
        </section>
    );
};

export default FeedbackSlide;