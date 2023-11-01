import React, { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { authContext } from '../AuthProvider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [show, setShow] = useState(true);

    const {loginUser, resetPassword} = useContext(authContext);
    const emailRef = useRef('');

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const from = location.state?.from?.pathname || '/home';

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // firebase login
        loginUser(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log(user);
            toast('You are login successfully');
            form.reset();
            navigate(from, {replace: true});
        })
        .catch(error => {
            const errorCode = error.code;
            console.log(errorCode);
            
            if(errorCode ===   'auth/invalid-login-credentials'){
                toast('Invalid login credentials');
            }
        });
    }

    const handleResetPassword = () => {
        const email = emailRef.current.value;

        if (email === '') {
            toast('Please input your email address first');
        }

        resetPassword(email)
        .then(() => {
            toast('A email has been sent to you for reset password')
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
        });
    }


    

    return (
        <div>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col">
                    <div className="text-center -mt-24">
                        <h1 className="text-3xl font-bold">Login</h1>
                    </div>
                    <div className="card flex-shrink-0  max-w-sm shadow-2xl shadow-purple-500 bg-base-100">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' ref={emailRef} autoComplete='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className='relative'>
                                    <input type={show ? 'password' : 'text'} name='password' placeholder="password" className="input input-bordered" required />
                                    <div onClick={() => setShow(!show)} className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-auto">
                                        {
                                            show 
                                            ? 
                                            <img src="/close-eye.png" alt="eye-closed" height='35px' width='35px' />
                                            :
                                            <img src="/open-eye.png" alt="eye-open" height='35px' width='35px' />
                                        }
                                    </div>
                                </div>
                                <label className="label">
                                    <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;