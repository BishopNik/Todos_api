import { Boards } from "../../models/index.js";
import { httpError } from "../../utils/httpError.js";


export const getBorderById = async (req, res, next) => {
    const { borderId } = req.params;
    const { _id: owner } = req.user;
    const result = await Boards.findById(borderId, owner);
    if (!result) {
        throw httpError(404, `Boards with id=${contactId} not found`);
    }
    res.json(result);
}