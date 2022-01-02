import {DataTypes, Model, Sequelize} from "sequelize";

export interface Content {
    id: string
    title: string
    url: string
    deleted?: boolean
}

export interface CreationContent {
    title: string
    url: string
}

export class ContentModel extends Model<Content, CreationContent> implements Content {
    public id!: string;
    public title!: string;
    public url!: string;
    public deleted!: boolean;
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
            }
        },
        {
            tableName: 'contents',
            sequelize: sequelize
        },
    )


}