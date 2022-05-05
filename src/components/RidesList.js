import { useEffect, useState } from 'react';

import { Text, View, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import styles from '../Stylesheet';

import { useDb } from '../contexts/DbContext';


export default function RidesList({ navigation }) {
    const [rides, setRides] = useState([{
        adress: "",
        arrivingTime: "",
        phoneNumber: ""
    }]);

    const { ridesData, readRides } = useDb();

    function handleRefresh() {
        readRides();
        let ridesObject = ridesData;
        let ridesArray = []
        for (const key in ridesObject) {
            ridesArray.push(ridesObject[key]);
        }
        setRides(ridesArray);
    }

    useEffect(() => {
        handleRefresh();
    }, [])

    return (
        <View style={styles.view}>
            <View style={styles.header}>
                <AntDesign name="leftcircle" size={32} onPress={() => navigation.goBack()} />
                <Text style={[styles.title, { marginBottom: 0 }]}>Liste des annonces</Text>
                <Feather name='refresh-cw' size={32} onPress={handleRefresh} />
            </View>
            <ScrollView style={styles.viewlist}>
                {
                    rides.map((item, index) => {
                        return (
                            <View key={index} style={styles.list}>
                                <Text style={styles.heure}>Arrivée à {item.arrivingTime}</Text>
                                <View style={styles.hr} />
                                <Text style={styles.adress}>Lieu :{"\n" + item.adress}</Text>
                                <Text style={styles.phone}>Contact : {item.phoneNumber}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}

