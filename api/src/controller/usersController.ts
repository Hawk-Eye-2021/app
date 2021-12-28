import {Express, Request, Response} from "express";
import {getUserById} from "../service/usersService";
import {toUserDTO} from "../mapper/UserMapper";
import {handled} from "../errorHandler/errorHandler";


const usersController = (app: Express) => {
    app.get('/users/:id', handled(async (req: Request, res: Response) => {
        await getUserById(req.params.id)
            .then(toUserDTO)
            .then(dto => res.send(dto))
    }));
}

export default usersController
