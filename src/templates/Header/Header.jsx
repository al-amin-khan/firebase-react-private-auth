import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider';

const Header = () => {

    const {user, logout} = useContext(authContext);

    const handleLogout = () => {
        logout()
        .then( () => {})
        .then(error => console.error(error))
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to='/home'><a>Home</a></Link></li>
                    <li><Link to='/registration'><a>Registration</a></Link></li>
                    <li><Link to='/dashboard'><a>Dashboard</a></Link></li>
                </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl"> <Link to='/home'>Onneshon</Link> </a>
            </div>
            <div className="navbar-center hidden lg:flex font-semibold">
                <ul className="menu menu-horizontal px-1">                   
                    <li><Link to='/home'><a>Home</a></Link></li>
                    <li><Link to='/registration'><a>Registration</a></Link></li>
                    <li><Link to='/dashboard'><a>Dashboard</a></Link></li>
                </ul>
            </div>
            {
                (user && user.emailVerified === true) ? 
                <div className="navbar-end">
                    <p className='mr-3'>{`Hello, ${user.displayName}`}</p>
                    <a onClick={handleLogout} className="btn">Logout</a>
                </div>
                :
                <div className="navbar-end">
                    <Link to='/login' className="btn">Login</Link>
                </div>
            }
        </div>
    );
};

export default Header;