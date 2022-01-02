import {User, UserModel} from "../model/User";
import {UserDTO} from "../dto/UserDTO";
import {Theme, ThemeModel} from "../model/Theme";
import {APIError} from "../errorHandler/errorHandler";


export async function findOne({id, name}: { id?: string, name?: string }): Promise<User | null> {
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

export async function findAll(): Promise<User[]> {
    return UserModel.findAll({
        where: {
            deleted: false
        }
    })
}

export async function logicDelete(id: string): Promise<void> {
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

export async function create(user: UserDTO): Promise<User> {
    return UserModel.create(user)
}

// users <> themes

export async function addTheme(user: User, theme: Theme) {
    const userModel = user as UserModel
    const themeModel = theme as ThemeModel

    if (await userModel.hasThemeModels(themeModel)) {
        throw new APIError(400, 'User already has this theme')
    }
    return userModel.addThemeModels(themeModel)
}

export async function findAllThemesForUser(user: User) {
    const userModel = user as UserModel
    return userModel.getThemeModels()
}

export async function removeTheme(user: User, theme: Theme) {

    const userModel = user as UserModel
    const themeModel = theme as ThemeModel

    await userModel.removeThemeModels(themeModel)

    return userModel.getThemeModels()
}

