import { loginReducer } from './slice/login.slice';
import { gameReducer } from './slice/game.slice';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    loginReducer: loginReducer,
    gameReducer: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
