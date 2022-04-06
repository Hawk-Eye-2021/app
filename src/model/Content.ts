import {DataTypes, Model, Sequelize} from "sequelize";
import {SourceModel} from "./Source";
import {ContentThemes} from "./ContentThemes";

export interface Content {
    id: string
    title: string
    url: string
    sourceId: string
    deleted?: boolean
    themes?: ContentThemes[]
    createdAt?: string,
    refreshed: boolean
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
    public refreshed!: boolean
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
                type: new DataTypes.STRING(1024),
                allowNull: false,
            },
            url: {
                type: new DataTypes.STRING(1024),
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
            },
            refreshed: {
                type: DataTypes.BOOLEAN,
                field: 'refreshed',
                defaultValue: true
            }
        },
        {
            tableName: 'contents',
            sequelize: sequelize
        },
    )


}