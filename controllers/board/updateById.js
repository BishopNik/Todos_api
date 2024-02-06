import { Boards } from "../../models/index.js";
import { httpError } from "../../utils/httpError.js";

export const updateById = async (req, res, next) => { 
    const {_id: owner} = req.user;
    const { boardId } = req.params;
    const result = await Boards.findByIdAndUpdate({_id: boardId, owner}, req.body, {new: true});
    if (!result) {
         throw httpError(404, `Border with id=${boardId} not found`);
    }

    res.json(result);
}