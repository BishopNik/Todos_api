import { Cards } from "../../models/index.js";

export const getAll = async (req, res, next) => {
    const { _id: owner } = req.user;

    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;

    const result = await Cards.find({ owner }, { skip, limit }).populate("owner", "username");
    res.json(result);
}