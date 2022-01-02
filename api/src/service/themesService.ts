import {Theme} from "../model/Theme";
import {APIError} from "../errorHandler/errorHandler";
import * as themesRepository from "../repository/themesRepository";
import * as contentsService from "../service/contentsService"


export async function getThemes(): Promise<Theme[]> {
    return themesRepository.findAll()
}

export async function getThemeById(id: string): Promise<Theme> {
    const theme = await themesRepository.findOne({id})
    if (!theme) {
        throw new APIError(404, 'Theme not found')
    }
    return theme
}

export async function createTheme(theme: Theme): Promise<Theme> {
    const sameNameTheme = await themesRepository.findOne({name: theme.name})
    if (sameNameTheme) {
        throw new APIError(400, 'Theme with this name already exists')
    }
    return themesRepository.create(theme)
}

export async function deleteTheme(id: string): Promise<Theme> {
    const theme = await themesRepository.findOne({id})
    if (!theme) {
        throw new APIError(404, 'Theme not found')
    }
    await themesRepository.logicDelete(id)
    return theme
}


// themes <> contents

export async function addContentToTheme(themeId: string, {contentId}: {contentId: string}) {
    const theme = await getThemeById(themeId)
    if (!theme){
        throw new APIError(404, 'Theme not found')
    }

    const content = await contentsService.getContentById(contentId)
    if(!content){
        throw new APIError(404, 'Content not found')
    }

    await themesRepository.addContent(theme, content)

    return themesRepository.findAllContentsForTheme(theme)
}

export async function getContentsByTheme(id: string) {
    const theme  = await themesRepository.findOne({id})

    if(!theme){
        throw new APIError(404, 'Theme not found')
    }

    return themesRepository.findAllContentsForTheme(theme)
}