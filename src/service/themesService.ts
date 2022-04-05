import {Theme} from "../model/Theme";
import {APIError} from "../errorHandler/errorHandler";
import * as themesRepository from "../repository/themesRepository";
import * as contentsService from "../service/contentsService"
import * as contentThemesRepository from "../repository/contentThemesRepository"
import {ContentThemes} from "../model/ContentThemes";
import {getSynonymsForTheme} from "./synonymsService";
import {distinct} from "../util/distinct";
import {SentimentsCounts, ThemeWithSentimentsCountsDTO} from "../dto/ThemeDTO";
import {abortControllerWithReason} from "@reduxjs/toolkit/dist/listenerMiddleware/utils";


export async function getThemes(filters: { name?: string }): Promise<Theme[]> {
    return themesRepository.findAll(filters)
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
    await themesRepository.logicDelete(theme)
    return theme
}


// themes <> contents

export async function addContentToTheme(themeId: string, {
    contentId,
    sentiment
}: { contentId: string, sentiment: string }): Promise<ContentThemes[]> {
    const theme = await getThemeById(themeId)
    if (!theme) {
        throw new APIError(404, 'Theme not found')
    }

    const content = await contentsService.getContentById(contentId)
    if (!content) {
        throw new APIError(404, 'Content not found')
    }

    const existentContentThemes = await contentThemesRepository.findForContentAndTheme(contentId, themeId)
    if (existentContentThemes) {
        throw new APIError(400, 'content already exists on theme')
    }

    await contentThemesRepository.create(theme.id, content.id, sentiment)
    return await contentThemesRepository.findAllForTheme(theme.id)
}

export async function getContentsByTheme(id: string): Promise<ContentThemes[]> {
    const theme = await themesRepository.findOne({id})

    if (!theme) {
        throw new APIError(404, 'Theme not found')
    }

    const synonyms = await getSynonymsForTheme(theme.id)
    const synonymsThemes = synonyms.flatMap(synonym => [synonym.theme1Id, synonym.theme2Id]).filter(distinct)

    return await contentThemesRepository.findAllForTheme(theme.id, synonymsThemes)
}


export function getSentimentsCounts(themeIds: string[]): Promise<SentimentsCounts[]> {

    return contentThemesRepository.findAllSentiments(themeIds)

}