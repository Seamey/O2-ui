"use client";
import {
  setSelectedProvinceName,
  setSelectedProvinceUUID,
} from "@/app/redux/features/selectProvince";
import { useAppDispatch } from "@/app/redux/hooks";
import { useGetAllProvinceQuery } from "@/app/redux/service/province";
import { Province } from "@/app/types/Province";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function ProvinceSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Phnom Penh");

  const dispatch = useAppDispatch();

  const provinceData = useGetAllProvinceQuery({});
  const data = provinceData?.data?.data;

  return (
    <div className="relative inline-block w-full">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 text-card_color bg-primary rounded-lg  focus:outline-none"
      >
        {selected}
        <IoIosArrowDown
          className={`transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg  z-10 overflow-y-auto max-h-64">
          {data?.map((province: Province, index: number) => (
            <li
              key={index}
              onClick={() => {
                setSelected(province?.name || "");
                dispatch(setSelectedProvinceUUID(province?.uuid || ""));
                dispatch(setSelectedProvinceName(province?.name || ""));
                setIsOpen(false);
              }}
              className="px-4 py-2  hover:bg-gray-200 cursor-pointer"
            >
              {province?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
