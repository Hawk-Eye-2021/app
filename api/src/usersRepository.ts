import {UserModel} from "./model/User";

export const findUserById = async (id: string) => {
    return UserModel.findOne(
        {
            where: {
                id,
                deleted: false
            }
        }
    )
}