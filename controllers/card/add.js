import { Cards } from "../../models/index.js";

export const add = async (req, res, next) => {
    const { _id: owner } = req.user;

    const result = await Cards.create({...req.body, owner});

    res.status(201).json(result)
}