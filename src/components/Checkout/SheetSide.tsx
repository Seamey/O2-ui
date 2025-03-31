"use client";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {FaCheckSquare} from "react-icons/fa";
import {useEffect, useState} from "react";
import ConfirmationStep from "../Stepper/ConfirmationStep";
import Stepper from "../Stepper/InformationStep";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";

import {useGetAllCartQuery} from "@/app/redux/service/cart";
import PaymentStep from "../Stepper/PaymentStep";
import {Cart} from "@/app/types/Cart";
import ProvinceSelect from "./ProvinceSelect";
import Image from "next/image";

import {useCreateOrderMutation} from "@/app/redux/service/order";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {QRCodeSVG} from "qrcode.react";
import {Coupon} from "@/app/types/Coupon";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useCreateSubmitOrderMutation} from "@/app/redux/service/order";
import {Payment} from "@/lib/payment";
import {useCreatePaymentCheckMutation} from "@/app/redux/service/payment";
import {PaymentType} from "@/app/types/Payment";
import {setUUID} from "@/app/redux/features/order";
import {useGetAllProvinceQuery} from "@/app/redux/service/province";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export default function SheetSide() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    // payment response from bakong
    const [paymentResponse, setPaymentResponse] = useState<PaymentType>();

    // to open second modal
    const [secondSheetOpen, setSecondSheetOpen] = useState(false);

    // to open third modal
    const [thirdSheetOpen, setThirdSheetOpen] = useState(false);

    // check if use read the policy
    const [isRead, setIsRead] = useState(false);

    // form data
    const [formData, setFormData] = useState<FormValues>();

    // coupon data
    const [result, setResult] = useState<{ data?: Coupon }>({});

    // coupon code
    const [inputCoupon, setInputCoupon] = useState("");

    // open alertdilog payment
    const [openPayment, setOpenPayment] = useState(false);

    // open alert coupon
    const [openCoupon, setOpenCoupon] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputCoupon(event.target.value);
    };

    // get all item
    const getAllCart = useGetAllCartQuery({});
    const data = getAllCart?.data?.data?.cart_items;

    // confrim order
    const [createSubmitOrder] = useCreateSubmitOrderMutation();

    // image base url
    const imageBaseUrl = process.env.NEXT_PUBLIC_O2_API_URL;

    const provinceData = useGetAllProvinceQuery({});

    // select province from redux
    const province = useAppSelector((state) => state.province);

    // comfrim order
    const [createOrder] = useCreateOrderMutation();

    // check payment stats
    const [checkPayment] = useCreatePaymentCheckMutation();

    // handle calulate coupon
    const handleCoupon = async () => {
        try {
            const response = await createOrder({
                province_uuid: province?.value || provinceData?.data?.data[0]?.uuid,
                coupon_code: inputCoupon,
            });
            if (response.data) {
                setOpenCoupon(true);
                setResult(response.data);
                toast.success("ការបញ្ចូលគូប៉ុងបានជោគជ័យ", {
                    style: {
                        background: "#22bb33",
                    },
                });
            } else {
                const errorResponse = response.error as FetchBaseQueryError;
                if (
                    errorResponse.data &&
                    typeof errorResponse.data === "object" &&
                    "errors" in errorResponse.data
                ) {
                    if ("message" in errorResponse?.data) {
                    }
                    toast.success(
                        `${(errorResponse.data as unknown as { message: string }).message}`,
                        {
                            style: {
                                background: "#bb2124",
                            },
                        }
                    );
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    //console.log(result?.data?.final_total);
    // get payment response
    useEffect(() => {
        const response = Payment(0.01);
        setPaymentResponse(response);
    }, []);

    // handle submit order
    const handleSubmitPaymentData = async (payment_id: number) => {
        try {
            const response = await createSubmitOrder({
                payment_id: payment_id,
                total_cart_value: result?.data?.total_cart_value || 0,
                final_total: result?.data?.final_total || 0,
                delivery_fee: result?.data?.delivery_fee || 0,
                province_uuid: province?.value || "",
                email: formData?.email || "",
                phone_number: formData?.phone_number || "",
                current_address: province?.name || "",
                google_map_link: formData?.google_map_link || "",
                remarks: formData?.remarks || "",
            });
            if (response.data) {
                setOpenPayment(false);
                dispatch(setUUID(response.data.order_uuid));
                router.push("/success-payment");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // handle check payment status
    const handleCheckPayment = async () => {
        try {
            setOpenPayment(true);
            const response = await checkPayment({
                md5_hash: paymentResponse?.data.md5 || "",
            });
            if (response.data) {
                handleSubmitPaymentData(response?.data?.payment_id);
                toast.success("ការបង់ប្រាក់បានជោគជ័យ", {
                    style: {
                        background: "#22bb33",
                    },
                });
            } else {
                toast.success("ការបង់ប្រាក់មិនបានជោគជ័យ", {
                    style: {
                        background: "#bb2124",
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // type for form values
    type FormValues = {
        google_map_link: string;
        phone_number: string;
        email: string;
        remarks: string;
    };

    const initialValues: FormValues = {
        email: "",
        google_map_link: "",
        phone_number: "",
        remarks: "",
    };

    const googleMapUrlRegex = /^(https?:\/\/)?(www\.)?(google\.[a-z]{2,6}\/maps|goo\.gl\/maps)(\/\?ftid=[^&]+&entry=[^&]+|\/.+|\/[a-zA-Z0-9]+)$/;

    const validationSchema = Yup.object({
        phone_number: Yup.string().required("អ្នកត្រូវបញ្ជូលលេខទូរស័ព្ទ"),
        google_map_link: Yup.string()
            // .matches(googleMapUrlRegex, "តំណភ្ជាប់ Google Map មិនត្រឹមត្រូវ")
            .required("អ្នកត្រូវបញ្ជូល Google Map Url"),
        email: Yup.string()
            .required("អ៉ីម៉ែលរបស់អ្នកមិនត្រឹមត្រូវ")
            .email("អ្នកត្រូវបញ្ជូលអ៉ីម៉ែលរបស់អ្នក"),
        remarks: Yup.string().max(500, "remarks must be under 500 characters"),
    });

    const handleSubmit = (values: FormValues) => {
        setFormData(values);
        setSecondSheetOpen(true);
    };

    return (
        <>
            {/* Information_step */}
            <Sheet>
                <SheetTrigger
                    className={`bottom-0 fixed w-full ${
                        data?.length === 0 ? "hidden " : "opacity-100"
                    }`}
                    disabled={data?.length === 0}
                >
                    <div
                        className="w-full bg-primary p-4 flex justify-center items-center text-card_color text-body space-x-3">
                        <p>បន្តទៅ Checkout</p>
                    </div>
                </SheetTrigger>
                <SheetContent
                    className="bg-card_color  rounded-tr-[45px] rounded-tl-[45px] "
                    side={"bottom"}
                >
                    <SheetTitle className="mb-5 text-title">
                        សូមបំពេញទម្រង់ខាងក្រោម
                    </SheetTitle>

                    {/* stepper */}
                    <Stepper/>

                    <div className="space-y-2 mt-2">
                        <p className="block text-body font-medium text-gray-700">
                            អាសយដ្ឋានបច្ចុប្បន្ន
                        </p>
                        <ProvinceSelect/>
                    </div>
                    {/* form */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="w-full max-w-md mx-auto py-5 space-y-4">
                            {/* Google Map URL */}
                            <div className="space-y-2">
                                <label className="block text-body font-medium text-gray-700">
                                    Google Map Url
                                </label>
                                <Field
                                    name="google_map_link"
                                    placeholder="https://maps.app.goo.gl/DxfRABb9k29WElpu6"
                                    className="w-full p-2  border-none ring-0 focus:ring-0 focus:outline-none bg-white rounded-none"
                                    style={{
                                        boxShadow: "none",
                                        border: "1px solid #0494FC",
                                        borderRadius: "10px",
                                    }}
                                />
                                <ErrorMessage
                                    name="google_map_link"
                                    component="div"
                                    className="text-red-500 text-body"
                                />
                            </div>

                            {/* phone_number  */}
                            <div className="space-y-2">
                                <label className="block text-body font-medium text-gray-700">
                                    លេខទូរស័ព្ទ
                                </label>
                                <Field
                                    name="phone_number"
                                    placeholder="072 72 67 89"
                                    className="w-full p-2  border-none ring-0 focus:ring-0 focus:outline-none bg-white rounded-none"
                                    style={{
                                        boxShadow: "none",
                                        border: "1px solid #0494FC",
                                        borderRadius: "10px",
                                    }}
                                />
                                <ErrorMessage
                                    name="phone_number"
                                    component="div"
                                    className="text-red-500 text-body"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="block text-body font-medium text-gray-700">
                                    អ៊ីមែល
                                </label>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Example@gmail.com"
                                    className="w-full p-2  border-none ring-0 focus:ring-0 focus:outline-none bg-white rounded-none"
                                    style={{
                                        boxShadow: "none",
                                        border: "1px solid #0494FC",
                                        borderRadius: "10px",
                                    }}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-body"
                                />
                            </div>

                            {/* remarks */}
                            <div className="space-y-2">
                                <label className="block text-body font-medium text-gray-700">
                                    មតិយោបល់
                                </label>
                                <Field
                                    as="textarea"
                                    name="remarks"
                                    placeholder="Remake For Our Delivery"
                                    className="w-full p-2  border-none ring-0 focus:ring-0 focus:outline-none bg-white rounded-none"
                                    style={{
                                        boxShadow: "none",
                                        border: "1px solid #0494FC",
                                        borderRadius: "10px",
                                        minHeight: "80px",
                                    }}
                                />
                                <ErrorMessage
                                    name="remarks"
                                    component="div"
                                    className="text-red-500 text-body"
                                />
                            </div>

                            {/* button next */}
                            <button
                                type="submit"
                                className="w-full bg-primary p-4 rounded-lg flex justify-center items-center text-card_color text-body space-x-3"
                            >
                                <p>បន្តទៅមុខ</p>
                            </button>
                        </Form>
                    </Formik>
                </SheetContent>
            </Sheet>

            {/* confirmation_step*/}
            <Sheet open={secondSheetOpen} onOpenChange={setSecondSheetOpen}>
                <SheetContent
                    className="bg-card_color h-[704px] flex flex-col justify-between  rounded-tr-[45px] rounded-tl-[45px] "
                    side={"bottom"}
                >
                    <SheetTitle className="mb-5 text-title">ការបញ្ជាក់</SheetTitle>

                    {/* confirmation_stepper */}
                    <ConfirmationStep/>

                    {/* information */}

                    {/* អាស័យដ្ឋានបច្ចុប្បន្ន */}
                    <div>
                        <p className="text-body text-description py-2">
                            អាស័យដ្ឋានបច្ចុប្បន្ន
                        </p>
                        <p className="text-body ">{province?.name}</p>
                    </div>

                    {/* Google Map Url */}
                    <div className=" w-[90%]">
                        <p className="text-body text-description py-2">Google Map Url</p>
                        <p className="text-body break-words">{formData?.google_map_link}</p>
                    </div>

                    {/* លេខទូរស័ព្ទ */}
                    <div>
                        <p className="text-body text-description py-2">លេខទូរស័ព្ទ</p>
                        <p className="text-body ">{formData?.phone_number}</p>
                    </div>

                    {/* អុីមែល */}
                    <div>
                        <p className="text-body text-description py-2">អុីមែល</p>
                        <p className="text-body ">
                            {formData?.email || "មិនបានបញ្ចូលអ៊ីមែល"}
                        </p>
                    </div>

                    {/* ចំណាំ */}
                    <div className="">
                        <p className="text-body text-description py-2">ចំណាំ</p>
                        <p className="text-body ">
                            {formData?.remarks || "មិនបានបញ្ចូលចំណាំ"}
                        </p>
                    </div>

                    {/* ​check box */}
                    <div className="flex ">
                        {isRead ? (
                            <FaCheckSquare className="text-primary h-6 w-6 "/>
                        ) : (
                            <div className="h-6 w-6 rounded-md border-[1.5px] border-description"></div>
                        )}
                        <p className="mx-1">
                            ខ្ញុំបានអាននិងទទួលយក{" "}
                            <AlertDialog>
                                <AlertDialogTrigger className="text-accent">
                                    សេចក្តីថ្លែងការឯកជនភាព
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-card_color w-[90%] rounded-[10px] p-6">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-title text-start">
                                            គោលការណ៍ឯកជនភាព
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-body text-start text-description">
                                            យើងនឹងមិនសងប្រាក់វិញសម្រាប់អ្វីដែលពួកគេបានទិញផលិតផលរបស់យើងទេ
                                            ហើយផលិតផលនឹងដឹកជញ្ជូនក្នុងរយៈពេល 1 ឬ 2
                                            ម៉ោងបន្ទាប់ពីការទូទាត់ជោគជ័យ។
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="items-end">
                                        <AlertDialogAction
                                            onClick={() => setIsRead(true)}
                                            className="bg-secondary w-min text-background_color "
                                        >
                                            យល់ព្រម
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </p>
                    </div>

                    <SheetTrigger className="w-full">
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                if (isRead) {
                                    setThirdSheetOpen(true);
                                }
                            }}
                            className={`w-full p-4 rounded-lg flex justify-center items-center text-card_color text-body space-x-3
      ${
                                isRead
                                    ? "bg-primary cursor-pointer"
                                    : "bg-primary-light-70  disabled:cursor-not-allowed"
                            }`}
                        >
                            <p>បន្តទៅមុខ</p>
                        </div>
                    </SheetTrigger>
                </SheetContent>
            </Sheet>

            {/* payment_step */}
            <Sheet open={thirdSheetOpen} onOpenChange={setThirdSheetOpen}>
                <SheetContent
                    className="bg-card_color max-h-[90%] rounded-tr-[45px] rounded-tl-[45px] overflow-y-auto "
                    side={"bottom"}
                >
                    <SheetTitle>
                        <p className="text-title mb-5">ការទូតទាត់</p>
                    </SheetTitle>

                    <PaymentStep/>
                    <p className="text-body text-description my-5">
                        សេចក្តីសង្ខេបនៃការបញ្ជាទិញ
                    </p>

                    {data?.map((item: Cart, index: number) => {
                        const image = `${imageBaseUrl}${item?.image}`.trim();
                        return (
                            <div key={index} className="flex border-t-2 border-b-2 p-3 ">
                                <div className="h-[80px] w-[80px] rounded-full mr-3">
                                    <Image
                                        src={image}
                                        width={100}
                                        height={100}
                                        alt=""
                                        unoptimized
                                        className="object-cover w-full h-full rounded-full"
                                    />
                                </div>

                                {/* product information */}
                                <div className=" p-3 flex flex-col justify-start items-start">
                                    {/* title product */}
                                    <p className="text-title mb-3">{item?.name}</p>

                                    {/* price */}
                                    <div className="">
                                        {item?.discounted_price === null ? (
                                            <div className="flex justify-center items-center ">
                                                <p className="text-title text-accent pr-2">
                                                    ${item?.original_price}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center items-center ">
                                                <p className="text-title text-accent pr-2">
                                                    ${item?.discounted_price}
                                                </p>
                                                <p className="text-description text-[16px] line-through">
                                                    ${item?.original_price}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* delivery fee */}

                    <div className=" my-5  ">
                        <p className="pb-5 text-body text-description">
                            សេវាដឹកជញ្ជូននៅក្នងទីក្រុងភ្នំពេញតម្លៃ{" "}
                            <span className="text-accent">1.25$</span>{" "}
                        </p>
                        <p className="text-body text-description">
                            សេវាដឹកជញ្ជូននៅក្នងតាមបណ្តាលខេត្តតម្លៃ{" "}
                            <span className="text-accent"> 2.00$</span>
                        </p>
                    </div>

                    {/* coupon */}
                    <div className="space-y-2 my-6">
                        <label className="block text-body font-medium text-gray-700">
                            លេខកូដការដូរ
                        </label>
                        <input
                            name="google_map_link"
                            placeholder="e.g. FIRSTORDER"
                            value={inputCoupon} // Controlled input
                            onChange={handleChange} // Update state on change
                            className="w-full p-2  border-none ring-0 focus:ring-0 focus:outline-none bg-white rounded-none"
                            style={{
                                boxShadow: "none",
                                border: "1px solid #0494FC",
                                borderRadius: "10px",
                            }}
                        />
                    </div>
                    <div
                        onClick={() => handleCoupon()}
                        className="my-5 w-full bg-primary p-4 rounded-lg flex justify-center items-center text-card_color text-body space-x-3"
                    >
                        <p>បញ្ចូលគូប៉ុង</p>
                    </div>
                    {/* trigger payment */}
                    <AlertDialog open={openPayment} onOpenChange={setOpenPayment}>
                        <AlertDialogContent
                            className="bg-card_color w-[90%] rounded-[15px]"
                            onClick={() => setOpenPayment(false)}
                        >
                            <div className="w-full h-full">
                                <Image
                                    src={"./khqr.svg"}
                                    width={120}
                                    height={120}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <AlertDialogTitle className="text-body items-start mx-10 text-accent">
                                ឈ្មោះអ្នកទទួល Cam-O2
                            </AlertDialogTitle>

                            <div className="flex items-end text-end mx-10">
                                <p className="text-[35px] mr-3">{result?.data?.final_total}</p>
                                <p className="text-body mb-2"> Khr </p>
                            </div>

                            {/* Dotted Line */}
                            <div className="border-t-2 border-dotted border-description w-full"></div>

                            {/* QR Code Section */}
                            <div className="w-full flex justify-center my-5">
                                <QRCodeSVG value={paymentResponse?.data?.qr || ""} size={250}/>
                            </div>
                        </AlertDialogContent>
                    </AlertDialog>
                </SheetContent>
            </Sheet>

            {/* when coupon success  */}
            <AlertDialog open={openCoupon} onOpenChange={setOpenCoupon}>
                <AlertDialogContent
                    onClick={() => setOpenCoupon(false)}
                    className="bg-card_color w-[90%] rounded-[10px] p-6"
                >
                    <AlertDialogTitle className="items-center flex flex-col justify-center">
                        <p className="text-title text-primary text-center">
                            ការបញ្ចូលគូប៉ុងបានជោគជ័យ
                        </p>
                        {/* success image */}
                        <Image src={"/success.png"} width={150} height={150} alt="image" className="my-5 object-cover"/>
                    </AlertDialogTitle>
                    <p className="text-title text-primary text-center">
                        អ្នកបានសន្សំ{" "}
                        <span className="text-accent">
              {result?.data?.coupon_discount}{" "}
            </span>{" "}
                        ជាមួយនឹងការបញ្ចុះតម្លៃគូប៉ុងនេះ!
                    </p>
                    <div
                        onClick={() => handleCheckPayment()}
                        className="bg-primary p-4 items-center flex justify-center rounded-[10px]"
                    >
                        <p className="text-title text-background_color">បង់ប្រាក់</p>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
