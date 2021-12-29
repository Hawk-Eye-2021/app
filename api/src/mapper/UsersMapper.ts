import {User} from "../model/User";
import {UserDTO} from "../dto/UserDTO";


export const toUserDTO = (user: User): UserDTO => {
    return {
        name: user.name,
        id: user.id
    }
};