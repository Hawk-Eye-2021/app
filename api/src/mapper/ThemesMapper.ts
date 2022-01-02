import {ThemeDTO} from "../dto/ThemeDTO";
import {Theme} from "../model/Theme";


export function toThemeDTO(theme: Theme): ThemeDTO {
    return {
        name: theme.name,
        id: theme.id
    }
}