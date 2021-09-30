import axios from "axios"
import { cors } from "../../lib/cor-middle-ware";
import Constant from "../constant";
export default async function handler(req, res) {
    await cors(req, res);
    const { method, query } = req;
    switch (method) {
        case 'GET':
            // console.log('~~~~~~~~~Enter get task method~~~~~~~~~~~');
            const result = await axios(Constant.baseURL + Constant.getAllTask);
            // console.log('~~~~~~~~~result~~~~~~~~~~~', result);

            const tasks = result.data ? result.data : [];
            // console.log('~~~~~~~~~Users~~~~~~~~~~~', tasks);

            res.status(200).json(tasks);
            break;

        default:
            break;
    }
}