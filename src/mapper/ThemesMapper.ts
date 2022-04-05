import { ThemeDTO, ThemeWithSentimentsCountsDTO} from "../dto/ThemeDTO";
import {Theme, ThemeWithSentimentsCount} from "../model/Theme";


export function toThemeDTO(theme: Theme): ThemeDTO {
    return {
        name: theme.name,
        id: theme.id
    }
}

export function toThemeWithSentimentsCountsDTO(theme: ThemeWithSentimentsCount): ThemeWithSentimentsCountsDTO{

    return {
        id: theme.id,
        name: theme.id,
        positive: theme.positive,
        negative: theme.negative,
        neutral: theme.neutral
    }

}