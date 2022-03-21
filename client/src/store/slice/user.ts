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
            user: null
        } as RootState,
        reducers: {
            setUser: (state, action) => {
                state.user = {...state.user, ...action.payload}
            }
        }
    }
)

export const login = (username: string, password: string) => (dispatch) => {
    // http.post(`/users/login`, {username, password})
    //     .then(res => {
    //         dispatch(theme.actions.setUserThemes(res.data))
    //         dispatch(theme.actions.setUserThemesStatus('success'))
    //     })
    //     .catch(() => {
    //         dispatch(theme.actions.setUserThemesStatus('error'))
    //     })
    dispatch(user.actions.setUser({id: 1, name: "Mariano Longo"}))
}

export const logout = () => (dispatch) => {
    dispatch(user.actions.setUser(null))
}