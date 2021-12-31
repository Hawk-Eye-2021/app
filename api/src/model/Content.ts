import {
    DataTypes,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin, HasOneGetAssociationMixin,
    Model,
    Sequelize
} from "sequelize";
import {UserModel} from "./User";
import {Theme, ThemeModel} from "./Theme";

export interface Content {
    id: string
    title: string
    url: string
    deleted?: boolean
}

export interface CreationContent {
    title: string
    url: string
}

export class ContentModel extends Model<Content, CreationContent> implements Content {
    public id!: string;
    public title!: string;
    public url!: string;
    public deleted!: boolean;
}


export const initContent = (sequelize: Sequelize) => {
    ContentModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            url: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            }
        },
        {
            tableName: 'contents',
            sequelize: sequelize
        },
    )
    ContentModel.belongsTo(ThemeModel)
    ThemeModel.hasMany(ContentModel)

}