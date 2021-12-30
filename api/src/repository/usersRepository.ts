import {User, UserModel} from "../model/User";
import {UserDTO} from "../dto/UserDTO";
import {Theme, ThemeModel} from "../model/Theme";
import {APIError} from "../errorHandler/errorHandler";


export const findOne = async ({id, name}: { id?: string, name?: string }): Promise<User | null> => {
    return UserModel.findOne(
        {
            where: {
                ...(id && {id}),
                ...(name && {name}),
                deleted: false
            }
        }
    )
}

export const findAll = async (): Promise<User[]> => {
    return UserModel.findAll({
        where: {
            deleted: false
        }
    })
}

export const logicDelete = async (id: string): Promise<void> => {
    await UserModel.update(
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
export const create = async (user: UserDTO): Promise<User> => {
    return UserModel.create(user)
}

export const addTheme = async (userId: string, themeId: string): Promise<Theme[]> => {
    const user = await UserModel.findOne({
        where: {
            id: userId,
            deleted: false
        }
    })

    if (!user) {
        throw new APIError(404, 'User not found')
    }

    const theme = await ThemeModel.findOne({
        where: {
            id: themeId,
            deleted: false
        }
    })

    if (!theme) {
        throw new APIError(404, 'Theme not found')
    }

    await user.addThemeModels(theme)

    return user.getThemeModels()
}

export const findAllThemesForUserId = async (id: string) => {
    const user = await UserModel.findOne({
        where: {
            id,
            deleted: false
        }
    })

    if (!user) {
        throw new APIError(404, 'User not found')
    }

    return user.getThemeModels()
}

export const removeTheme = async (userId: string, themeId: string) => {
    const user = await UserModel.findOne({
        where: {
            id: userId,
            deleted: false
        }
    })

    const theme = await ThemeModel.findOne({
        where: {
            id: themeId,
            deleted: false
        }
    })

    if (!user) {
        throw new APIError(404, 'User not found')
    }

    if (!theme) {
        throw new APIError(404, 'Theme not found')
    }

    await user.removeThemeModels(theme)

    return user.getThemeModels()
}

