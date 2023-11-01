import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {

    const {user} = useContext(authContext);

    const location = useLocation();
    console.log(location);

    if(user && user?.emailVerified === true){
        return children;
    }
    return (
        <Navigate to='/login' state={{from: location}} replace={true} ></Navigate>
    );
};

export default PrivateRoute;