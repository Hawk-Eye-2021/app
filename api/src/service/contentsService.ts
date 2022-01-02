import {Content} from "../model/Content";
import * as contentsRepository from "../repository/contentsRepository"
import {APIError} from "../errorHandler/errorHandler";

export async function deleteContent (id: string): Promise<Content> {
    const content = await contentsRepository.findOne({id})
    if (!content) {
        throw new APIError(404, "Content not found")
    }
    await contentsRepository.deleteById(id)
    return content

}


export async function createContent  (content: Content): Promise<Content> {

    const contentWithSameURL = await contentsRepository.findOne({url: content.url})
    if (contentWithSameURL) {
        throw new APIError(400, "Content with same URL already exists")
    }

    return contentsRepository.create(content)
}


export async function getContentById  (id: string): Promise<Content> {
    const content = await contentsRepository.findOne({id})
    if (!content) {
        throw new APIError(404, "Content not found")
    }
    return content
}

export async function getContents(): Promise<Content[]> {
    return contentsRepository.findAll()
}

