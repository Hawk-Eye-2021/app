import {Theme} from "../model/Theme";
import {APIError} from "../errorHandler/errorHandler";
import themesRepository from "../repository/themesRepository";
import {User} from "../model/User";


const themeService = {

    getThemes: async (): Promise<Theme[]> => {
        return themesRepository.findAll()
    },

    getThemeById: async (id: string): Promise<Theme> => {
        const theme = await themesRepository.findOne({id})
        if (!theme) {
            throw new APIError(404, 'Theme not found')
        }
        return theme
    },

    getThemeByName: async (name: string): Promise<Theme> => {
        const theme = await themesRepository.findOne({name})
        if (!theme) {
            throw new APIError(404, 'Theme not found')
        }
        return theme
    },

    createTheme: async (theme: Theme): Promise<Theme> => {
        const sameNameTheme = await themesRepository.findOne({name: theme.name})
        if (sameNameTheme) {
            throw new APIError(400, 'Theme with this name already exists')
        }
        return themesRepository.create(theme)
    },

    deleteTheme: async (id: string): Promise<Theme> => {
        const theme = await themesRepository.findOne({id})
        if (!theme) {
            throw new APIError(404, 'Theme not found')
        }
        await themesRepository.logicDelete(id)
        return theme
    },

    getThemesByUserId: async (id: string) => {
        return themesRepository.findAllForUserId(id)
    }
}

export default themeService