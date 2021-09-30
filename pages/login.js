import bg from '../public/bg.png';
import { useRef } from 'react';
import '../styles/login.module.css'

export default function Login() {

    const userNameRef = useRef(null);
    const passWordRef = useRef(null);

    const onClickLogin = async () => {
        console.log('Clicked on login');
        const email = userNameRef.current.value;
        const password = passWordRef.current.value;
        if (!email || !password) return;
        else {
            // const res = await fetch('/api/login', { headers: { email, password } })
            // const res = await fetch(Constant.baseURL + Constant.getUserByEmail.replace('{email}', email));
            // if (res) {
            //     console.log('Pass authen', res);
            // }
        }
    }
    return (
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
                                        <input type="text" className="form-control" placeholder="Email" ref={userNameRef} required />
                                    </div>
                                    <div className="form-group">
                                        <input id="password-field" type="password" autoComplete="" className="form-control" placeholder="Password" ref={passWordRef} required />
                                        <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password" />
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="form-control btn btn-primary submit px-3" onClick={() =>
                                            onClickLogin()}>Sign In</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}