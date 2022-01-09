import {configureStore} from "@reduxjs/toolkit";
import {user} from "./slice/user"
import {theme} from "./slice/theme"
import {TypedUseSelectorHook, useSelector} from "react-redux";

const store = configureStore({
    reducer: {
        user: user.reducer,
        theme: theme.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store

export type STORE_STATUS_CONSTANTS = 'loading' | 'error' | 'success'