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

export async function logicDelete(user: User): Promise<void> {
    const userModel = user as UserModel
    await userModel.update({deleted: true})
    await userModel.removeThemes()
}

export async function create(user: UserDTO): Promise<User> {
    return UserModel.create(user)
}

// users <> themes

export async function addTheme(user: User, theme: Theme) {
    const userModel = user as UserModel
    const themeModel = theme as ThemeModel

    if (await userModel.hasThemes(themeModel)) {
        throw new APIError(400, 'User already has this theme')
    }
    return userModel.addThemes(themeModel)
}

export async function findAllThemesForUser(user: User) {
    const userModel = user as UserModel
    return userModel.getThemes()
}

export async function removeTheme(user: User, theme: Theme) {

    const userModel = user as UserModel
    const themeModel = theme as ThemeModel

    await userModel.removeThemes(themeModel)

    return userModel.getThemes()
}

