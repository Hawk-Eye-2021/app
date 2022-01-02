import {Sequelize} from "sequelize";
import {initUser, UserModel} from "./User";
import {initTheme, ThemeModel} from "./Theme";
import {ContentModel, initContent} from "./Content";
import {initSource, SourceModel} from "./Source";

export const sequelize: Sequelize = new Sequelize("postgres://hawkeye:hawkeye@localhost:2345/hawkeye")

async function syncSchema() {

    await sequelize.sync({alter: true})
}

function applyRelations() {
    // users <> themes
    UserModel.belongsToMany(ThemeModel, {through: "user_themes", foreignKey: "user_id", as: "themes"});
    ThemeModel.belongsToMany(UserModel, {through: "user_themes", foreignKey: "theme_id", as: "users"});

    // contents <> themes
    ContentModel.belongsToMany(ThemeModel, {through: "content_themes", foreignKey: "content_id", as: "themes"});
    ThemeModel.belongsToMany(ContentModel, {through: "content_themes", foreignKey: "theme_id", as: "contents"})

    // contents <> sources

    SourceModel.hasMany(ContentModel, {foreignKey: "source_id"})
    ContentModel.belongsTo(SourceModel, {foreignKey: "source_id"})
}


initTheme(sequelize)
initUser(sequelize)
initSource(sequelize)
initContent(sequelize)


applyRelations()
syncSchema()