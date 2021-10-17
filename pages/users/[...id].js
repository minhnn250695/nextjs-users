
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Constant from "../constant";
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { addUser, updateUser } from "../../redux/actions/user";
import { v4 as uuidv4 } from 'uuid';
import Layout from "../../components/Layout";
import ActionTypes from "../../redux/actions/actionTypes";

export default function UserDetail({ userDetail }) {
    const router = useRouter()
    const nameRef = useRef(null);
    const addressRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const phoneRef = useRef(null);
    const [isCreate, setIsCreate] = useState(false);
    const dispatch = useDispatch();
    const id = userDetail.id;
    useEffect(() => {
        if (id != 'new') {
            setIsCreate(false);
        } else {
            setIsCreate(true);
        }
    }, [id])

    const onSubmitForm = (e) => {
        e.preventDefault();
        const data = {
            id: isCreate ? uuidv4() : userDetail?.id,
            userName: nameRef.current.value,
            password: passRef.current.value,
            email: emailRef.current.value,
            address: addressRef.current.value,
            phone: phoneRef.current.value
        };
        if (isCreate) {
            dispatch(addUser(data));
        } else {
            dispatch(updateUser(data));
        }
        setTimeout(() => {
            dispatch({ type: ActionTypes.RESET_USER_STORE })
            router.push('/users');
        }, 1000);
    }

    return (
        <>
            <Layout>
                <form className="container">
                    <h3 className="title">{isCreate ? "Create New User" : "Update User Info"}</h3>
                    <div className="form-group">
                        <label style={{ textAlign: 'left', width: '100%' }}>User Name</label>
                        <input type="text" className="form-control" defaultValue={userDetail?.userName} ref={nameRef} placeholder="User name" />
                    </div>

                    <div className="form-group">
                        <label style={{ textAlign: 'left', width: '100%' }}>Address</label>
                        <input type="text" className="form-control" defaultValue={userDetail?.address} ref={addressRef} placeholder="Address" />
                    </div>

                    <div className="form-group">
                        <label style={{ textAlign: 'left', width: '100%' }}>Email address</label>
                        <input type="text" className="form-control" defaultValue={userDetail?.email} ref={emailRef} placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label style={{ textAlign: 'left', width: '100%' }}>Password</label>
                        <input type="password" className="form-control" defaultValue={userDetail?.password} ref={passRef} placeholder="Password" />
                    </div>

                    <div className="form-group">
                        <label style={{ textAlign: 'left', width: '100%' }}>Phone</label>
                        <input type="text" maxLength="10" className="form-control" defaultValue={userDetail?.phone} ref={phoneRef} placeholder="Enter phone number" />
                    </div>

                    <div className='d-flex justify-content-end mt-4'>
                        <div>
                            <Button type="button" variant="contained" color="primary" style={{ float: 'right', marginTop: '30px', right: '18px' }}
                                className="btn btn-primary btn-block" onClick={(e) => onSubmitForm(e)}>Save
                            </Button>
                            <Button type="button" variant="contained" color="primary" style={{ float: 'right', marginTop: '30px', marginRight: '5px', right: '18px' }} onClick={(e) => {
                                e.preventDefault()
                                router.push('/users')
                            }}>Back
                            </Button>
                        </div>
                    </div>
                </form>
            </Layout>
        </>
    )
}

export async function getServerSideProps({ params }) {

    if (params.id == 'new') {
        return {
            props: { userDetail: { id: 'new' } }
        }
    }
    const res = await fetch(Constant.baseURL + Constant.getUserById.replace('{id}', params.id))
    const user = await res.json()
    if (!user) {
        return {
            notFound: true,
        }
    }

    return {
        props: { userDetail: user },
    }
}