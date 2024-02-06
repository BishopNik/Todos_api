import { Cards } from "../../models/index.js";
import { httpError } from "../../utils/httpError.js";

export const updateById = async (req, res, next) => { 
    const {_id: owner} = req.user;
    const { cardId } = req.params;
    const result = await Cards.findByIdAndUpdate({_id :cardId, owner}, req.body, {new: true});
    if (!result) {
         throw httpError(404, `Card with id=${cardId} not found`);
    }

    res.json(result);
}