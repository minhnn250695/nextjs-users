import { cors } from "../../lib/cor-middle-ware";
import Constant from "../constant";
export default async function handler(req, res) {
    await cors(req, res)
    const { method, query } = req;

    console.warn('^^^^^^^Method', method);
    console.warn('^^^^^^^Body', query);
    switch (method) {
        case 'GET':
            console.log('Enter api');
            const result = await fetch(Constant.baseURL + Constant.getUserByEmail.replace('{email}', query.email));
            const users = result.data;
            let authenticated = false;
            if(users){
                authenticated = result.data[0].password === query.password;
            }
            res.status(200).json(authenticated);
            break;

        default:
            break;
    }
}