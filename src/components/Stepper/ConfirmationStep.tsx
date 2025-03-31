import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";
export default function ConfirmationStep() {
  return (
    <div className="w-full flex justify-between items-center">
      {/* first step */}
      <div className="  w-full items-center flex flex-col justify-center  space-y-2 ">
        <FaCheckCircle className="text-accent text-title h-6 w-6 " />
        <p className="text-[14px] text-accent">ព័ត៌មាន</p>
      </div>
      <hr className="bg-accent h-[1.5px] w-full mb-7" />
      {/* second  step */}
      <div className="  w-full items-center flex flex-col justify-center  space-y-2 ">
        <FaCheckCircle className="text-accent text-title h-6 w-6 " />
        <p className="bg-[14px] text-accent">ការបញ្ជាក់</p>
      </div>
      <hr className="bg-description h-[1.5px] w-full mb-7" />
      {/* third step */}
      <div className="  w-full items-center flex flex-col justify-center  space-y-2 ">
        <FaDotCircle className="text-description text-title h-6 w-6 " />
        <p className="text-[14px] text-description">ការទូទាត់</p>
      </div>
    </div>
  );
}
