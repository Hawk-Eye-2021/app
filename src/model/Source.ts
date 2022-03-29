import {DataTypes, Model, Sequelize} from "sequelize";

export interface Source {
    id: string
    name: string
    icon: string
    deleted?: boolean
}

export interface CreationSource {
    name: string
    icon: string
}

export class SourceModel extends Model<Source, CreationSource> implements Source {
    public id!: string;
    public name!: string;
    public deleted!: boolean;
    public icon!: string
}


export async function initSource(sequelize: Sequelize) {
    SourceModel.init(
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
            icon: {
                type: new DataTypes.STRING(1024),
                allowNull: true,
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            }
        },
        {
            tableName: 'sources',
            sequelize: sequelize
        },
    )


}