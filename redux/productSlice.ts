import { Product } from "@/interface/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IProduct {
  filteredProducts: Product[];
  selectedProduct: string;
}

const initialState: IProduct = {
  filteredProducts: [],
  selectedProduct: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilteredProducts: (state, action: PayloadAction<Product[]>) => {
      state.filteredProducts = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<string>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setFilteredProducts, setSelectedProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;
