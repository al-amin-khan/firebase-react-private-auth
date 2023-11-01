import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Login from '../Login/Login';

const Layout = () => {
    return (
        <div className='container mx-auto'>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default Layout;