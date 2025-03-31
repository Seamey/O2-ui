import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type OrderState = {
  uuid: string;
};

const initialState: OrderState = {
  uuid: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setUUID: (state, action: PayloadAction<string>) => {
      state.uuid = action.payload;
    },
  },
});

export const { setUUID } = orderSlice.actions;
export default orderSlice.reducer;
