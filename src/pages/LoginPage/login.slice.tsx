import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI, loginAPI } from './login.services';
import { loginResType, loginStateType } from './login.type';

const initialState: loginStateType = {
  username: '',
  userID: '',
};

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setUserID: (state, action: PayloadAction<string>) => {
      state.userID = action.payload;
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

export const auth = (onSuccess?: (data: loginResType) => void, onError?: () => void) => async () => {
  try {
    let res = await authAPI();
    onSuccess && onSuccess(res.data);
  } catch {
    onError && onError();
  }
};
