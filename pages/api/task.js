import axios from "axios"
import { cors } from "../../lib/cor-middle-ware";
import Constant from "../constant";
export default async function handler(req, res) {
    await cors(req, res);
    const { method, query } = req;
    switch (method) {
        case 'GET':
            const result = await axios.get(Constant.baseURL + Constant.getAllTask);
            res.status(200).json(result.data);
            break;

        default:
            break;
    }
}