import { CartProduct } from "@/interface/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ICart {
  cartProducts: CartProduct[];
}

const initialState: ICart = {
  cartProducts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartProducts: (state, action: PayloadAction<CartProduct[]>) => {
      state.cartProducts = action.payload;
    },
  },
});

export const { setCartProducts } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
