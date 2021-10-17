import bg from '../public/bg.png';
import { useRef } from 'react';
import '../styles/login.module.css'
import { useCallback, useEffect } from 'react'
import router from 'next/router';
import ActionTypes from '../redux/actions/actionTypes';
import Layout from '../components/Layout';
import { useDispatch } from 'react-redux';
export default function Login() {
    const userNameRef = useRef(null);
    const dispatch = useDispatch()

    const onClickLogin = useCallback(async (e) => {
        e.preventDefault();
        const body = {
            username: userNameRef.current.value
        }
        try {
            dispatch({ type: ActionTypes.START_LOADING });
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            const loginResponse = await res.json();
            if (loginResponse.isLoggedIn) {
                router.push('/users')
            }

        } catch (error) {
        }

    }, [])

    useEffect(() => {
        router.prefetch('/')
    }, [])

    return (
        <Layout>
            <div className="{}" style={{ backgroundImage: `url(${bg})`, height: '875px' }}>
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-center mb-5">
                                <h2 className="heading-section">Login</h2>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-6 col-lg-4">
                                <div className="login-wrap p-0">
                                    <form action="#" className="signin-form">
                                        <div className="form-group">
                                            <input type="text" className="form-control" autoComplete='false' placeholder="Email" ref={userNameRef} required />
                                        </div>
                                        <div className="form-group">
                                            <input id="password-field" type="password" className="form-control" placeholder="Password" />
                                            <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password" />
                                        </div>
                                        <div className="form-group">
                                            <button type="button" className="form-control btn btn-primary submit px-3" onClick={(e) =>
                                                onClickLogin(e)}>Sign In</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}