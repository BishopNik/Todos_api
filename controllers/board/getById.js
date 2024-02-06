import { Boards } from "../../models/index.js";
import { httpError } from "../../utils/httpError.js";

export const getById = async (req, res, next) => {
    const { boardId } = req.params;
    const { _id: owner } = req.user;
    const result = await Boards.findById({_id: boardId, owner});
    if (!result) {
        throw httpError(404, `Boards with id=${boardId} not found`);
    }
    res.json(result);
}