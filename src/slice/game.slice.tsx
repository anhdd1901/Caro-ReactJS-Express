import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "gameSlice",
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
export const gameAction = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
