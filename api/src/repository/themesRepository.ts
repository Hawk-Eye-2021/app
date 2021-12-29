import {UserModel} from "../model/User";
import {Theme, ThemeModel} from "../model/Theme";
import {APIError} from "../errorHandler/errorHandler";


const themesRepository = {
    findOne: async ({id, name}: { id?: string, name?: string }): Promise<Theme | null> => {
        return ThemeModel.findOne(
            {
                where: {
                    ...(id && {id}),
                    ...(name && {name}),
                    deleted: false
                }
            }
        )
    },
    findAll: async (): Promise<Theme[]> => {
        return ThemeModel.findAll({
            where: {
                deleted: false
            }
        })
    },

    logicDelete: async (id: string): Promise<void> => {
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
    },

    create: async (theme: Theme): Promise<Theme> => {
        return ThemeModel.create(theme)
    },

    findAllForUserId: async (id: string): Promise<Theme[]> => {
        const user = await UserModel.findOne({
            where: {
                id
            }
        })

        if (!user){
            throw new APIError(404, 'User not found')
        }

        return user.getThemes()

    }
}


export default themesRepository