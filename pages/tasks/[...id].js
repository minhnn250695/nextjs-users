
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Constant from "../constant";
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Layout from "../../components/Layout";

export default function TaskDetail({ taskDetail }) {
    const router = useRouter()
    const nameRef = useRef(null);

    const [isCreate, setIsCreate] = useState(false);
    // const dispatch = useDispatch();

    useEffect(() => {
        const { id } = taskDetail?.id;
        if (id === 'new') {
            setIsCreate(true);
        } else if (id !== 'new') {
            setIsCreate(false);
        }
    }, [])

    const onSubmitForm = (e) => {
        e.preventDefault();
        const data = {
            id: isCreate ? uuidv4() : taskDetail?.id,
            taskName: nameRef.current.value,
        };
        // if (isCreate) {
        //     dispatch(addTask(data));
        // } else {
        //     dispatch(updateTask(data));
        // }
        // router.push('/tasks');
    }

    return (
        <Layout>
            <form className="container">
                <h3 className="title">{isCreate ? "Create New Task" : "Update Task Info"}</h3>
                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Task Name</label>
                    <input type="text" className="form-control" defaultValue={taskDetail?.taskName} ref={nameRef} placeholder="Task name" />
                </div>
                <div className='d-flex justify-content-end mt-4'>
                    <div>
                        <Button type="button" variant="contained" color="primary" style={{ float: 'right', marginTop: '30px', right: '18px' }}
                            className="btn btn-primary btn-block" onClick={(e) => onSubmitForm(e)}>Save
                        </Button>
                        <Button type="button" variant="contained" color="primary" style={{ float: 'right', marginTop: '30px', marginRight: '5px', right: '18px' }} onClick={(e) => {
                            e.preventDefault()
                            router.push('/tasks')
                        }}>Back
                        </Button>
                    </div>
                </div>
            </form>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = [
        { params: { id: "e0b2e0d3-18b8-48c5-babc-6a71a53f27a4" } },
        { params: { id: "e1cd6a55-3073-486d-acc4-d18b093c9465" } },
        { params: { id: "a350396e-1976-4580-970a-3ec6d4e7e609" } }

    ]

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(Constant.baseURL + Constant.getTaskById.replace('{id}', params.id))
    const taskDetail = await res.json();
    return {
        props: {
            taskDetail: taskDetail
        }
    }
}
