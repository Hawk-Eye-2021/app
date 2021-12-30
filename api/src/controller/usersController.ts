import {Express} from "express";
import {toUserDTO} from "../mapper/UsersMapper";
import {handled} from "../errorHandler/errorHandler";
import {toThemeDTO} from "../mapper/ThemesMapper";
import * as usersService from "../service/usersService";

const usersController = (app: Express) => {
    app.get('/users/:id', handled(async (req, res) => {
        await usersService.getUserById(req.params.id)
            .then(toUserDTO)
            .then(dto => res.send(dto))
    }));

    app.get('/users', handled(async (req, res) => {
        await usersService.getUsers()
            .then(users => users.map(toUserDTO))
            .then(dto => res.send(dto))
    }));

    app.post('/users', handled(async (req, res) => {
        await usersService.createUser(req.body)
            .then(toUserDTO)
            .then(dto => res.send(dto))
    }))

    app.delete('/users/:id', handled(async (req, res) => {
        await usersService.deleteUser(req.params.id)
            .then(toUserDTO)
            .then(dto => res.send(dto))
    }))

    app.post('/users/:userId/themes', handled(async (req, res) => {
        await usersService.addTheme(req.params.userId, req.body)
            .then(themes => themes.map(toThemeDTO))
            .then(dto => res.send(dto))
    }))

    app.get('/users/:id/themes', handled(async (req, res) => {
        await usersService.getThemesByUserId(req.params.id)
            .then(themes => themes.map(toThemeDTO))
            .then(dto => res.send(dto))
    }))

    app.delete('/users/:userId/themes/:themeId', handled(async (req, res) => {
        await usersService.removeThemeForUser(req.params.userId, req.params.themeId)
            .then(themes => themes.map(toThemeDTO))
            .then(dto => res.send(dto))
    }))

}

export default usersController
