"use client";

import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useChangePasswordMutation } from "@/app/redux/service/user";
import { toast } from "sonner";

type ChangePasswordModalProps = {
    closeModal: () => void;
};

export default function ChangePasswordModal({ closeModal }: ChangePasswordModalProps) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [changePassword] = useChangePasswordMutation();

    const validationSchema = Yup.object({
        current_password: Yup.string().required("សូមបញ្ចូលពាក្យសម្ងាត់ចាស់!"),
        new_password: Yup.string()
            .required("សូមបញ្ចូលពាក្យសម្ងាត់ថ្មី!")
            .min(8, "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ 8 តួអក្សរ!")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "ពាក្យសម្ងាត់ត្រូវមានអក្សរធំ អក្សរតូច លេខ និងសញ្ញាពិសេស!"),
        new_password_confirmation: Yup.string()
            .oneOf([Yup.ref("new_password")], "ពាក្យសម្ងាត់ថ្មីមិនត្រូវគ្នាទេ!")
            .required("សូមបញ្ចូលការបញ្ជាក់ពាក្យសម្ងាត់ថ្មី!"),
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-end md:items-center z-50">
            <div className="bg-white rounded-t-2xl md:rounded-2xl p-6 shadow-xl w-full md:w-1/3 relative">
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-semibold mb-8 text-center">ប្ដូរពាក្យសម្ងាត់ថ្មី</h2>

                <Formik
                    initialValues={{
                        current_password: "",
                        new_password: "",
                        new_password_confirmation: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            await changePassword(values).unwrap();
                            toast.success("ពាក្យសម្ងាត់ផ្លាស់ប្តូរបានដោយជោគជ័យ", {
                                style: {
                                    color: "white",
                                    background: "#22bb33",
                                },
                            });
                            closeModal();
                        } catch {
                            toast.error("មានបញ្ហាក្នុងការផ្លាស់ប្តូរពាក្យសម្ងាត់!");
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {[
                                {
                                    label: "ពាក្យសម្ងាត់ចាស់",
                                    name: "current_password",
                                    show: showCurrentPassword,
                                    toggle: () => setShowCurrentPassword(!showCurrentPassword),
                                },
                                {
                                    label: "ពាក្យសម្ងាត់ថ្មី",
                                    name: "new_password",
                                    show: showNewPassword,
                                    toggle: () => setShowNewPassword(!showNewPassword),
                                },
                                {
                                    label: "បញ្ជាក់ពាក្យសម្ងាត់ថ្មី",
                                    name: "new_password_confirmation",
                                    show: showConfirmPassword,
                                    toggle: () => setShowConfirmPassword(!showConfirmPassword),
                                },
                            ].map((input, idx) => (
                                <div key={idx} className="relative mb-4">
                                    <label htmlFor={input.label} className="pb-1.5 text-md">{input.label}</label>
                                    <Field
                                        type={input.show ? "text" : "password"}
                                        name={input.name}
                                        placeholder={input.label}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={input.toggle}
                                        className="absolute right-3 top-1/2 transform-translate-y-1/2"
                                    >
                                        {input.show ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400 " />}
                                    </button>
                                    <ErrorMessage name={input.name} component="div" className="text-red-500 text-sm mt-1.5" />
                                </div>
                            ))}

                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 w-[47%]"
                                >
                                    បោះបង់
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/70 w-[47%]"
                                >
                                    ផ្លាស់ប្តូរ
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
