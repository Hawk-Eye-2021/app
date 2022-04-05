import {
    DataTypes,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    Model,
    Sequelize
} from "sequelize";
import {User, UserModel} from "./User";

export interface Theme {
    id: string
    name: string
    deleted?: boolean
}

export interface CreationTheme {
    name: string
}

export interface SentimentsCounts{

    id: string,
    positive: number,
    neutral: number,
    negative: number

}

export interface ThemeWithSentimentsCount extends Theme, SentimentsCounts {}

export class ThemeModel extends Model<Theme, CreationTheme> implements Theme {
    public id!: string
    public name!: string
    public deleted!: boolean
    public getUsers!: HasManyGetAssociationsMixin<UserModel>
    public addUser!: HasManyCreateAssociationMixin<UserModel>
    public removeUsers!: HasManyRemoveAssociationMixin<User, string>
}


export async function initTheme(sequelize: Sequelize) {
    ThemeModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: new DataTypes.STRING(1024),
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
        })
}