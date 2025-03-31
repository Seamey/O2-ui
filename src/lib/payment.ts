"use client";

export function Payment(amount : number) {
  const { BakongKHQR, khqrData, IndividualInfo } = require("bakong-khqr");

  const optionalData = {
    currency: khqrData.currency.usd,
    amount: amount,
    billNumber: "#0001",
    mobileNumber: "85561517679",
    storeLabel: "Cam-O2",
    terminalLabel: "POS-01",
  };

  const individualInfo = new IndividualInfo(
    "phy_lyman@aclb",
    "Phy lyman",
    "PHNOM PENH",
    optionalData
  );
  const khqr = new BakongKHQR();
  const response = khqr.generateIndividual(individualInfo);
  console.log("response", response);
  return response;
}
