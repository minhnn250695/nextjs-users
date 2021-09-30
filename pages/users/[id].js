
// import React, { useRef, useState, useEffect } from "react";

import axios from "axios";
import Constant from "../constant";

// export default function UserDetail(props) {
//     const nameRef = useRef(null);
//     const addressRef = useRef(null);
//     const emailRef = useRef(null);
//     const passRef = useRef(null);
//     const phoneRef = useRef(null);

//     const [selectValue, setSelectValue] = useState(null);
//     const [isCreate, setIsCreate] = useState(false);
//     const [user, setUser] = useState(null);
//     const [tasksOfUser, setTasksOfUser] = useState([]);

//     const match = useRouteMatch();
//     const users = useSelector((state) => state.user.data);

//     const dispatch = useDispatch();
//     // const history = useHistory();

//     useEffect(() => {
//         const user = users?.find(x => x.id === match.params.id);
//         setUser(user);
//         const tasksOfUser = user ? user.tasks : [];
//         setTasksOfUser(tasksOfUser);
//         const { id } = match.params;
//         if (id === 'new') {
//             setIsCreate(true);
//         } else if (id !== 'new') {
//             setIsCreate(false);
//         }
//     }, [])

//     const onSubmitForm = (e) => {
//         e.preventDefault();
//         let newtask = (user && user.tasks) ? [...user.tasks] : [];
//         if (selectValue !== '') {
//             newtask.push(selectValue);
//         }
//         const data = {
//             id: isCreate ? uuidv4() : match.params.id,
//             userName: nameRef.current.value,
//             password: passRef.current.value,
//             email: emailRef.current.value,
//             address: addressRef.current.value,
//             phone: phoneRef.current.value,
//             tasks: newtask
//         };
//         if (isCreate) {
//             dispatch(addUser(data));
//         } else {
//             dispatch(updateUser(data));
//         }
//         // history.push('/users');
//     }


//     return (
//         <>
//             <form className="container" onSubmit={() => onSubmitForm}>
//                 <h3 className="title">{isCreate ? "Create New User" : "Update User Info"}</h3>
//                 <div className="form-group">
//                     <label style={{ textAlign: 'left', width: '100%' }}>User Name</label>
//                     <input type="text" className="form-control" defaultValue={user?.userName} ref={nameRef} placeholder="User name" />
//                 </div>

//                 <div className="form-group">
//                     <label style={{ textAlign: 'left', width: '100%' }}>Address</label>
//                     <input type="text" className="form-control" defaultValue={user?.address} ref={addressRef} placeholder="Address" />
//                 </div>

//                 <div className="form-group">
//                     <label style={{ textAlign: 'left', width: '100%' }}>Email address</label>
//                     <input type="text" className="form-control" defaultValue={user?.email} ref={emailRef} placeholder="Enter email" />
//                 </div>

//                 <div className="form-group">
//                     <label style={{ textAlign: 'left', width: '100%' }}>Password</label>
//                     <input type="password" className="form-control" defaultValue={user?.password} ref={passRef} placeholder="Password" />
//                 </div>

//                 <div className="form-group">
//                     <label style={{ textAlign: 'left', width: '100%' }}>Phone</label>
//                     <input type="text" maxLength="10" className="form-control" defaultValue={user?.phone} ref={phoneRef} placeholder="Enter phone number" />
//                 </div>
//                 {tasksOfUser && tasksOfUser.length > 0 &&
//                     <div className="form-group">
//                         <label style={{ textAlign: 'left', width: '100%' }}>Tasks</label>
//                         {tasksOfUser.map((task) => {
//                             return <span key={task.id} style={{ width: '15%' }} className="form-control">{task.taskName} </span>
//                         })}
//                     </div>
//                 }

//             </form>
//         </>
//     )

// }


export default function UserDetail({ postData }) {
    return (
        <div>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
        </div>
    )
}

export async function getStaticPaths() {
    const paths = [
        { params: { id: '1' } },
        { params: { id: '2' } }
    ]

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await axios.get('http://localhost:3000/api/user-detail', { params: { id: params.id } })
    // const postData = await axios.get(Constant.baseURL + Constant.getUserById.replace('{id}', params.id))
    const data = await postData;
    console.log('~~~User detail', postData);
    return {
        props: {
            postData
        }
    }
}
