import {Sequelize} from "sequelize";
import {initUser, UserModel} from "./User";
import {initTheme, ThemeModel} from "./Theme";
import {ContentModel, initContent} from "./Content";
import {initSource, SourceModel} from "./Source";
import config from "../config/config";
import {ContentThemesModel, initContentThemes} from "./ContentThemes";
import {initSynonym, SynonymModel} from "./Synonym";

export const sequelize: Sequelize = new Sequelize(config.database.url, config.database.options)

async function syncSchema() {

    await sequelize.sync({alter: true})
}

function applyRelations() {
    // users <> themes
    UserModel.belongsToMany(ThemeModel, {through: "user_themes", foreignKey: "user_id", as: "themes"});
    ThemeModel.belongsToMany(UserModel, {through: "user_themes", foreignKey: "theme_id", as: "users"});

    // contents <> sources
    SourceModel.hasMany(ContentModel, {foreignKey: "source_id"})
    ContentModel.belongsTo(SourceModel, {foreignKey: "source_id"})

    // contents <> themes
    ContentThemesModel.belongsTo(ContentModel, {foreignKey: "content_id", as: 'content'})
    ContentModel.hasMany(ContentThemesModel, {foreignKey: "content_id", as: 'themes'})
    ContentThemesModel.belongsTo(ThemeModel, {foreignKey: "theme_id", as: 'theme'})
    ThemeModel.hasMany(ContentThemesModel, {foreignKey: "theme_id", as: 'contents'})

    // synonyms
    ThemeModel.hasMany(SynonymModel, {foreignKey: "theme_1_id", as: "theme1"})
    ThemeModel.hasMany(SynonymModel, {foreignKey: "theme_2_id", as: "theme2"})
}



initTheme(sequelize)
initUser(sequelize)
initSource(sequelize)
initContent(sequelize)
initContentThemes(sequelize)
initSynonym(sequelize)

applyRelations()
syncSchema()
