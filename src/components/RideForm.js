import { useEffect, useState } from 'react';

import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import styles from '../Stylesheet';
import Logo from './Logo';

import { useDb } from '../contexts/DbContext';
import { useAuth } from '../contexts/AuthContext';

import Maps from './Maps';

//=================================================================Inscription
export default function RideForm({ navigation }) {
    // définition de variable d'état (cf. useState React Hook)
    const [arrivingTime, setArrivingTime] = useState("");
    const [adress, setAdress] = useState("");
    const [adressState, setAdressState] = useState(false); // true: une adresse correcte a été rentrée, false: adresse incorrect
    const [state, setState] = useState(false);

    const { userRideData, writeUserRide, readUserRide, eraseUserRide } = useDb();

    // prise en charge de la validation du formulaire de course
    function handleEdit(e) {
        e.preventDefault();

        if (arrivingTime === "") {
            return
        }

        const timeCheck = /^[0-9:]*$/.test(arrivingTime);
        if (!timeCheck) {
            return
        }

        writeUserRide(arrivingTime, adress);
        readUserRide();
        setState(true);
    }

    // prise en charge de la suppresion de l'annonce de course
    function handleErase(e) {
        e.preventDefault();

        eraseUserRide();
        navigation.navigate("Home");
    }

    useEffect(() => {
        if (userRideData) {
            setState(true);
            setAdress(userRideData.adress);
            setArrivingTime(userRideData.arrivingTime);
        }
    }, [])

    return (
        <KeyboardAvoidingView
            style={styles.view}
            behavior='height'
            enabled={false}
        >

            <AntDesign
                style={styles.icon}
                name="leftcircle"
                size={32}
                color='#222222'
                onPress={() => navigation.goBack()}
            />

            <Text style={styles.title}>Créer une annonce</Text>
            <Text>{state ? "Annonce de trajet en cours" : "Aucune annonce de trajet en cours"}</Text>
            <View style={styles.flex}>
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={setArrivingTime}
                    placeholder="Heure d'arrivée (hh:mm)"
                    value={arrivingTime}
                />

                <Ionicons
                    style={styles.littleIcon}
                    size={28}
                    name="time-outline"
                />
            </View>

            <Maps
                adressFunction={setAdress}
                adressStateFunction={setAdressState}
            />

            <View style={styles.flex}>
                <TouchableOpacity
                    style={[styles.button, styles.variant3]}
                    onPress={handleErase}
                    disabled={!state}
                >
                    <Text style={styles.buttonText}>Suprimmer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.variant3]}
                    onPress={handleEdit}
                    disabled={!adressState}
                >
                    <Text style={styles.buttonText}>
                        {state ? "Editer" : "Poster"}
                    </Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}
