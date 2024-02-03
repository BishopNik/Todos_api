/** @format */
import { Boards } from "../../models/index.js";

export const getBorderAll = async (req, res, next) => {
    const { _id: owner } = req.user;

    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;

    const result = await Boards.find({ owner }, { skip, limit }).populate("owner", "username");
    res.json(result);
}