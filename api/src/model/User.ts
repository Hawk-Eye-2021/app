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
    public getThemes!: BelongsToManyGetAssociationsMixin<ThemeModel>
    public hasThemes!: BelongsToManyHasAssociationMixin<ThemeModel, string>
    public addThemes!: BelongsToManyAddAssociationMixin<ThemeModel, string>
    public removeThemes!: BelongsToManyRemoveAssociationMixin<ThemeModel, string>
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