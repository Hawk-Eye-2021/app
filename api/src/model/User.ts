import {DataTypes, Model, Sequelize} from "sequelize";

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
}

export const initUser = (sequelize: Sequelize) => UserModel.init(
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
        tableName: 'users',
        sequelize: sequelize
    },

)