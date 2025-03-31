import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type OTPState = {
  value: string;
};

const initialState: OTPState = {
  value: "",
};

export const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setOTP: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setOTP } = otpSlice.actions;
export default otpSlice.reducer;
