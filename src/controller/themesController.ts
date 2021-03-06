import {Express} from "express";
import {toThemeDTO} from "../mapper/ThemesMapper";
import {handled} from "../errorHandler/errorHandler";
import * as themesService from "../service/themesService"
import {toContentDTO, toThemeContentDTO} from "../mapper/ContentsMapper";

const themesController = (app: Express) => {
    app.get('/themes/:id', handled(async (req, res) => {
        await themesService.getThemeById(req.params.id)
            .then(toThemeDTO)
            .then(dto => res.send(dto))
    }));

    app.get('/themes', handled(async (req, res) => {
        const name = req.query.name && req.query.name.toString()
        await themesService.getThemes({name})
            .then(themes => themes.map(toThemeDTO))
            .then(dto => res.send(dto))
    }));

    app.post('/themes', handled(async (req, res) => {
        await themesService.createTheme(req.body)
            .then(toThemeDTO)
            .then(dto => res.send(dto))
    }))

    app.delete('/themes/:id', handled(async (req, res) => {
        await themesService.deleteTheme(req.params.id)
            .then(toThemeDTO)
            .then(dto => res.send(dto))
    }))

    app.post('/themes/:themeId/contents', handled(async (req, res) => {
        await themesService.addContentToTheme(req.params.themeId, req.body)
            .then(contents => contents.map(toThemeContentDTO))
            .then(contents => res.send(contents))
    }))

    app.get('/themes/:themeId/contents', handled(async (req, res) => {
        await themesService.getContentsByTheme(req.params.themeId)
            .then(contents => contents.map(toThemeContentDTO))
            .then(contents => res.send(contents))
    }))

}

export default themesController
