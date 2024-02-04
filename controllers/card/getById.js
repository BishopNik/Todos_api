import { Cards } from "../../models/index.js";
import { httpError } from "../../utils/httpError.js";

export const getById = async (req, res, next) => {
    const { columnId } = req.params;
    const { _id: owner } = req.user;
    const result = await Cards.find({columnId : columnId}, owner);
    if (!result) {
        throw httpError(404, `Column with id=${columnId} not found`);
    }
    res.json(result);
}