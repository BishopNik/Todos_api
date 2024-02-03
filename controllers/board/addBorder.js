import { Boards } from "../../models/index.js";

export const addBorder = async (req, res, next) => {
    const { _id: owner } = req.user;

    const result = await Boards.create({...req.body, owner});

    res.status(201).json(result)
}