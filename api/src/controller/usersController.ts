import {Express, Request, Response} from "express";
import usersService = require("../service/usersService")
import {toUserDTO} from "../mapper/UserMapper";
import {handled} from "../errorHandler/errorHandler";

const usersController = (app: Express) => {
    app.get('/users/:id', handled(async (req: Request, res: Response) => {
        await usersService.getUserById(req.params.id)
            .then(toUserDTO)
            .then(dto => res.send(dto))
    }));

    app.get('/users', handled(async (req: Request, res: Response) => {
        await usersService.getUsers()
            .then(users => users.map(toUserDTO))
            .then(dto => res.send(dto))
    }));

    app.post('/users', handled(async (req: Request, res: Response) => {
        await usersService.createUser(req.body)
            .then(toUserDTO)
            .then(dto => res.send(dto))
    }))
}

export default usersController
