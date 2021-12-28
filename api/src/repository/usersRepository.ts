import {UserModel} from "../model/User";
import exp from "constants";

export const findUserById = async (id: string) => {
    return UserModel.findOne(
        {
            where: {
                id,
                deleted: false
            }
        }
    )
}

export const findAll = () => {
    return UserModel.findAll({
        where: {
            deleted: false
        }
    })
}