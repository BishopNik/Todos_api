import { Boards } from "../../models/index.js";
import { httpError } from "../../utils/index.js";

export const deleteById = async (req, res, next) => {
    const {_id: owner} = req.user;
    const { boardId } = req.params;
    const result = await Boards.findByIdAndDelete({_id: boardId, owner});
    if (!result) {
        throw httpError(404, `Boarder with id=${boardId} not found`);
    }

    res.json({
        message: "Delete success"
    })
}