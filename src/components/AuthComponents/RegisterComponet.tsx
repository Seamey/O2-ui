"use client";
import { Form, Formik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import { IoChevronBackCircle } from "react-icons/io5";
import Label from "./LabelComponent";
import DynamicField from "./AuthField";
import { FcGoogle } from "react-icons/fc";
import ErrorDynamic from "./ErrorComponent";
import PasswordField from "./PasswordField";
import Button from "./ButtonComponentForAuth";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

import { useCreateRegisterMutation } from "@/app/redux/service/auth";
import { toast } from "sonner";
import { RegisterFormType } from "@/app/types/Auth";
import { useAppDispatch } from "@/app/redux/hooks";
import { setEmail } from "@/app/redux/features/email";

export default function RegisterComponet() {
  const router = useRouter();

  // dispatch email
  const dispatch = useAppDispatch();

  // register mutation
  const [createRegister] = useCreateRegisterMutation();

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (values: RegisterFormType) => {
    try {
      setIsLoading(true);
      const response = await createRegister(values);
      if (response.data) {
        dispatch(setEmail(values?.email));
        toast.success("ការចុះឈ្មោះបានជោគជ័យ", {
          style: {
            background: "#22bb33",
          },
        });
        router.push("/verify");
      } else {
        toast.success("ការចុះឈ្មោះមិនបានជោគជ័យ", {
          style: {
            background: "#bb2124",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterWithGoogle = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_O2_API_URL}api/auth/google`,
      );
      console.log(response)
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("អ្នកត្រូវបញ្ជូលឈ្មោះរបស់អ្នក"),
    email: Yup.string()
      .email("អ៉ីម៉ែលរបស់អ្នកមិនត្រឹមត្រូវ")
      .required("អ្នកត្រូវបញ្ជូលអ៉ីម៉ែលរបស់អ្នក"),
    password: Yup.string()
      .min(8, "ពាក្យសម្ងាត់របស់អ្នកខ្លីពេក, សូមបញ្ជូលពាក្យសម្ងាត់ 8 តួរ")
      .required("អ្នកត្រូវបញ្ជូលពាក្យសម្ងាត់របស់អ្នក"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "ពាក្យសម្ងាត់របស់អ្នកមិនដូចគ្នា")
      .required("អ្នកត្រូវបញ្ជូលពាក្យសម្ងាត់បញ្ជាក់"),
  });

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
        <p className="text-[24px]">បង្កើតគណនី</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {() => (
            <Form className="py-5 mt-4">
              <div className="space-y-4">
                {/* name */}
                <div>
                  <Label htmlFor="name" text="ឈ្មោះ" required />
                  <DynamicField
                    type="text"
                    name="name"
                    id="name"
                    placeholder="សូមបញ្ជូលឈ្មោះរបស់អ្នក"
                  />
                  <ErrorDynamic name="name" component="div" />
                </div>
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

                {/* password */}
                <div>
                  <Label htmlFor="password" text="ពាក្យសម្ងាត់" required />
                  <PasswordField
                    name="password"
                    id="password"
                    placeholder="សូមបញ្ជូលពាក្យសម្ងាត់របស់អ្នក"
                  />
                  <ErrorDynamic name="password" component="div" />
                </div>

                {/* comfirm password */}
                <div>
                  <Label
                    htmlFor="password_confirmation"
                    text="ពាក្យសម្ងាត់បញ្ជាក់"
                    required
                  />
                  <PasswordField
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="សូមបញ្ជូលពាក្យសម្ងាត់បញ្ជាក់"
                  />
                  <ErrorDynamic name="password_confirmation" component="div" />
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

        {/* divide  */}
        <div className="flex justify-center items-center">
          <div className="flex-1 bg-description h-[0.7px]"></div>
          <div className="px-3">ឬ</div>
          <div className="flex-1 bg-description h-[0.7px]"></div>
        </div>

        {/* google button login */}

        <div className="mt-6 ">
          <Button
            onClick={() => handleRegisterWithGoogle()}
            icon={<FcGoogle className="text-title mr-2" />}
            type="submit"
            text="បង្កើតគណនីតាម Google"
            className="w-full border-[1px] text-body "
          />
        </div>
      </div>
    </section>
  );
}
