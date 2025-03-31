"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { usePostFeedbackMutation } from "@/app/redux/service/feedback";
import { toast } from "sonner";

type FeedbackModalProps = {
    closeModal: () => void;
};

export default function FeedbackModal({ closeModal }: FeedbackModalProps) {

    const [comment, setComment] = useState("");
    const [postFeedback] = usePostFeedbackMutation();

    const handleSubmit = () => {
        if (!comment.trim()) {
            toast.error("សូមបញ្ចូលមតិកែលម្អមុនផ្ញើ", {
                style: {
                    color: "white",
                    background: "#e0391f",
                },
            });
            return;
        }

        try {
            postFeedback({ message: comment, type: "Suggestion" })
                .then(() => {
                    toast.success("ការបញ្ចេញមតិយោបលជោគជ័យ", {
                        style: {
                            color: "white",
                            background: "#22bb33",
                        },
                    });
                    closeModal();
                });
        } catch {
            toast.error("ការបញ្ចេញមតិយោបលបរាជ័យ", {
                style: {
                    color: "white",
                    background: "#e0391f",
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-end md:items-center z-50">
            <div className="bg-white rounded-t-2xl md:rounded-2xl p-6 shadow-xl w-full md:w-1/3 relative">
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-semibold text-center mb-4">
                    សូមផ្តល់មតិកែលម្អបន្ថែម!
                </h2>
                <p className="text-gray-600 text-left mb-4 text-lg">
                    មតិកែលម្អរបស់អ្នកជួយយើងកែលម្អវេទិការបស់យើង។ តើអ្នកគិតយ៉ាងណាដែរ?
                </p>

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="បញ្ចេញមតិនៅទីនេះ..."
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-primary min-h-[160px] resize-none"
                />

                <div className="flex justify-between mt-4">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5"
                    >
                        បោះបង់
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/70"
                        disabled={!comment.trim()}
                    >
                        ផ្ញើមតិ
                    </button>
                </div>
            </div>
        </div>
    );
}