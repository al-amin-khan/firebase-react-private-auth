import React, { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';

const Home = () => {
    const {name} = useContext(authContext);
    return (
        <div>
            <img src="/landing-page.png" alt="" width='100%' />
        </div>
    );
};

export default Home;