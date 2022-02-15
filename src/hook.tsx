import type { RootState, AppDispatch } from "./store";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// The `state` arg is correctly typed as `RootState` already
//   const count = useAppSelector((state) => state.counter.value)
//   const dispatch = useAppDispatch()
