"use client";
import { useAppSelector } from "@/app/redux/hooks";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import { IoChevronBackCircle } from "react-icons/io5";
import {
  useLazyGetInvoicePDFQuery,
  useGetPaymentInvoiceQuery,
} from "@/app/redux/service/invoice";
import { FaCheckCircle } from "react-icons/fa";
export default function SuccessPayment() {
  // generate invoice
  const [triggerGetInvoicePDF] = useLazyGetInvoicePDFQuery();

  const router = useRouter();
  const orderUUID = useAppSelector((state) => state.order.uuid);
  const { data } = useGetPaymentInvoiceQuery({ uuid: orderUUID });

  const handleGetInvoice = async () => {
    try {
      const result = await triggerGetInvoicePDF({ uuid: orderUUID }).unwrap();

      // Directly handle the Blob response
      if (result) {
        const url = window.URL.createObjectURL(result);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice-${orderUUID}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("No data received");
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  return (
    <div className="w-full h-screen p-5 ">
      <div
        onClick={() => router.push("/")}
        className="h-[50px] w-[50px] flex flex-col items-start justify-start"
      >
        <IoChevronBackCircle className="h-full w-full text-primary" />
      </div>

      {/* information */}
      <div className="w-full h-full space-y-5">
        <DotLottieReact
          className=" h-[250px] "
          src="https://lottie.host/75c90a35-060c-4b39-b728-c58ee9f3f3d2/XjiDBninMp.lottie"
          loop
          autoplay
        />
        <div>
          {/* invoice */}
          <div className="">
            <div>
              <p className="text-heading">Information</p>
              <hr className="text-description my-5 " />
            </div>
            {/* status */}
            <div>
              <div className="flex justify-between">
                <p className="text-font_description  text-description">
                  Status
                </p>
                <p className="text-primary text-body  flex items-center justify-center">
                  success{" "}
                  <span className="text-body text-primary pl-3 ">
                    <FaCheckCircle />
                  </span>{" "}
                </p>
              </div>
              <hr className="text-description my-5 " />
            </div>
            {/* sender account */}
            <div>
              <div className="flex justify-between">
                <p className="text-font_description text-description">
                  Sender account ID
                </p>
                <p className=" text-body  ">{data?.data?.from_account}</p>
              </div>
              <hr className="text-description my-5 " />
            </div>
            {/* reciption  account */}
            <div>
              <div className="flex justify-between">
                <p className="text-font_description text-description">
                  Recipient account ID
                </p>
                <p className=" text-body  ">{data?.data?.to_account}</p>
              </div>
              <hr className="text-description my-5 " />
            </div>
            {/* Amount */}
            <div>
              <div className="flex justify-between">
                <p className="text-font_description text-description">Amount</p>
                <p className=" text-title text-accent  ">$ {data?.data?.amount}</p>
              </div>
              <hr className="text-description my-5 " />
            </div>
            {/* transaction date */}
            <div>
              <div className="flex justify-between">
                <p className="text-font_description text-description">
                  Transaction Date
                </p>
                <div>
                  <p className=" text-body   ">{data?.data?.payment_date}</p>
                  <p className="text-body text-description">
                    {data?.transaction_place}
                  </p>
                </div>
              </div>
              <hr className="text-description my-5 " />
            </div>
          </div>
        </div>

        <div
          onClick={() => handleGetInvoice()}
          className="w-full bg-primary p-4 rounded-lg flex justify-center items-center text-card_color text-body space-x-3"
        >
          <p>ទាញយកវិក្កយបត្រ</p>
        </div>
      </div>
    </div>
  );
}
