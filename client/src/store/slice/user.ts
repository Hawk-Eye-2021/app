import {createSlice} from "@reduxjs/toolkit";

export interface User {
    name: string
    id: string
}

export interface RootState {
    user: User | null,
}

export const user = createSlice(
    {
        name: 'user',
        initialState: {
            user: {id: "1", name: "Matias Miodosky"}
        } as RootState,
        reducers: {
            setUser: (state, action) => {
                state.user = {...state.user, ...action.payload}
            }
        }
    }
)