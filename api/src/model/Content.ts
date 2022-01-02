import {DataTypes, Model, Sequelize} from "sequelize";
import {SourceModel} from "./Source";

export interface Content {
    id: string
    title: string
    url: string
    sourceId: string
    deleted?: boolean
}

export interface CreationContent {
    title: string
    url: string
    sourceId: string
}

export class ContentModel extends Model<Content, CreationContent> implements Content {
    public id!: string;
    public title!: string;
    public url!: string;
    public deleted!: boolean;
    public sourceId!: string
}


export async function initContent(sequelize: Sequelize) {
    ContentModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
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
            },
            sourceId: {
                type: DataTypes.INTEGER,
                field: 'source_id',
                references: {
                    model: SourceModel
                }
            }
        },
        {
            tableName: 'contents',
            sequelize: sequelize
        },
    )


}