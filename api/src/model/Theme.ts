import {
    DataTypes,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    Model,
    Sequelize
} from "sequelize";
import {UserModel} from "./User";

export interface Theme {
    id: string
    name: string
    deleted?: boolean
}

export interface CreationTheme {
    name: string
}

export class ThemeModel extends Model<Theme, CreationTheme> implements Theme {
    public id!: string;
    public name!: string;
    public deleted!: boolean;
    public getUsersModel!: HasManyGetAssociationsMixin<UserModel>;
    public addUserModel!: HasManyCreateAssociationMixin<UserModel>;
}


export const initTheme = (sequelize: Sequelize) => ThemeModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
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
        tableName: 'themes',
        sequelize: sequelize
    },
)