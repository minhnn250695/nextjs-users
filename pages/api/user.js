import axios from "axios";
import { cors } from "../../lib/cor-middle-ware";
import Constant from "../constant";
export default async function handler(req, res) {
    await cors(req, res)
    const { method, query } = req;

    switch (method) {
        case 'GET':
            // console.log('~~~~~~~~~Enter get user method~~~~~~~~~~~');
            const result = await axios(Constant.baseURL + Constant.getAllUsers);
            // console.log('~~~~~~~~~result~~~~~~~~~~~', result);

            const users = result.data ? result.data : [];
            // console.log('~~~~~~~~~Users~~~~~~~~~~~', users);

            res.status(200).json(users);
            break;

        default:
            break;
    }
}