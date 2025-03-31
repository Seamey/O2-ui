"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, ChevronLeft } from "lucide-react";
import { useGetUserQuery, useUpdateProfileUserMutation, usePostImageMutation } from "@/app/redux/service/user";
import FeedbackModal from "@/components/Components/FeedbackComponent";
import ChangePasswordModal from "@/components/Components/Changepassword";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

export default function UserProfile() {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploadedFilePath, ] = useState<string | null>(null);
    const [isPopup, setIsPopup] = useState(false);
    const [isPopupChangePassword, setIsPopupChangePassword] = useState(false);
    const [updateProfile] = useUpdateProfileUserMutation();
    const [uploadImage] = usePostImageMutation();
    const { data } = useGetUserQuery();
    const router = useRouter();

    const popupModal = () => setIsPopup(true);
    const closeModal = () => setIsPopup(false);

    const popupModalChangePassword = () => setIsPopupChangePassword(true);
    const closeModalChangePassword = () => setIsPopupChangePassword(false);

    const validationSchema = Yup.object({
        name: Yup.string(),
        bio: Yup.string().max(500, "Bio cannot be more than 500 characters")
    });

    const handleSubmit = async (values: any) => {
        try {
            let avatar = uploadedFilePath || data?.data?.avatar || null; // Ensure avatar is never undefined

            if (image) {
                const uploadResult = await uploadImage({ image }).unwrap();
                avatar = uploadResult.data?.file_path ?? null;
            }

            // Ensure old values are used if user leaves fields empty
            const updatedData = {
                name: values.name.trim() || data?.data?.name,
                bio: values.bio.trim() || data?.data?.bio,
                avatar,
            };

            // Check if data is actually changed before submitting
            if (
                updatedData.name === data?.data?.name &&
                updatedData.bio === data?.data?.bio &&
                updatedData.avatar === data?.data?.avatar
            ) {
                toast.warning("No changes detected", {
                    style: { color: "white", background: "#ffcc00" },
                });
                return;
            }

            console.log("Final update payload:", updatedData);

            await updateProfile(updatedData).unwrap().then(() => {
                toast.success("Update Profile Success", {
                    style: { color: "white", background: "#22bb33" },
                });
                console.log("success");
            });

        } catch (error) {
            console.error("Update failed", error);
            alert("Something went wrong. Please try again.");
        }
    };



    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center">
            <div className="pt-5 flex w-screen text-primary text-3xl pl-4 items-center cursor-pointer">
                <ChevronLeft onClick={() => router.back()} className="cursor-pointer text-primary w-6 h-6" />
            </div>
            <h1 className="text-3xl font-semibold text-black text-center pb-3">កែប្រែព័ត៌មាន</h1>

            <div className="relative w-30 h-30 cursor-pointer border-4 shadow-lg border-secondary/30 rounded-full flex items-center justify-center">
                {preview || data?.data?.avatar ? (
                    <Image
                        src={preview || `${process.env.NEXT_PUBLIC_O2_API_URL}${uploadedFilePath || data?.data?.avatar}`}
                        alt="Profile"
                        width={1000}
                        height={1000}
                        className="w-28 h-28 rounded-full object-cover"
                    />
                ) : (
                    <p className="text-center text-gray-500">Click to upload</p>
                )}
                <input type="file" onChange={handleFileChange} className="hidden" id="avatar-upload" />
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-white/80 rounded-full p-1 shadow cursor-pointer">
                    <Camera className="w-5 h-5 text-secondary" />
                </label>
            </div>

            <Formik
                enableReinitialize
                initialValues={{
                    name: data?.data.name || "",
                    bio: data?.data?.bio || ""
                }}
                validationSchema={validationSchema}
                validateOnChange={false} 
                onSubmit={handleSubmit}
            >
                <Form className="mt-6 w-11/12 md:w-1/2 space-y-3.5">
                    <div>
                        <label className="block text-sm text-gray-700 py-1.5">ឈ្មោះ</label>
                        <Field
                            name="name"
                            placeholder={data?.data?.name || "N/A"}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 py-1.5">អ៊ីមែល</label>
                        <input
                            type="email"
                            value={data?.data.email || "N/A"}
                            disabled
                            className="w-full border border-gray-300 bg-gray-100 rounded-lg p-2.5 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 py-1.5">បញ្ចូលប្រវត្តិរូបរបស់អ្នក</label>
                        <Field
                            as="textarea"
                            name="bio"
                            values={data?.data.bio}
                            placeholder={data?.data.bio || "N/A"}
                            className="w-full border border-gray-300 text-gray-700 rounded-lg p-2.5 h-20 focus:outline-none"
                        />
                        <ErrorMessage name="bio" component="div" className="text-red-500 text-sm" />
                    </div>
                    <button
                        onClick={popupModal}
                        type="button"
                        className="w-full bg-secondary/20 text-black py-2 rounded-lg mt-2 hover:bg-secondary/40 transition"
                    >
                        ផ្តល់មតិកែលម្អ
                    </button>

                    <div className="flex justify-between mt-4">
                        <button onClick={popupModalChangePassword} type="button" className="w-[48%] border border-secondary text-secondary py-2 rounded-lg hover:bg-secondary/10 transition">
                            ផ្លាស់ប្តូរពាក្យសម្ងាត់
                        </button>
                        <button type="submit" className="w-[48%] bg-primary text-white py-2 rounded-lg hover:secondary/60 transition">
                            រក្សាទុកការកែប្រែ
                        </button>
                    </div>
                </Form>

            </Formik>
            {isPopup && <FeedbackModal closeModal={closeModal} />}
            {isPopupChangePassword && <ChangePasswordModal closeModal={closeModalChangePassword} />}
        </div>
    );
}
