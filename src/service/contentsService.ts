import {Content} from "../model/Content";
import * as contentsRepository from "../repository/contentsRepository"
import * as contentThemesRepository from "../repository/contentThemesRepository"
import {APIError} from "../errorHandler/errorHandler";
import * as sourcesService from "./sourcesService"
import {ContentThemes} from "../model/ContentThemes";
import {URLSearchParams} from "url";

const fetch = require('node-fetch')

export async function refresh() {
    const contentsToRefresh = await contentsRepository.findAll(
        {
            filters:   {sourceId: '2', refreshed: false},
            sorts:  {createdAt: 'DESC'},
            limit: 10
        }
    )

    await Promise.all(contentsToRefresh.map(async content => {
        try {
            const url = `https://api.twitter.com/1.1/search/tweets.json`
            const headers = {
                'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAACbKTQEAAAAALN7G7nDUpfBOHf%2BTElkU7rf%2Bqyk%3Dcm1yWZ8omgcuodWRMPxPoglJU8cg6XjIJTJ5kawLTyqneZ3r7j'
            }
            const params = new URLSearchParams({q: content.title, count: '1'})

            const tweet = await fetch(`${url}?${params}`, {headers, params})
                .then((res: { json: () => any; }) => {
                    return res.json()
                })
                .then((res: { statuses: any[]; }) => {
                    return res.statuses[0]
                })

            const newUrl = `https://twitter.com/tweeter/status/${tweet.id_str}`
            await contentsRepository.update(content, {url: newUrl, refreshed: true})
        }catch (e){
            await contentsRepository.update(content, { refreshed: null})
        }
    }))
}


export async function deleteContent(id: string): Promise<Content> {
    const content = await contentsRepository.findOne({id})
    if (!content) {
        throw new APIError(404, "Content not found")
    }
    await contentsRepository.deleteContent(content)
    return content

}


export async function createContent(content: Content): Promise<Content> {

    const source = content.sourceId && await sourcesService.getSourceById(content.sourceId)

    if (!source) {
        throw new APIError(404, "Source not found")
    }

    const contentWithSameURL = await contentsRepository.findOne({url: content.url})
    if (contentWithSameURL) {
        throw new APIError(400, "Content with same URL already exists")
    }

    return contentsRepository.create(content)
}


export async function getContentById(id: string): Promise<Content> {
    const content = await contentsRepository.findOne({id})
    if (!content) {
        throw new APIError(404, "Content not found")
    }
    return content
}

export async function getContents(filters: { url?: string }): Promise<Content[]> {
    return contentsRepository.findAll({filters})
}

