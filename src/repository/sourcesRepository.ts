import {CreationSource, SourceModel} from "../model/Source";

export function deleteSource(id: string) {
    return SourceModel.update(
        {
            deleted: true
        },
        {
            where: {
                id
            }
        }
    )
}


export async function findAll() {
    return SourceModel.findAll({
        where: {
            deleted: false
        }
    })
}


export async function create(source: CreationSource) {
    return SourceModel.create(source);
}


export async function findBy({id, name}: { id?: string, name?: string }) {
    return SourceModel.findOne({
        where: {
            deleted: false,
            ...(id && {id}),
            ...(name && {name}),

        }
    })
}
