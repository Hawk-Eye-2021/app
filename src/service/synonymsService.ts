import {SynonymModel} from "../model/Synonym";
import {Op} from "sequelize";

export async function getSynonymsForTheme(themeId: string): Promise<SynonymModel[]> {

    return SynonymModel.findAll({
        where: {
            [Op.or]: [
                {theme1Id: themeId},
                {theme2Id: themeId},
            ]
        }
    })

}