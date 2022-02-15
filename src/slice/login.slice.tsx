import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const loginAction = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
