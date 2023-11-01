import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Login from '../Login/Login';
import Home from '../Home/Home';

const Layout = () => {
    return (
        <div>
            <div className='container mx-auto'>
                <Header/>
            </div>
            <Outlet/>
        </div>
    );
};

export default Layout;