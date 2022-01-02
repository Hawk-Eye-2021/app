import {Theme, ThemeModel} from "../model/Theme";
import {APIError} from "../errorHandler/errorHandler";
import {Content, ContentModel} from "../model/Content";


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

export async function findAll(): Promise<Theme[]> {
    return ThemeModel.findAll({
        where: {
            deleted: false
        }
    })
}

export async function logicDelete(theme: Theme): Promise<void> {
    const themeModel = theme as ThemeModel
    await themeModel.update({deleted: true})

    const contents = await themeModel.getContents()
    await Promise.all(contents.map(content => themeModel.removeContents(content)))

    const users = await themeModel.getUsers()
    await Promise.all(users.map(user => themeModel.removeUsers(user)))
}

export async function create(theme: Theme): Promise<Theme> {
    return ThemeModel.create(theme)
}

// themes <> contents

export async function findAllContentsForTheme(theme: Theme): Promise<Content[]> {
    const themeModel = theme as ThemeModel
    return themeModel.getContents()
}


export async function addContent(theme: Theme, content: Content) {

    const themeModel = theme as ThemeModel
    const contentModel = content as ContentModel

    if (await themeModel.hasContents(contentModel)) {
        throw new APIError(400, 'Content already added to theme')
    }
    await themeModel.addContents(contentModel)
    return themeModel.getContents()

}