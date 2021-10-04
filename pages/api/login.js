import axios from "axios";
import { cors } from "../../lib/cor-middle-ware";
import Constant from "../constant";
export default async function handler(req, res) {
    await cors(req, res)
    const { method, query, body } = req;
    console.warn('^^^^^^^Method', method);
    console.warn('^^^^^^^Body', body);

    switch (method) {
        case 'POST':
            const loginResponse = await axios(Constant.baseURL + Constant.getUserByEmail.replace('{email}', body.email));
            const userInfo = loginResponse.data;
            let authenticatedPost = false;
            if (userInfo) {
                authenticatedPost = userInfo[0].password === body.password;
            }
            res.status(200).json(authenticatedPost);
            break;

        default:
            break;
    }
}