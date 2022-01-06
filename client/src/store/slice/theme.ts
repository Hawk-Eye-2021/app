import {createSlice} from "@reduxjs/toolkit";
import {ThemeDTO} from "../../dto/ThemeDTO";
import http from "../../http/http";
import {STORE_STATUS_CONSTANTS} from "../store";

import SnackbarUtils from 'src/utils/SnackbarUtils'
export interface ThemeState {
    userThemes: ThemeDTO[];
    getUserThemesStatus: string;
}

export const theme = createSlice(
    {
        name: 'theme',
        initialState: {
            userThemes: [],
            getUserThemesStatus: 'loading'
        } as ThemeState,
        reducers: {
            setUserThemes: (state, action) => {
                state.userThemes = action.payload
            },
            addUserTheme: (state, action) => {
                state.userThemes.push(action.payload)
            },
            removeUserTheme: (state, action) => {
                state.userThemes = state.userThemes.filter((theme) => theme.id !== action.payload)
            },
            setUserThemesStatus: (state, action) => {
                state.getUserThemesStatus = action.payload
            }
        }
    }
)

export const getThemesFromUser = (id: string) => (dispatch) => {
    http.get(`/users/${id}/themes`)
        .then(res => {
            dispatch(theme.actions.setUserThemes(res.data))
            dispatch(theme.actions.setUserThemesStatus(STORE_STATUS_CONSTANTS.SUCCESS))
        })
        .catch(() => {
            dispatch(theme.actions.setUserThemesStatus(STORE_STATUS_CONSTANTS.ERROR))
        })
}

export const postTheme = (userId, value, closeModal) => (dispatch) => {
    if (value && value.id) {
        http.post(`/users/${userId}/themes`, {themeId: value.id})
            .then(() => {
                closeModal();
                dispatch(theme.actions.addUserTheme({...value}))
                SnackbarUtils.success("Se agregó el tema exitosamente!")
            })
            .catch(() => {
                SnackbarUtils.error("Ocurrió un error al agregar el tema!")
            })
    } else {
        http.post(`/themes`, {name: value.name})
            .then(res => {
                http.post(`/users/${userId}/themes`, {themeId: res.data.id})
                    .then(() => {
                        closeModal();
                        dispatch(theme.actions.addUserTheme(res.data))
                        SnackbarUtils.success("Se agregó el tema exitosamente!")
                    })
                    .catch(() => {
                        SnackbarUtils.error("Ocurrió un error al agregar el tema!")
                    })
            })
    }
}

export const deleteTheme = (userId, themeToDelete) => (dispatch) => {
    http.delete(`/users/${userId}/themes/${themeToDelete.id}`)
        .then(() => {
            dispatch(theme.actions.removeUserTheme(themeToDelete.id))
            SnackbarUtils.success(`Se borró el tema ${themeToDelete.name}`)
        })
        .catch(() => {
            SnackbarUtils.error(`Ocurrió un error al borrar el tema ${themeToDelete.name}`)
        })
}