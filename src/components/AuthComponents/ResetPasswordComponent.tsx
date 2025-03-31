"use client";
import {Form, Formik} from "formik";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {IoChevronBackCircle} from "react-icons/io5";
import * as Yup from "yup";
import Button from "./ButtonComponentForAuth";
import ErrorDynamic from "./ErrorComponent";
import Label from "./LabelComponent";
import PasswordField from "./PasswordField";

import {useAppSelector} from "@/app/redux/hooks";
import {useCreateResetPasswordMutation} from "@/app/redux/service/auth";
import {NewPasswordType} from "@/app/types/Auth";
import {toast} from "sonner";

export default function ResetPasswordComponent() {
    const router = useRouter();

    // email
    const email = useAppSelector((state) => state.email.value);
    const otp = useAppSelector((state) => state.otp.value);

    // set new password
    const [createNewPassword] = useCreateResetPasswordMutation();

    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (values: NewPasswordType) => {
        try {
            setIsLoading(true);
            const response = await createNewPassword({
                email: email,
                reset_code: otp,
                new_password: values?.new_password,
                new_password_confirmation: values?.new_password_confirmation,
            });
            if (response.data) {
                toast.success("កំណត់ពាក្យសម្ងាត់ថ្មីជោគជ័យ", {
                    style: {
                        background: "#22bb33",
                    },
                });
                router.push("/login");
            } else {
                toast.success("កំណត់ពាក្យសម្ងាត់ថ្មីមិនជោគជ័យ", {
                    style: {
                        background: "#bb2124",
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const initialValues = {
        new_password: "",
        new_password_confirmation: "",
    };
    const validationSchema = Yup.object({
        new_password: Yup.string()
            .min(8, "ពាក្យសម្ងាត់របស់អ្នកខ្លីពេក, សូមបញ្ជូលពាក្យសម្ងាត់ 8 តួរ")
            .required("អ្នកត្រូវបញ្ជូលពាក្យសម្ងាត់របស់អ្នក"),
        new_password_confirmation: Yup.string()
            .oneOf([Yup.ref("new_password")], "ពាក្យសម្ងាត់របស់អ្នកមិនដូចគ្នា")
            .required("អ្នកត្រូវបញ្ជូលពាក្យសម្ងាត់បញ្ជាក់"),
    });

    return (
        <section className="bg-primary w-full h-screen flex flex-col justify-between">
            {/* header section */}

            {/* icon back */}
            <div className=" px-5 pt-5 ">
                <div className="h-[50px] w-[50px] flex flex-col items-start justify-start">
                    <IoChevronBackCircle className="h-full w-full text-card_color"/>
                </div>
            </div>
            {/* Logo centered while keeping icon at start */}
            <div className=" flex justify-center ">
                <div className="w-[100px] h-[100px] rounded-full bg-white flex items-center justify-center">
                    <Image
                        alt="logo"
                        src={"/logo.png"}
                        width={150}
                        height={150}
                        unoptimized
                        className="object-cover rounded-full h-full w-full"
                    />
                </div>
            </div>
            {/* welcome  */}
            <p className="text-heading text-card_color text-center my-5">
                O2 សូមស្វាគមន៍
            </p>

            {/* form section */}
            <div className="w-full h-[70%]  bg-card_color rounded-tr-[40px] rounded-tl-[40px] p-5 ">
                <p className="text-[24px]">បង្កើតគណនី</p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    {() => (
                        <Form className="py-5 mt-4">
                            <div className="space-y-4">
                                {/* password */}
                                <div>
                                    <Label htmlFor="new_password" text="ពាក្យសម្ងាត់" required/>
                                    <PasswordField
                                        name="new_password"
                                        id="new_password"
                                        placeholder="សូមបញ្ជូលពាក្យសម្ងាត់របស់អ្នក"
                                    />
                                    <ErrorDynamic name="new_password" component="div"/>
                                </div>

                                {/* comfirm password */}
                                <div>
                                    <Label
                                        htmlFor="new_password_confirmation"
                                        text="ពាក្យសម្ងាត់បញ្ជាក់"
                                        required
                                    />
                                    <PasswordField
                                        name="new_password_confirmation"
                                        id="new_password_confirmation"
                                        placeholder="សូមបញ្ជូលពាក្យសម្ងាត់បញ្ជាក់"
                                    />
                                    <ErrorDynamic
                                        name="new_password_confirmation"
                                        component="div"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <Button
                                    type="submit"
                                    text="បង្កើតគណនី"
                                    isLoading={isLoading}
                                    className="w-full bg-primary text-white"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}
