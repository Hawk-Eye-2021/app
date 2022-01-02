import {Express} from "express";
import {handled} from "../errorHandler/errorHandler";
import * as sourcesService from "../service/sourcesService"
import {toSourceDTO} from "../mapper/SourcesMapper";

const usersController = (app: Express) => {
    app.get('/sources/:id', handled(async (req, res) => {
        await sourcesService.getSourceById(req.params.id)
            .then(toSourceDTO)
            .then(dto => res.send(dto))
    }));

    app.get('/sources', handled(async (req, res) => {
        await sourcesService.getSources()
            .then(sources => sources.map(toSourceDTO))
            .then(dto => res.send(dto))
    }));

    app.post('/sources', handled(async (req, res) => {
        await sourcesService.createSource(req.body)
            .then(toSourceDTO)
            .then(dto => res.send(dto))
    }))

    app.delete('/sources/:id', handled(async (req, res) => {
        await sourcesService.deleteSource(req.params.id)
            .then(toSourceDTO)
            .then(dto => res.send(dto))
    }))

}

export default usersController
