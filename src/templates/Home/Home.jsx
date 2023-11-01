import React, { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';

const Home = () => {
    const {name} = useContext(authContext);
    return (
        <div>
            <p>Home sections</p>
        </div>
    );
};

export default Home;