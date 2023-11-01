import React, { createContext, useEffect } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../authConfiguration/firebase.config';
import { useState } from 'react';

export const authContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // firebase sign up
    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = () => {
            onAuthStateChanged(auth, currentUser => {
                console.log('on auth state changed: ', currentUser);
                setUser(currentUser);
            })
        }
        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        registerUser,
        loginUser,
        resetPassword,
        logout
    }
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;