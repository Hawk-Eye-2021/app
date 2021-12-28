import {findUserById} from "../usersRepository";
import {APIError} from "../errorHandler/errorHandler";
import {User} from "../model/User";

export const getUserById = async (id: string): Promise<User> => {
    console.log('getting user with id: ' + id)
    const user = await findUserById(id)
    if (!user) {
        throw new APIError(404, `user not found for id ${id}`)
    }
    return user
}