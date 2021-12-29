import {User, UserModel} from "../model/User";
import {UserDTO} from "../dto/UserDTO";
import {Theme, ThemeModel} from "../model/Theme";
import {APIError} from "../errorHandler/errorHandler";

const usersRepository = {
    findOne: async ({id, name}: { id?: string, name?: string }): Promise<User | null> => {
        return UserModel.findOne(
            {
                where: {
                    ...(id && {id}),
                    ...(name && {name}),
                    deleted: false
                }
            }
        )
    },

    findAll: async (): Promise<User[]> => {
        return UserModel.findAll({
            where: {
                deleted: false
            }
        })
    },

    logicDelete: async (id: string): Promise<void> => {
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
    },
    create: async (user: UserDTO): Promise<User> => {
        return UserModel.create(user)
    },

    addTheme: async (userId: string, themeId: string): Promise<Theme[]> => {
        const user = await UserModel.findOne({
            where: {
                id: userId,
                deleted: false
            }
        })

        if (!user){
            throw new APIError(404, 'User not found')
        }

        const theme = await ThemeModel.findOne({
            where: {
                id: themeId,
                deleted: false
            }
        })

        if (!theme){
            throw new APIError(404, 'Theme not found')
        }

        await user.addThemeModels(theme)

        return user.getThemeModels()
    },
    findAllThemesForUserId: async (id: string) => {
        const user = await UserModel.findOne({
            where: {
                id,
                deleted: false
            }
        })

        if (!user){
            throw new APIError(404, 'User not found')
        }

        return user.getThemeModels()
    },
    async removeTheme(userId: string, themeId: string) {
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

        if (!user){
            throw new APIError(404, 'User not found')
        }

        if (!theme){
            throw new APIError(404, 'Theme not found')
        }

        await user.removeThemeModels(theme)

        return user.getThemeModels()
    }
}

export default usersRepository
