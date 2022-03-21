import {User} from "../model/User";
import {UserDTO} from "../dto/UserDTO";


export function toUserDTO(user: User): UserDTO {
    return {
        name: user.name,
        id: user.id,
        email: user.email,
        password: user.password
    }
}