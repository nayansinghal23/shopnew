import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ISortBy {
  sortBy: string;
}

const initialState: ISortBy = {
  sortBy: "Dropdown",
};

export const sortBySlice = createSlice({
  name: "sortBy",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = sortBySlice.actions;
export const sortByReducer = sortBySlice.reducer;
