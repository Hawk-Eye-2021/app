import {Theme, ThemeModel} from "../model/Theme";
import {APIError} from "../errorHandler/errorHandler";
import {Content, ContentModel} from "../model/Content";
import {ThemeContent} from "../dto/ContentDTO";
import {ContentThemesModel} from "../model/ContentThemes";


export async function findOne({id, name}: { id?: string, name?: string }): Promise<Theme | null> {
    return ThemeModel.findOne(
        {
            where: {
                ...(id && {id}),
                ...(name && {name}),
                deleted: false
            }
        }
    )
}

export async function findAll(filters: {name?: string}): Promise<Theme[]> {
    return ThemeModel.findAll({
        where: {
            deleted: false,
            ...(filters.name ? {name: filters.name} : {})
        }
    })
}

export async function logicDelete(theme: Theme): Promise<void> {
    const themeModel = theme as ThemeModel
    await themeModel.update({deleted: true})
}

export async function create(theme: Theme): Promise<Theme> {
    return ThemeModel.create(theme)
}