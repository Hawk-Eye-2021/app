import {CreationSource} from "../model/Source";
import * as sourcesRepository from "../repository/sourcesRepository"
import {APIError} from "../errorHandler/errorHandler";


export async function createSource(source: CreationSource) {
    const sourceWithSameName = await sourcesRepository.findBy({name: source.name})
    if (sourceWithSameName) {
        throw new APIError(400, "Source with same name already exists")
    }
    return sourcesRepository.create(source)
}

export async function getSources() {
    return sourcesRepository.findAll()
}

export async function getSourceById(id: string) {
    const source = await sourcesRepository.findBy({id})
    if (!source) {
        throw new APIError(404, "Source not found")
    }
    return source
}

export async function deleteSource(id: string) {
    const source = await sourcesRepository.findBy({id})
    if (!source) {
        throw new APIError(404, "Source not found")
    }
    await sourcesRepository.deleteSource(id)
    return source
}
