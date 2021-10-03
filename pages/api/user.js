import axios from "axios";
import { cors } from "../../lib/cor-middle-ware";
import Constant from "../constant";
export default async function handler(req, res) {
    await cors(req, res)
    const { method, query, body } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            console.log('~~~~~~~~~Enter get user method~~~~~~~~~~~');
            const response = await axios.get(Constant.baseURL + Constant.getAllUsers);
            console.log('~~~~~~~~~response~~~~~~~~~~~', response);

            const users = response.data ? response.data : [];
            console.log('~~~~~~~~~Users~~~~~~~~~~~', users);

            res.status(200).json(users);
            break;

        case 'POST':
            const responsePost = await axios.post(Constant.baseURL + Constant.addUser, body);

            const usersP = responsePost.data ? responsePost.data : [];

            res.status(200).json(usersP);
            break;

        case 'PUT':
            const responsePut = await axios.put(Constant.baseURL + Constant.updateUser.replace('{id}', id), body);
            const userPut = responsePut.data ? respresponsePutnse.data : [];

            res.status(200).json(userPut);
            break;

        case 'DELETE':
            const responseDelete = await axios.delete(Constant.baseURL + Constant.deleteUser.replace('{id}', id));
            const userDelete = responseDelete.data ? responseDelete.data : [];
            res.status(200).json(userDelete);
            break;

        default:
            break;
    }
}