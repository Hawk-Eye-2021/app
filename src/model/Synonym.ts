import {
    DataTypes,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    Model,
    Sequelize
} from "sequelize";
import {User, UserModel} from "./User";
import {SourceModel} from "./Source";
import {ThemeModel} from "./Theme";

export interface Synonym {
    id: string
    theme1Id?: string
    theme2Id?: string
}

export interface CreationSynonym {
    name: string
    theme1Id: string
    theme2Id: boolean
}

export class SynonymModel extends Model<Synonym, CreationSynonym> implements Synonym {
    public id!: string
    public theme1Id!: string
    public theme2Id!: string
}


export async function initSynonym(sequelize: Sequelize) {
    SynonymModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            theme1Id: {
                type: DataTypes.INTEGER,
                field: 'theme_1_id',
                references: {
                    model: ThemeModel
                }
            },
            theme2Id: {
                type: DataTypes.INTEGER,
                field: 'theme_2_id',
                references: {
                    model: ThemeModel
                }
            }
        },
        {
            tableName: 'synonyms',
            sequelize: sequelize
        })
}