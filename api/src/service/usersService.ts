import {APIError} from "../errorHandler/errorHandler";
import {User} from "../model/User";
import {UserDTO} from "../dto/UserDTO";
import usersRepository from "../repository/usersRepository";
import themeService from "./themesService";
import {ThemeDTO} from "../dto/ThemeDTO";
import themesRepository from "../repository/themesRepository";
import themesService from "./themesService";

const userService = {


    createUser: async (user: UserDTO): Promise<User> => {
        if (await usersRepository.findOne({name: user.name})) {
            throw new APIError(400, 'User with this name already exists');
        }
        return await usersRepository.create(user);
    },
    getUserById: async (id: string): Promise<User> => {
        console.log('getting user with id: ' + id)
        const user = await usersRepository.findOne({id})
        if (!user) {
            throw new APIError(404, `user not found for id ${id}`)
        }
        return user
    },
    getUsers: async (): Promise<User[]> => {
        return await usersRepository.findAll()
    },

    deleteUser: async (id: string): Promise<User> => {
        const user = await usersRepository.findOne({id})
        if (!user) {
            throw new APIError(404, `user not found for id ${id}`)
        }
        await usersRepository.logicDelete(id)
        return user
    },
    async getThemesByUserId(id: string) {
        const user = await usersRepository.findOne({id})
        if (!user) {
            throw new APIError(404, `user not found for id ${id}`)
        }
        return usersRepository.findAllThemesForUserId(id)
    },

    addTheme: async (userId: string, {themeId}: { themeId: string }) => {
        const user = await usersRepository.findOne({id: userId})
        if (!user) {
            throw new APIError(404, 'User not found');
        }

        const theme = await themesRepository.findOne({id: themeId})
        if (!theme) {
            throw new APIError(404, 'Theme not found');
        }
        return  usersRepository.addTheme(userId, themeId)
    },
    async removeThemeForUser(userId: string, themeId: string) {
        const user = await usersRepository.findOne({id: userId})
        if (!user) {
            throw new APIError(404, 'User not found');
        }

        const theme = await themesRepository.findOne({id: themeId})
        if (!theme) {
            throw new APIError(404, 'Theme not found');
        }
        return usersRepository.removeTheme(userId, themeId)
    }
}

export default userService
