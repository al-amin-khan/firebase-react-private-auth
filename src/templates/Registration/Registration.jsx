import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import { sendEmailVerification, updateProfile } from 'firebase/auth';

const Registration = () => {
    const [show, setShow] = useState(true);

    const {user, registerUser} = useContext(authContext);
    console.log(user);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        // password validation
        if (!/(?=^.{8,}$)/.test(password)) {
            toast('Must have at least 8 characters');
            return
        }
        if (!/(?=.*[0-9])/.test(password)){
            toast('Must have at least 1 digit');
            return
        }
        if (!/(?=.*[A-Z])/.test(password)){
            toast('Must have at least 1 uppercase letter');
            return
        }
        if (!/(?=.*[a-z])/.test(password)){
            toast('Must have at least 1 lowercase letter');
            return
        }
        if (!/(?=.*[!@#$&*])/.test(password)){
            toast('Must have at least 1 special character');
            return
        }

        // firebase sign up
        registerUser(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log(user);
            toast('Congratulations! Account created successfully.')
            verifyEmail(user);
            updateUser(user, name);
            form.reset();
        })
        .catch(error => {
            const errorCode = error.code;
            
            if(errorCode === 'auth/email-already-in-use'){
                toast('Email already in use.');
                
            }
        })
    }

    const verifyEmail = (user) => {
        sendEmailVerification(user)
        .then(() => {
            toast('Please verify your email. check you inbox.');
        })
    }

    const updateUser = (user, name) => {
        updateProfile(user, {
            displayName: name,
        }).then(() => {
            console.log('Profile updated');
        }).catch((error) => {
            console.log(error.code);
        });
    }


    return (
        <div className="">
            <div className="flex flex-col min-h-screen ">
                <div className="mt-6 flex-grow place-content-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Registration</h1>
                    </div>
                    <div className='mt-6 grid w-full place-items-center justify-center'>
                        <div className="card flex-shrink-0 max-w-md shadow-2xl shadow-teal-800 bg-base-100">
                            <form onSubmit={handleSubmit} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name='name' autoComplete='name' placeholder="Jhon Doe" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' autoComplete='on' placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    {/* <input type="password" name='password' placeholder="password" className="input input-bordered" required /> */}
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
                                        <p><small>Already a member?</small> {' '}
                                            <Link to="/login" className="label-text-alt link link-hover font-semibold text-sm text-teal-500">Login</Link>  
                                        </p>
                                        
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-accent">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;