"use client";

import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";

import {setOTP} from "@/app/redux/features/opt";
import {useCreateReVerifyMutation} from "@/app/redux/service/auth";
import {Field, Form, Formik} from "formik";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {IoChevronBackCircle} from "react-icons/io5";
import {toast} from "sonner";
import * as Yup from "yup";
import Button from "./ButtonComponentForAuth";

export default function OTPComponentReset() {
    // dispatch otp
    const dispatch = useAppDispatch();

    // resend verification code
    const [reVerifyUserAccount] = useCreateReVerifyMutation();

    // email from dispatch
    const email = useAppSelector((state) => state.email.value);

    // loading state
    const [isLoading, setIsLoading] = useState(false);

    // otp type
    type OtpType = {
        otp1: string;
        otp2: string;
        otp3: string;
        otp4: string;
        otp5: string;
        otp6: string;
    };

    const initialValues: OtpType = {
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
        otp5: "",
        otp6: "",
    };

    const validationSchema = Yup.object({
        otp1: Yup.string().required("OTP 1 is required "),
        otp2: Yup.string().required("OTP 2 is required "),
        otp3: Yup.string().required("OTP 3 is required "),
        otp4: Yup.string().required("OTP 4 is required "),
        otp5: Yup.string().required("OTP 5 is required "),
        otp6: Yup.string().required("OTP 6 is required "),
    });
    const router = useRouter();

    const handleSubmit = async (values: OtpType) => {
        const verification_code = Object.values(values).join("");
        dispatch(setOTP(verification_code));
        toast.success("ការផ្ញើលេខកូដបានជោគជ័យ", {
            style: {
                background: "#22bb33",
            },
        });
        router.push("/new-password");
    };

    const handleResend = async () => {
        try {
            setIsLoading(true);
            const response = await reVerifyUserAccount({email: email});
            if (response.data) {
                toast.success("ការផ្ញើលេខកូដបានជោគជ័យ", {
                    style: {
                        background: "#22bb33",
                    },
                });
                setIsLoading(false);
            } else {
                toast.success("ការផ្ញើលេខកូដមិនបានជោគជ័យ", {
                    style: {
                        background: "#bb2124",
                    },
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

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
                        unoptimized
                        alt="logo"
                        src={"/logo.png"}
                        width={150}
                        height={150}
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
                <p className="text-[24px] mb-2">ពិនិត្យអ៉ីមែលរបស់អ្នក</p>
                <p className="text-body text-description">
                    បញ្ចូលលេខកូដ 6 ខ្ទង់ដែលបានលើកឡើងក្នុងអ៊ីមែល យើងបានផ្ញើតំណកំណត់ឡើងវិញទៅ
                    {email}
                </p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({values, handleChange, setFieldValue}) => (
                        <Form>
                            <div className="flex justify-between mt-5">
                                {Array.from({length: 6}, (_, index) => {
                                    const fieldName = `otp${index + 1}` as keyof OtpType;
                                    return (
                                        <Field
                                            key={index}
                                            type="text"
                                            id={fieldName}
                                            name={fieldName}
                                            maxLength={1}
                                            value={values[fieldName]}
                                            onChange={(e: { target: { value: any } }) => {
                                                handleChange(e);
                                                const value = e.target.value;
                                                const nextField = document.getElementById(
                                                    `otp${index + 2}`
                                                );
                                                if (value && nextField) {
                                                    nextField.focus();
                                                }
                                            }}
                                            onKeyDown={(e: {
                                                key: string;
                                                target: { value: any };
                                            }) => {
                                                if (e.key === "Backspace") {
                                                    const value = e.target.value;
                                                    if (!value && index > 0) {
                                                        const prevField = document.getElementById(
                                                            `otp${index}`
                                                        );
                                                        if (prevField) {
                                                            prevField.focus();
                                                        }
                                                    }
                                                }
                                            }}
                                            onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
                                                const pasteData = e.clipboardData
                                                    .getData("text")
                                                    .trim();
                                                if (pasteData) {
                                                    const otpChars = pasteData.slice(0, 6).split("");
                                                    otpChars.forEach((char, idx) => {
                                                        const otpFieldName = `otp${idx + 1}`;
                                                        setFieldValue(otpFieldName, char);
                                                    });

                                                    // Automatically focus on the last filled input
                                                    const lastField = document.getElementById(
                                                        `otp${otpChars.length}`
                                                    );
                                                    if (lastField) {
                                                        lastField.focus();
                                                    }
                                                }
                                            }}
                                            className={`h-[40px] w-[40px] md:w-[60px] md:h-[60px] bg-transparent border focus:right-2 border-text_color_desc_light rounded-md text-center text-text_body_16`}
                                            placeholder="_"
                                        />
                                    );
                                })}
                            </div>

                            <div className="mt-6">
                                <Button
                                    type="submit"
                                    text="ផ្ទៀងផ្ទាត់លេខកូដ"
                                    isLoading={isLoading}
                                    className="w-full bg-primary text-white"
                                />
                            </div>

                            <p className="text-text_title_20 font-normal my-5 text-ascend_color">
                                {/* Countdown timer can be added here */}
                            </p>

                            <p className="text-text_body_16 text-text_color_light m-5 text-center">
                                មិន​ទាន់​មាន​អ៉ីមែល​ទេ?{" "}
                                <span
                                    onClick={() => handleResend()}
                                    className="text-accent text-link_color underline cursor-pointer"
                                >
                  ផ្ញើអ៉ីមែលឡើងវិញ
                </span>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}
