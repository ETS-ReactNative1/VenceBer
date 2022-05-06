import { useEffect } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../Stylesheet';
import Logo from './Logo';

import { useAuth } from '../contexts/AuthContext';
import { useDb } from '../contexts/DbContext';

//=====================================================================Accueil
export default function Home({ navigation }) {
    const { logout, currentUser } = useAuth();
    const { getPhone, readRides, readUserRide } = useDb();

    const isFocused = useIsFocused()

    function handleLogout(e) {
        e.preventDefault();

        logout();
    }

    useEffect(() => {
        isFocused && (
            getPhone(),
            readRides(),
            readUserRide()
        )
    }, [isFocused])

    return (
        <View style={styles.view}>
            <MaterialIcons
                style={styles.icon}
                name="logout"
                color="red"
                onPress={handleLogout}
            />

            <Text style={styles.mail}>{currentUser.email}</Text>
            <Logo />

            <Text style={styles.title}>Je suis :</Text>

            <TouchableOpacity style={[styles.button, styles.variant1]} onPress={() => navigation.navigate("Ride Form")}>
                <Text style={styles.buttonText}>Conducteur</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.variant2]} onPress={() => navigation.navigate("Rides List")}>
                <Text style={styles.buttonText}>Passager</Text>
            </TouchableOpacity>
        </View>
    );
}