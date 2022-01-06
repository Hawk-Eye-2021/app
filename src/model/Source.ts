import {DataTypes, Model, Sequelize} from "sequelize";

export interface Source {
    id: string
    name: string
    deleted?: boolean
}

export interface CreationSource {
    name: string
}

export class SourceModel extends Model<Source, CreationSource> implements Source {
    public id!: string;
    public name!: string;
    public deleted!: boolean;
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