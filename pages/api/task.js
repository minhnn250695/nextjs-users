import axios from "axios"
import { cors } from "../../lib/cor-middle-ware";
import Constant from "../constant";
export default async function handler(req, res) {
    await cors(req, res);
    const { method, body } = req;

    switch (method) {
        case 'GET':
            // console.log('~~~~~~~~~Enter get task method~~~~~~~~~~~');
            const result = await axios(Constant.baseURL + Constant.getAllTask);
            // console.log('~~~~~~~~~result~~~~~~~~~~~', result);

            const tasks = result.data ? result.data : [];
            // console.log('~~~~~~~~~Users~~~~~~~~~~~', tasks);

            res.status(200).json(tasks);
            break;

            case 'POST':
                const responsePost = await axios.post(Constant.baseURL + Constant.addTask, body);
    
                const taskP = responsePost.data ? responsePost.data : [];
    
                res.status(200).json(taskP);
                break;
    
            case 'PUT':
                console.log('enter put');
                const responsePut = await axios.put(Constant.baseURL + Constant.updateTask.replace('{id}', body.id), body);
                const userPut = responsePut.data ? responsePut.data : [];
    
                res.status(200).json(userPut);
                break;
    
            case 'DELETE':
                const responseDelete = await axios.delete(Constant.baseURL + Constant.deleteTask.replace('{id}', body.id));
                const userDelete = responseDelete.data ? responseDelete.data : [];
                res.status(200).json(userDelete);
                break;
    
        default:
            break;
    }
}