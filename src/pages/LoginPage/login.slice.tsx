import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAPI } from './login.services';
import { loginResType, loginStateType } from './login.type';

const initialState: loginStateType = {
  isLoading: false,
};

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const loginAction = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

export const login =
  (username: string, password: string, onSuccess?: (res: loginResType) => void, onError?: () => void) => async () => {
    try {
      let res = await loginAPI(username, password);
      onSuccess && onSuccess(res.data);
    } catch {
      onError && onError();
    }
  };
