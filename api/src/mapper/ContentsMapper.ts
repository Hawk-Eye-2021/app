import {Content} from "../model/Content";
import {ContentDTO} from "../dto/ContentDTO";


export function toContentDTO(content: Content): ContentDTO {
    return {
        id: content.id,
        title: content.title,
        url: content.url
    }
}