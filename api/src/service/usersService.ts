import {APIError} from "../errorHandler/errorHandler";
import {User} from "../model/User";
import {UserDTO} from "../dto/UserDTO";

export async function deleteUser(id: string) {
    const user = usersRepository.findOne({id})
    if (!user) {
        throw new APIError(404, 'User not found')
    } else {
        await usersRepository.logicDelete(id)
        return user
    }
}


const usersRepository = require('../repository/usersRepository');


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