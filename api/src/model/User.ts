import {
    BelongsToManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyRemoveAssociationMixin,
    DataTypes,
    Model,
    Sequelize
} from "sequelize";
import {ThemeModel} from "./Theme";

export interface User {
    id: string
    name: string
    deleted: boolean
}

export interface CreationUser {
    name: string
}

export class UserModel extends Model<User, CreationUser> implements User {
    public id!: string;
    public name!: string;
    public deleted!: boolean;
    public getThemeModels!: BelongsToManyGetAssociationsMixin<ThemeModel>
    public hasThemeModels!: BelongsToManyHasAssociationMixin<ThemeModel, string>
    public addThemeModels!: BelongsToManyAddAssociationMixin<ThemeModel, string>
    public removeThemeModels!: BelongsToManyRemoveAssociationMixin<ThemeModel, string>
}

export async function initUser(sequelize: Sequelize) {
    UserModel.init(
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
            tableName: 'users',
            sequelize: sequelize
        },
    )

}