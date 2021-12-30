import {UserModel} from "../model/User";
import {Theme, ThemeModel} from "../model/Theme";
import {APIError} from "../errorHandler/errorHandler";


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

export const findAllForUserId = async (id: string): Promise<Theme[]> => {
    const user = await UserModel.findOne({
        where: {
            id
        }
    })

    if (!user) {
        throw new APIError(404, 'User not found')
    }

    return user.getThemeModels()

}

