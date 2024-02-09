import { Product } from "@/interface/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IProduct {
  filteredProducts: Product[];
}

const initialState: IProduct = {
  filteredProducts: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilteredProducts: (state, action: PayloadAction<Product[]>) => {
      state.filteredProducts = action.payload;
    },
  },
});

export const { setFilteredProducts } = productSlice.actions;
export const productReducer = productSlice.reducer;
