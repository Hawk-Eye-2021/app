import {Express} from "express";
import {handled} from "../errorHandler/errorHandler";
import * as contentsService from "../service/contentsService"
import {toContentDTO} from "../mapper/ContentsMapper";

const usersController = (app: Express) => {
    app.get('/contents/:id', handled(async (req, res) => {
        await contentsService.getContentById(req.params.id)
            .then(toContentDTO)
            .then(dto => res.send(dto))
    }));

    app.get('/contents', handled(async (req, res) => {
        await contentsService.getContents()
            .then(users => users.map(toContentDTO))
            .then(dto => res.send(dto))
    }));

    app.post('/contents', handled(async (req, res) => {
        await contentsService.createContent(req.body)
            .then(toContentDTO)
            .then(dto => res.send(dto))
    }))

    app.delete('/contents/:id', handled(async (req, res) => {
        await contentsService.deleteContent(req.params.id)
            .then(toContentDTO)
            .then(dto => res.send(dto))
    }))

}

export default usersController
