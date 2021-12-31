import {APIError} from "../errorHandler/errorHandler";
import {User, UserModel} from "../model/User";
import {UserDTO} from "../dto/UserDTO";
import * as usersRepository from "../repository/usersRepository";
import * as themesService from "../service/themesService"
import {ThemeModel} from "../model/Theme";

export const createUser = async (user: UserDTO): Promise<User> => {
    if (await usersRepository.findOne({name: user.name})) {
        throw new APIError(400, 'User with this name already exists');
    }
    return await usersRepository.create(user);
}
export const getUserById = async (id: string): Promise<User> => {
    console.log('getting user with id: ' + id)
    const user = await usersRepository.findOne({id})
    if (!user) {
        throw new APIError(404, `user not found for id ${id}`)
    }
    return user
}
export const getUsers = async (): Promise<User[]> => {
    return await usersRepository.findAll()
}

export const deleteUser = async (id: string): Promise<User> => {
    const user = await usersRepository.findOne({id})
    if (!user) {
        throw new APIError(404, `user not found for id ${id}`)
    }
    await usersRepository.logicDelete(id)
    return user
}

// users <> themes

export const getThemesByUserId = async (id: string) => {
    const user = await usersRepository.findOne({id})
    if (!user) {
        throw new APIError(404, `user not found for id ${id}`)
    }
    return usersRepository.findAllThemesForUser(user)
}

export const addTheme = async (userId: string, {themeId}: { themeId: string }) => {
    const user = await usersRepository.findOne({id: userId})
    if (!user) {
        throw new APIError(404, 'User not found');
    }

    const theme = await themesService.getThemeById(themeId)
    if (!theme) {
        throw new APIError(404, 'Theme not found');
    }

    await usersRepository.addTheme(user as UserModel, theme as ThemeModel)

    return usersRepository.findAllThemesForUser(user)
}

export const removeThemeForUser = async (userId: string, themeId: string) => {
    const user = await usersRepository.findOne({id: userId})
    if (!user) {
        throw new APIError(404, 'User not found');
    }

    const theme = await themesService.getThemeById(themeId)
    if (!theme) {
        throw new APIError(404, 'Theme not found');
    }
    return usersRepository.removeTheme(user, theme)
}


