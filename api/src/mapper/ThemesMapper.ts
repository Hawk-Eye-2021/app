import {User} from "../model/User";
import {UserDTO} from "../dto/UserDTO";
import {ThemeDTO} from "../dto/ThemeDTO";
import {Theme} from "../model/Theme";


export const toThemeDTO = (theme: Theme): ThemeDTO => {
    return {
        name: theme.name,
        id: theme.id
    }
};