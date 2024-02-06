import { Cards } from "../../models/index.js";
import { httpError } from "../../utils/httpError.js";

export const deleteById = async (req, res, next) => {
    const {_id: owner} = req.user;
    const { cardId } = req.params;
    const result = await Cards.findByIdAndDelete({_id: cardId, owner});
    if (!result) {
        throw httpError(404, `Card with id=${cardId} not found`);
    }

    res.json({
        message: "Delete success"
    })
}