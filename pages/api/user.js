import { cors } from "../../lib/cor-middle-ware";
import Constant from "../constant";
export default async function handler(req, res) {
    await cors(req, res)
    const { method, query } = req;

    switch (method) {
        case 'GET':
            const result = await fetch(Constant.baseURL + Constant.getAllUsers);
            const users = result.data ? result.data : [];
            res.status(200).json(users);
            break;

        default:
            break;
    }
}