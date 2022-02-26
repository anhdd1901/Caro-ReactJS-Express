import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userType } from '../LoginPage/login.type';
import { getUserInfoAPI } from './game.services';
import { gameStateType } from './game.type';

const initialState: gameStateType = {
  socket: null,
  opponentID: '',
  isYouMoveFirst: false,
  playingRoomID: '',
};

export const gameSlice = createSlice({
  name: 'gameSlice',
  initialState: initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setOpponentID: (state, action: PayloadAction<string>) => {
      state.opponentID = action.payload;
    },
    setYouMoveFirst: (state, action: PayloadAction<boolean>) => {
      state.isYouMoveFirst = action.payload;
    },
    setPlayingRoomID: (state, action: PayloadAction<string>) => {
      state.playingRoomID = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const gameAction = gameSlice.actions;
export const gameReducer = gameSlice.reducer;

export const getUserInfo =
  (id: string, onSuccess?: (user?: userType, errorMess?: string) => void, onError?: () => void) => async () => {
    try {
      let res = await getUserInfoAPI(id);
      onSuccess && onSuccess(res.data.user, res.data.errorMess);
    } catch {
      onError && onError();
    }
  };
