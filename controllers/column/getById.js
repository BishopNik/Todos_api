import { Columns } from "../../models/index.js";
import { httpError } from "../../utils/httpError.js";

export const getById = async (req, res, next) => {
    const { borderId } = req.params;
    const { _id: owner } = req.user;
    const result = await Columns.find({borderId: borderId}, owner);
    if (!result) {
        throw httpError(404, `Columns with id=${borderId} not found`);
    }
    res.json(result);
}