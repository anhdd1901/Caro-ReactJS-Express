import { loginReducer } from './pages/LoginPage/login.slice';
import { gameReducer } from './pages/GamePage/game.slice';

import { configureStore } from '@reduxjs/toolkit';
import { signUpReducer } from './pages/SignUp/signUp.slice';
import { onlineRoomReducer } from './pages/OnlineRoomPage/onlineRoom.slice';

const store = configureStore({
  reducer: {
    loginReducer: loginReducer,
    signUpReducer: signUpReducer,
    gameReducer: gameReducer,
    onlineRoomReducer: onlineRoomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
