"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { IoChevronBackCircle } from "react-icons/io5";
import { Form, Formik } from "formik";
import Image from "next/image";
import Label from "./LabelComponent";
import DynamicField from "./AuthField";
import ErrorDynamic from "./ErrorComponent";
import Button from "./ButtonComponentForAuth";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/hooks";
import { useCreateRequestResetPasswordMutation } from "@/app/redux/service/auth";
import { toast } from "sonner";
import { setEmail } from "@/app/redux/features/email";
export default function ForgotPasswordComponent() {
  // request for reset password
  const [forgetPassword] = useCreateRequestResetPasswordMutation();

  // for routing
  const router = useRouter();

  // email from dispatch
  const dispatch = useAppDispatch();

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("អ៉ីម៉ែលរបស់អ្នកមិនត្រឹមត្រូវ")
      .required("អ្នកត្រូវបញ្ជូលអ៉ីម៉ែលរបស់អ្នក"),
  });

  const handleForgetPassword = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await forgetPassword({
        email: values?.email,
      });
      if (response.data) {
        router.push("/otp-component-reset");
        dispatch(setEmail(values?.email));
        toast.success("សំណើរបស់អ្នកបានជោគជ័យ", {
          style: {
            background: "#22bb33",
          },
        });
      } else {
        toast.success("សំណើរបស់អ្នកមិនបានជោគជ័យ", {
          style: {
            background: "#bb2124",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.success("សំណើរបស់អ្នកមិនបានជោគជ័យ", {
        style: {
          background: "#bb2124",
        },
      });
    }
  };

  return (
    <section className="bg-primary w-full h-screen flex flex-col justify-between">
      {/* header section */}

      {/* icon back */}
      <div className=" px-5 pt-5 ">
        <div className="h-[50px] w-[50px] flex flex-col items-start justify-start">
          <IoChevronBackCircle className="h-full w-full text-card_color" />
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
        <p className="text-[24px] mb-2">ភ្លេចពាក្យសម្ងាត់</p>
        <p className="text-body text-description">
          សូមបញ្ចូលអ៊ីមែលរបស់អ្នកដើម្បីកំណត់ពាក្យសម្ងាត់ឡើងវិញ
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleForgetPassword}
        >
          {() => (
            <Form className="py-5 mt-4">
              <div className="space-y-4">
                {/* email */}
                <div>
                  <Label htmlFor="email" text="អ៉ីម៉ែល" required />
                  <DynamicField
                    type="text"
                    name="email"
                    id="email"
                    placeholder="សូមបញ្ជូលអ៉ីម៉ែលរបស់អ្នក"
                  />
                  <ErrorDynamic name="email" component="div" />
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
