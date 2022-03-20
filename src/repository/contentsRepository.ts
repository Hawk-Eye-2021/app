import {Content, ContentModel} from "../model/Content";
import {ContentThemesModel} from "../model/ContentThemes";
import {ThemeModel} from "../model/Theme";

export async function findAll(filters: { url?: string }) {
    return ContentModel.findAll({
        where: {
            deleted: false,
            ...(filters.url && {url: filters.url})
        }
    })
}


export async function create(content: Content) {
    return ContentModel.create(content);
}


export async function deleteContent(content: Content) {
    const contentModel = content as ContentModel
    await contentModel.update({deleted: true})
}


export async function findOne({id, url}: { id?: string, url?: string }): Promise<Content | null> {

    return ContentModel.findOne({
        where: {
            deleted: false,
            ...(id && {id}),
            ...(url && {url})
        },
        include: {
            model: ContentThemesModel,
            as: 'themes',
            include: [{
                model: ThemeModel,
                as: 'theme'
            }]
        }
    })
}
