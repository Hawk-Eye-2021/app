import {DataTypes, Model, Sequelize} from "sequelize";
import {SourceModel} from "./Source";
import {Content, ContentModel} from "./Content";
import {ThemeModel} from "./Theme";

export interface ContentThemes {
    id: string
    sentiment: string
    contentId: string
    themeId: string
    content?: Content
}

export interface CreationContentThemes {
    sentiment: string
    contentId: string
    themeId: string
}

export class ContentThemesModel extends Model<ContentThemes, CreationContentThemes> implements ContentThemes {
    public id!: string
    public sentiment!: string
    public contentId!: string
    public themeId!: string
    public content!: ContentModel
}


export async function initContentThemes(sequelize: Sequelize) {
    ContentThemesModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            sentiment: {
                type: new DataTypes.STRING(1024),
                allowNull: false,
            },
            contentId: {
                type: new DataTypes.INTEGER,
                field: 'content_id',
                references: {
                    model: ContentModel
                }
            },
            themeId: {
                type: new DataTypes.INTEGER,
                field: 'theme_id',
                references: {
                    model: ThemeModel
                }
            }
        },
        {
            tableName: 'content_themes',
            sequelize: sequelize
        },
    )
}