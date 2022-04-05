import {SentimentsCounts} from "../model/Theme";

export interface ThemeDTO {
    name: string
    id: string
}

export interface ThemeWithSentimentsCountsDTO extends ThemeDTO, SentimentsCounts {}