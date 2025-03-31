"use client"

import * as React from "react"

import {Button} from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {Textarea} from "@/components/ui/textarea";
import {usePostFeedbackMutation} from "@/app/redux/service/feedback";

export function FeedbackDrawerComponent() {
    const [message, setMessage] = React.useState("");
    const [postFeedback] = usePostFeedbackMutation();

    const handleSubmit = async () => {
        try {
            await postFeedback({ message, type: "general" }).unwrap();
            setMessage(""); // Clear the message after successful submission
        } catch (error) {
            console.error("Failed to submit feedback:", error);
        }
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="font-light text-white">ផ្ដល់យោបល់</Button>
            </DrawerTrigger>
            <DrawerContent className={` bg-white flex justify-start items-start`}>
                <div className=" w-full flex flex-col items-start">
                    <DrawerHeader className={` w-full flex flex-col justify-start items-start`}>
                        <DrawerTitle>យើងចូលចិត្តមតិកែលម្អរបស់អ្នក!</DrawerTitle>
                        <DrawerDescription className={`text-start font-light text-base text-gray-500`}>មតិកែលម្អរបស់អ្នកជួយយើងកែលម្អវេទិការបស់យើង។
                            <br/>
                            តើអ្នកគិតយ៉ាងណាដែរ?</DrawerDescription>
                    </DrawerHeader>

                    <section className={`w-full  px-5`}>
                        <Textarea
                            className={`min-h-[140px]`}
                            placeholder="មតិកែលម្អរបស់អ្នកមានតម្លៃសម្រាប់យើង"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </section>

                    <DrawerFooter className={` flex flex-row w-full justify-end`}>
                        <DrawerClose asChild>
                            <Button variant="outline">បោះបង់</Button>
                        </DrawerClose>
                        <Button className={` text-white`} onClick={handleSubmit} disabled={!message.trim()}>បញ្ជូនមតិកែលម្អ</Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}