import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkDeliveryPrice(uuid: string) {
  const deliveryPricePP = 1.25;
  if (uuid === "73e80a00-debf-4dce-a733-bda19af5774d") {
    return deliveryPricePP;
  } else {
    return 2.0;
  }
}

export function daysSince(timestamp: string) {
  const givenDate = new Date(timestamp);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInTime = currentDate.getTime() - givenDate.getTime();

  // Convert milliseconds to days
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

  return differenceInDays === 0 ? "ថ្ងៃនេះ" : `${differenceInDays} ថ្ងៃមុន`;
}
