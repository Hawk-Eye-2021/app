import {Content} from "../model/Content";
import {ContentDetails, ContentDTO, ThemeContent} from "../dto/ContentDTO";
import {ContentThemes} from "../model/ContentThemes";


export function toContentDTO(content: Content): ContentDTO {
    return {
        id: content.id,
        title: content.title,
        url: content.url,
        sourceId: content.sourceId
    }
}

export function toContentDetailDTO(content: Content): ContentDetails {
    if (!content.themes){
        throw new Error('themes must be present')
    }
    return {
        id: content.id,
        url: content.url,
        title: content.title,
        sourceId: content.sourceId,
        sentiments: content.themes.map(theme => ({
            themeId: theme.themeId,
            sentiment: theme.sentiment
        })),

    }
}

export function toThemeContentDTO(contentThemes: ContentThemes): ThemeContent {

    if(!contentThemes.content){
        throw new Error('content must be present')
    }
    return {
        id: contentThemes.content.id,
        sentiment: contentThemes.sentiment,
        sourceId: contentThemes.content.sourceId,
        title: contentThemes.content.title,
        url: contentThemes.content.url
    }
}
