import { Columns } from "../../models/index.js";

export const getAll = async (req, res, next) => {
    const { _id: owner } = req.user;

    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;

    const result = await Columns.find({ owner }).populate("owner", "username");
    res.json(result);
}