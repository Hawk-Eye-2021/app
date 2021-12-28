import {UserModel} from "../model/User";
import {UserDTO} from "../dto/UserDTO";

export const findOne = async ({id, name}: { id?: string, name?: string }) => {
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

export const findAll = () => {
    return UserModel.findAll({
        where: {
            deleted: false
        }
    })
}

export const logicDelete = (id: string) => {
    return UserModel.update(
        {
            deleted: true
        },
        {
            where: {
                id
            }
        }
    )
}

export const create = async (user: UserDTO) => {
    return UserModel.create(user)
}