import {Sequelize} from "sequelize";
import {initUser, UserModel} from "./User";
import {initTheme, ThemeModel} from "./Theme";
import {ContentModel, initContent} from "./Content";

export const sequelize: Sequelize = new Sequelize("postgres://hawkeye:hawkeye@localhost:2345/hawkeye")

const syncSchema = async () => {

    await sequelize.sync({alter: true})
}

function applyRelations() {
    UserModel.belongsToMany(ThemeModel, {through: "user_themes", foreignKey: "user_id", });
    ThemeModel.belongsToMany(UserModel, {through: "user_themes", foreignKey: "theme_id"});
    ContentModel.belongsToMany(ThemeModel, {through: "content_themes", foreignKey: "content_id"});
    ThemeModel.belongsToMany(ContentModel, {through: "content_themes", foreignKey: "theme_id"})
}


initTheme(sequelize)
initUser(sequelize)
initContent(sequelize)


applyRelations()
syncSchema()