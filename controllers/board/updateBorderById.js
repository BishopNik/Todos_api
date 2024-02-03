import { Boards } from "../../models/index.js";
import { httpError } from "../../utils/httpError.js";

export const updateBorderById = async (req, res, next) => { 
    const {_id: owner} = req.user;
    const { borderId } = req.params;
    const result = await Boards.findByIdAndUpdate({borderId, owner}, req.body, {new: true});
    if (!result) {
         throw httpError(404, `Border with id=${borderId} not found`);
    }

    res.json(result);
}