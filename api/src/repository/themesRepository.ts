import {User, UserModel} from "../model/User";
import {Theme, ThemeModel} from "../model/Theme";
import {APIError} from "../errorHandler/errorHandler";
import {Content, ContentModel} from "../model/Content";




export const findOne = async ({id, name}: { id?: string, name?: string }): Promise<Theme | null> => {
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
export const findAll = async (): Promise<Theme[]> => {
    return ThemeModel.findAll({
        where: {
            deleted: false
        }
    })
}

export const logicDelete = async (id: string): Promise<void> => {
    await ThemeModel.update(
        {
            deleted: true
        },
        {
            where: {
                id
            }
        }
    )
}

export const create = async (theme: Theme): Promise<Theme> => {
    return ThemeModel.create(theme)
}

// themes <> contents

export async function findAllContentsForTheme(theme: Theme): Promise<Content[]> {
    const themeModel = theme as ThemeModel
    return themeModel.getContentModels()
}


export async function addContent(theme: Theme, content: Content) {

    const themeModel = theme as ThemeModel
    const contentModel = content as ContentModel

    if (await themeModel.hasContentModels(contentModel)){
        throw new APIError(400, 'Content already added to theme')
    }
    await themeModel.addContentModels(contentModel)
    return themeModel.getContentModels()

}