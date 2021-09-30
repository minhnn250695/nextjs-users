import axios from "axios";
import { cors } from "../../lib/cor-middle-ware";
import Constant from "../constant";
export default async function handler(req, res) {
    await cors(req, res)
    const { method, query } = req;
    console.log('~~~~~~~~~Query~~~~~~~~~~~', query);
    switch (method) {
        case 'GET':
            // console.log('~~~~~~~~~Enter get user method~~~~~~~~~~~');
            const result = await axios(Constant.baseURL + Constant.getUserById.replace('{id}', query.id));
            // console.log('~~~~~~~~~result~~~~~~~~~~~', result);

            const user = result.data ? result.data : [];
            // console.log('~~~~~~~~~Users~~~~~~~~~~~', users);

            res.status(200).json(user);
            break;

        default:
            break;
    }
}