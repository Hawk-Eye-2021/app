import {UserDTO} from "../dto/UserDTO";
import {Source} from "../model/Source";


export function toSourceDTO(source: Source): UserDTO {
    return {
        name: source.name,
        id: source.id
    }
}