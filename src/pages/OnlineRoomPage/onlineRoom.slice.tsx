import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllOnlineRoomAPI } from './onlineRoom.services';
import { onlineRoomStateType, onlineRoomType } from './onlineRoom.type';

const initialState: onlineRoomStateType = {
  isLoading: false,
};

export const onlineRoomSlice = createSlice({
  name: 'onlineRoomSlice',
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const onlineRoomAction = onlineRoomSlice.actions;
export const onlineRoomReducer = onlineRoomSlice.reducer;

export const getAllOnlineRoom =
  (filter: string, onSuccess: (data: onlineRoomType[]) => void, onError: () => void) => async () => {
    try {
      let res = await getAllOnlineRoomAPI(filter);
      onSuccess(res.data);
    } catch (err) {
      onError();
    }
  };
