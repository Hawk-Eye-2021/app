import {ContentThemesModel} from "../model/ContentThemes";
import {ContentModel} from "../model/Content";
import {ThemeModel} from "../model/Theme";

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

