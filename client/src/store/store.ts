import {configureStore} from "@reduxjs/toolkit";
import {root} from "./slice"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const store = configureStore({reducer: root.reducer})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export default store