import {Express} from "express";
import {toThemeDTO} from "../mapper/ThemesMapper";
import {handled} from "../errorHandler/errorHandler";
import * as themesService from "../service/themesService"

const themesController = (app: Express) => {
    app.get('/themes/:id', handled(async (req, res) => {
        await themesService.getThemeById(req.params.id)
            .then(toThemeDTO)
            .then(dto => res.send(dto))
    }));

    app.get('/themes', handled(async (req, res) => {
        await themesService.getThemes()
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
}

export default themesController
