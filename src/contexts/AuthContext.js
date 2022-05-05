import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../Firebase';

// création d'un contexte, variable accessible dans tout les enfants d'un parent
const AuthContext = createContext();

// renvoie la dernière valeur du context
export function useAuth() {
    return useContext(AuthContext);
}

// fonction principale du contexte, qui le retournera pour être utilisée à la racine de notre application(pour toucher tous les composants enfants)
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // création d'un compte
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // connexion à un compte
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    // React Hook qui s'execute lors du montage du composant
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting.
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}