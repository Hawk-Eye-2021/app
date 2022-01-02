import {
    DataTypes,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin,
    HasManyRemoveAssociationMixin,
    Model,
    Sequelize
} from "sequelize";
import {User, UserModel} from "./User";
import {ContentModel} from "./Content";

export interface Theme {
    id: string
    name: string
    deleted?: boolean
}

export interface CreationTheme {
    name: string
}

export class ThemeModel extends Model<Theme, CreationTheme> implements Theme {
    public id!: string
    public name!: string
    public deleted!: boolean
    public getUsers!: HasManyGetAssociationsMixin<UserModel>
    public addUser!: HasManyCreateAssociationMixin<UserModel>
    public removeUsers!: HasManyRemoveAssociationMixin<User, string>
    public getContents!: HasManyGetAssociationsMixin<ContentModel>
    public hasContents!: HasManyHasAssociationMixin<ContentModel, string>
    public addContents!: HasManyCreateAssociationMixin<ContentModel>
    public removeContents!: HasManyRemoveAssociationMixin<ContentModel, string>
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
        })
}