import { Province } from "@/app/types/Province";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Province = {
  value: "0030b0b4-ddc7-4e92-8d8e-de39adc83091",
  name: "Phnom Penh",
};

export const provinceSlice = createSlice({
  name: "province",
  initialState,
  reducers: {
    setSelectedProvinceUUID: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setSelectedProvinceName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setSelectedProvinceUUID, setSelectedProvinceName } =
  provinceSlice.actions;
export default provinceSlice.reducer;
