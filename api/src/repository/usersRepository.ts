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

// users <> themes

export const addTheme = async (user: User, theme: Theme) => {
    const userModel = user as UserModel
    const themeModel = theme as ThemeModel

    if (await userModel.hasThemeModels(themeModel)) {
        throw new APIError(400, 'User already has this theme')
    }
    return userModel.addThemeModels(themeModel)
}

export const findAllThemesForUser = async (user: User) => {
    const userModel = user as UserModel
    return userModel.getThemeModels()
}

export const removeTheme = async (user: User, theme: Theme) => {

    const userModel = user as UserModel
    const themeModel = theme as ThemeModel

    await userModel.removeThemeModels(themeModel)

    return userModel.getThemeModels()
}

