import { useState, useEffect } from 'react';

import { View, TextInput, KeyboardAvoidingView, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../Stylesheet';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { useDb } from '../contexts/DbContext';


//========================================================================Maps
export default function Maps(props) {
    // position du point central de la vue Maps (lat, lng)
    const [position, setPosition] = useState({ latitude: 43.7225, longitude: 7.111944444 });
    const [adress, setAdress] = useState("");
    const [maps, setMaps] = useState(false);

    const { userRideData } = useDb();

    function handleSubmit() {
        Location.geocodeAsync(adress).then(coords => {
            if (coords[0] === undefined) {
                return props.adressStateFunction(false)
            }

            setPosition({ latitude: coords[0].latitude, longitude: coords[0].longitude });

            // accès aux variables d'état 'adress' et 'adressState' du composant JS parent
            // car les fonction d'états ont été passées en argument (RideForm.js, ligne 65)
            props.adressFunction(adress);
            props.adressStateFunction(true);
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        Location.requestForegroundPermissionsAsync().then(resp => {
            if (resp.status === 'granted') {
                setMaps(true);
            }
        })

        if (userRideData) {
            setAdress(userRideData.adress);
            // en faisait cela on met à jour le composant parent avec les valeurs de la course actuelle
            handleSubmit();
        }
    }, [])

    return (
        <KeyboardAvoidingView
            style={styles.view}
            behavior='height'
            enabled={false}
        >
            <View style={styles.flex}>
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={setAdress}
                    placeholder="Adresse d'arrivée"
                    value={adress}
                />

                <AntDesign
                    name="check"
                    size={28}
                    onPress={handleSubmit}
                />
            </View>

            {
                maps ? (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: position.latitude,
                            longitude: position.longitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02
                        }}
                        region={{
                            latitude: position.latitude,
                            longitude: position.longitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02
                        }}
                    >
                        <Marker
                            title='Arrivée'
                            coordinate={{
                                latitude: position.latitude,
                                longitude: position.longitude,
                            }}
                        />
                    </MapView>
                ) : (
                    <View style={styles.mapVariant}><Text>Interface Google Maps</Text></View>
                )
            }
        </KeyboardAvoidingView>
    )
}


// process.env.MAPS_APIKEY


/*

<MapView
                style={styles.map}
                showsUserLocation
                initialRegion={{
                    latitude: position.latitude,
                    longitude: position.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02
                }}
                region={{
                    latitude: position.latitude,
                    longitude: position.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02
                }}
            >
                <Marker
                    title='Arrivée'
                    coordinate={{
                        latitude: position.latitude,
                        longitude: position.longitude,
                    }}
                />
            </MapView>

location{
    "timestamp": 1651163125230
    "mocked": false,
    "coords": {
        "altitude": 0,
        "heading": 0,
        "latitude": 43.6770233,
        "longitude": 7.1854467,
        "altitudeAccuracy": 40,
        "speed": 0,
        "accuracy": 465.1390075683594
}

region {
    "latitude": 43.67702292684555,
    "latitudeDelta": 0.02127212761737951,
    "longitude": 7.1854463405907145,
    "longitudeDelta": 0.02000022679567337,
  }

  */