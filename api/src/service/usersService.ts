import {APIError} from "../errorHandler/errorHandler";
import {User} from "../model/User";

const usersRepository = require('../repository/usersRepository');

export const getUserById = async (id: string): Promise<User> => {
    console.log('getting user with id: ' + id)
    const user = await usersRepository.findUserById(id)
    if (!user) {
        throw new APIError(404, `user not found for id ${id}`)
    }
    return user
}

export const getUsers = async (): Promise<User[]> => {
    return await usersRepository.findAll()
}