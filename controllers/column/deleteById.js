import { Columns } from "../../models/index.js";
import { httpError } from "../../utils/httpError.js";

export const deleteById = async (req, res, next) => {
    const {_id: owner} = req.user;
    const { columnId } = req.params;
    const result = await Columns.findByIdAndDelete({columnId, owner});
    if (!result) {
        throw httpError(404, `Column with id=${columnId} not found`);
    }

    res.json({
        message: "Delete success"
    })
}