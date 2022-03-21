import {createSlice} from "@reduxjs/toolkit";
import http from "../../http/http";
import SnackbarUtils from "../../utils/SnackbarUtils";

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

export const login = (username: string, password: string, callback: any) => (dispatch) => {
    http.post(`/users/login`, {username, password})
        .then(res => {
            dispatch(user.actions.setUser(res.data))
            callback()
            SnackbarUtils.info(`Bienvenido a HawkEye ${res.data.name}`)
        })
        .catch((err) => {
            const errResponse = err.response;
            if(errResponse.status === 400) {
                SnackbarUtils.error(errResponse.data.message)
            } else {
                SnackbarUtils.error("Ocurrió un error al hacer login!")
            }
        })
}

export const logout = () => (dispatch) => {
    dispatch(user.actions.setUser(null))
}