import {User} from "../model/User";
import {UserDTO} from "../dto/UserDTO";
import {ThemeDTO} from "../dto/ThemeDTO";
import {Theme} from "../model/Theme";
import {Content} from "../model/Content";
import {ContentDTO} from "../dto/ContentDTO";


export const toContentDTO = (content: Content): ContentDTO => {
    return {
        id: content.id,
        title: content.title,
        url: content.url
    }
};