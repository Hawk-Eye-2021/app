import {Content, ContentModel} from "../model/Content";

export async function findAll() {
    return ContentModel.findAll({
        where: {
            deleted: false
        }
    })
}


export async function create(content: Content) {
    return ContentModel.create(content);
}


export async function deleteContent(content: Content) {
    const contentModel = content as ContentModel
    await contentModel.update({deleted: true})

    const themes = await contentModel.getThemes()
    await Promise.all(themes.map(theme => contentModel.removeThemes(theme)))
}


export async function findOne({id, url}: { id?: string, url?: string }): Promise<Content | null> {

    return ContentModel.findOne({
        where: {
            deleted: false,
            ...(id && {id}),
            ...(url && {url})
        }
    })
}
