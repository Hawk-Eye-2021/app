import {Theme} from "../model/Theme";
import {APIError} from "../errorHandler/errorHandler";
import * as themesRepository from "../repository/themesRepository";


export const getThemes = async (): Promise<Theme[]> => {
    return themesRepository.findAll()
}

export const getThemeById = async (id: string): Promise<Theme> => {
    const theme = await themesRepository.findOne({id})
    if (!theme) {
        throw new APIError(404, 'Theme not found')
    }
    return theme
}

export const getThemeByName = async (name: string): Promise<Theme> => {
    const theme = await themesRepository.findOne({name})
    if (!theme) {
        throw new APIError(404, 'Theme not found')
    }
    return theme
}

export const createTheme = async (theme: Theme): Promise<Theme> => {
    const sameNameTheme = await themesRepository.findOne({name: theme.name})
    if (sameNameTheme) {
        throw new APIError(400, 'Theme with this name already exists')
    }
    return themesRepository.create(theme)
}

export const deleteTheme = async (id: string): Promise<Theme> => {
    const theme = await themesRepository.findOne({id})
    if (!theme) {
        throw new APIError(404, 'Theme not found')
    }
    await themesRepository.logicDelete(id)
    return theme
}

export const getThemesByUserId = async (id: string) => {
    return themesRepository.findAllForUserId(id)
}

