import {ContentThemesModel} from "../model/ContentThemes";
import {ContentModel} from "../model/Content";
import {SentimentsCounts, ThemeModel} from "../model/Theme";
import {sequelize} from "../model/sequelize";
import {QueryTypes} from "sequelize";

export async function findForContentAndTheme(contentId: string, themeId: string) {
    return ContentThemesModel.findOne({where: {contentId, themeId}})
}


export async function create(themeId: string, contentId: string, sentiment: string) {
    return ContentThemesModel.create({themeId, contentId, sentiment})
}


export async function findAllForTheme(themeId: string, synonyms: string[] = []): Promise<ContentThemesModel[]> {
    return ContentThemesModel.findAll({
        where: {
            themeId: [themeId, ...synonyms]
        },
        include: {
            model: ContentModel,
            as: 'content'
        }
    })
}

export async function findAllForContent(contentId: string): Promise<ContentThemesModel[]> {
    return ContentThemesModel.findAll({
        where: {
            contentId
        },
        include: [
            {
                model: ThemeModel,
                as: 'theme'
            }, {
                model: ContentModel,
                as: 'content'
            }
        ]
    })
}


export async function findAllSentiments(themesIds: string[]): Promise<SentimentsCounts[]> {
    return sequelize.query(
        `
            select theme_id                                                  as "id",
                   count(content_id) filter ( where sentiment = 'negative' ) as negative,
                   count(content_id) filter ( where sentiment = 'neutral' )  as neutral,
                   count(content_id) filter ( where sentiment = 'positive' ) as positive
            from content_themes
            where theme_id in (:themesIds)
            group by theme_id
        `,
        {
            type: QueryTypes.SELECT,
            replacements: {themesIds}
        }
    )
}


