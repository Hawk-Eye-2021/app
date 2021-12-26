import {Express} from "express";
import {getUserById} from "../service/usersService";
import {Error} from "../dto/Error"
import {toUserDTO} from "../mapper/UserMapper";

const usersController = (app: Express) => {
    app.use('/users/:id', (req, res) => {
        const user = getUserById(req.params.id)
        return res.send(toUserDTO(user))

    });
}

export default usersController
