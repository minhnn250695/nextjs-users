const API_Url = {
    getUserIdList:"/userIds",
    getAllTask: "/tasks",
    getTaskById: "/tasks/{id}",
    addTask: "/tasks",
    updateTask: "/tasks/{id}",
    deleteTask: "/tasks/{id}",

    getTaskIdList:"/taskIds",
    getAllUsers: "/users",
    getUserById: "/users/{id}",
    getUserByEmail: "/users?email={email}",
    addUser: "/users",
    updateUser: "/users/{id}",
    deleteUser: "/users/{id}",
};


const Constant = {
    ...API_Url,
    baseURL:'http://localhost:5000',
    basApiRouteUrl:'http://localhost:3000',
    token: 'authentication_token',
    expire_time: 'expire_time',
}


export default Constant;