import {APIError} from "../errorHandler/errorHandler";
import {User, UserModel} from "../model/User";
import {UserDTO} from "../dto/UserDTO";
import * as usersRepository from "../repository/usersRepository";
import * as themesService from "../service/themesService"
import {Theme, ThemeModel, ThemeWithSentimentsCount} from "../model/Theme";

const DEFAULT_SENTIMENTS_COUNTS = {
    neutral: 0,
    positive: 0,
    negative: 0
}

export async function createUser(user: UserDTO): Promise<User> {
    if (await usersRepository.findOne({name: user.name})) {
        throw new APIError(400, 'Ya existe un usuario con ese nombre');
    }
    if (await usersRepository.findOne({email: user.email})) {
        throw new APIError(400, 'Ya existe un usuario con ese mail');
    }
    return await usersRepository.create(user);
}

export async function getUserById(id: string): Promise<User> {
    console.log('getting user with id: ' + id)
    const user = await usersRepository.findOne({id})
    if (!user) {
        throw new APIError(404, `user not found for id ${id}`)
    }
    return user
}

export async function getUsers(): Promise<User[]> {
    return await usersRepository.findAll()
}

export async function deleteUser(id: string): Promise<User> {
    const user = await usersRepository.findOne({id})
    if (!user) {
        throw new APIError(404, `user not found for id ${id}`)
    }
    await usersRepository.logicDelete(user)
    return user
}

// users <> themes

export async function getThemesByUserId(id: string): Promise<ThemeWithSentimentsCount[]> {
    const user = await usersRepository.findOne({id})
    if (!user) {
        throw new APIError(404, `User not found for id ${id}`)
    }
    const themes = await usersRepository.findAllThemesForUser(user)

    const sentimentsCounts = await themesService.getSentimentsCounts(themes.map(t => t.id))

    return themes.map(theme => ({
        ...theme.toJSON(),
        ...(sentimentsCounts.find(({id}) => id === theme.id) || DEFAULT_SENTIMENTS_COUNTS)
    }))
}

export async function getThemesToSubscribe(id: string) {
    const user = await usersRepository.findOne({id})
    if (!user) {
        throw new APIError(404, `User not found for id ${id}`)
    }

    const userThemes = await usersRepository.findAllThemesForUser(user);

    const userThemesIds = userThemes.map(theme => theme.id);
    const themes = await themesService.getThemes({})

    return themes.filter(theme => !userThemesIds.includes(theme.id))
}

export async function addTheme(userId: string, {themeId}: { themeId: string }) {
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

export async function removeThemeForUser(userId: string, themeId: string) {
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

export async function login(user: UserDTO): Promise<User> {
    const userFound = await usersRepository.findOne({name: user.name, password: user.password});
    if (!userFound) {
        throw new APIError(400, 'Usuario no encontrado o contraseña incorrecta');
    }
    return userFound
}
