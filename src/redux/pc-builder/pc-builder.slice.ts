import { IProduct } from "@/src/interface/product.interface";
import { createSlice } from "@reduxjs/toolkit";

export interface PcBuilderState {
  cartItems: IProduct[];
}

const initialState: PcBuilderState = {
  cartItems: [],
};

const pcBuilderSlice = createSlice({
  name: "pc-builder",
  initialState,
  reducers: {
    setCartItems: (state, action: { payload: IProduct }) => {
      if (state.cartItems.includes(action.payload)) {
        state.cartItems = state.cartItems.filter(
          (item) => item !== action.payload
        );
        return;
      }
      state.cartItems.push(action.payload);
    },
    removeItem: (state, action: { payload: string }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    removeAll: (state) => {
      state.cartItems = [];
    },
  },
});

export const { setCartItems, removeItem, removeAll } = pcBuilderSlice.actions;
export default pcBuilderSlice.reducer;
