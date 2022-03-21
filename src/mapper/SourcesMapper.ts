
import {Source} from "../model/Source";
import {SourceDTO} from "../dto/SourceDTO";


export function toSourceDTO(source: Source): SourceDTO {
    return {
        name: source.name,
        id: source.id
    }
}