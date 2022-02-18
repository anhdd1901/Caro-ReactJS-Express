import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signUpAPI } from './signUp.services';
import { signUpResType, signUpStateType } from './signUp.type';

const initialState: signUpStateType = {
  isLoading: false,
};

export const signUpSlice = createSlice({
  name: 'signUpSlice',
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const signUpAction = signUpSlice.actions;
export const signUpReducer = signUpSlice.reducer;

export const signUp =
  (username: string, password: string, onSuccess?: (res: signUpResType) => void, onError?: () => void) => async () => {
    try {
      let res = await signUpAPI(username, password);
      onSuccess && onSuccess(res.data);
    } catch {
      onError && onError();
    }
  };
