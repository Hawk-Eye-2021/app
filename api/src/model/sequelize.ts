import {Sequelize} from "sequelize";
import {initUser} from "./User";
import {initTheme} from "./Theme";

export const sequelize: Sequelize = new Sequelize("postgres://hawkeye:hawkeye@localhost:2345/hawkeye")

const syncSchema = async () => {

    await sequelize.sync({alter: true})
}


initTheme(sequelize)
initUser(sequelize)
syncSchema()