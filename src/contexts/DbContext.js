import React, { createContext, useContext, useEffect, useState } from 'react';
import { ref, set, child, get } from "firebase/database";
import { db } from '../Firebase';

import { useAuth } from './AuthContext';

const DbContext = createContext();

// renvoie la dernière valeur du context
export function useDb() {
    return useContext(DbContext);
}

export function DbProvider({ children }) {
    const [ridesData, setRidesData] = useState(null);
    const [userRideData, setUserRideData] = useState(null);
    const [phoneNumber, setPhonenumber] = useState(null);

    const { currentUser } = useAuth()

    // recupération du numéro de téléphone
    function getPhone() {
        if (currentUser) {
            const dbRef = ref(db);
            get(child(dbRef, 'users/' + currentUser.uid)).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setPhonenumber(data.phoneNumber);
                    resolve(data.phoneNumber);
                }
            })
        }
    }

    function readRides() {
        const dbRef = ref(db);
        return get(child(dbRef, 'rides')).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setRidesData(data);
            }
        })
    }

    function readUserRide() {
        const dbRef = ref(db);
        return get(child(dbRef, 'rides/' + currentUser.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setUserRideData(data)
            }
        })
    }

    function writeUserData(uid, mail, phoneNumber) {
        set(ref(db, 'users/' + uid), {
            mail: mail,
            phoneNumber: phoneNumber,
        });
    }

    // écriture des informations de course
    function writeUserRide(arrivingTime, adress) {
        set(ref(db, 'rides/' + currentUser.uid), {
            adress: adress,
            arrivingTime: arrivingTime,
            phoneNumber: phoneNumber
        });
    }

    function eraseUserRide() {
        set(ref(db, 'rides/' + currentUser.uid), null);
        setUserRideData(null);
    }

    const value = {
        userRideData,
        ridesData,

        readRides,
        readUserRide,

        writeUserRide,
        writeUserData,

        eraseUserRide,

        getPhone
    }

    // useEffect(() => {
    //     if (currentUser) {
    //         getPhonePromise.then((value) => {
    //             console.log(value);
    //         })
    //         readUserRide();
    //         readRides();
    //     }
    // }, [])

    return (
        <DbContext.Provider value={value}>
            {children}
        </DbContext.Provider>
    );
}

// const value = {
//     userRideData,
//     ridesData,
//     readRides,
//     readUserRide,
//     writeUserRide,
//     writeUserData,
//     eraseUserRide
// }