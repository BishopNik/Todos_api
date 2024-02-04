import { Boards } from "../../models/index.js";
import { httpError } from "../../utils/httpError.js";

export const deleteById = async (req, res, next) => {
    const {_id: owner} = req.user;
    const { borderId } = req.params;
    const result = await Boards.findByIdAndDelete({borderId, owner});
    if (!result) {
        throw httpError(404, `Boarder with id=${borderId} not found`);
    }

    res.json({
        message: "Delete success"
    })
}