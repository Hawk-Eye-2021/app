import {Sequelize} from "sequelize";
import {initUser} from "./User";

const sequelize: Sequelize = new Sequelize("postgres://hawkeye:hawkeye@localhost:2345/hawkeye")

export const syncSchema = () => {

    sequelize.sync({alter: true})
        .then(() => {
            console.log("Database & tables created!");
        })
}

initUser(sequelize)