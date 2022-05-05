import { StyleSheet, Dimensions  } from 'react-native';
import Constants from 'expo-constants';

//============================================================Feuille de style
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingTop: Constants.statusBarHeight,
        padding: 10,
    },
    icon: {
        position: 'absolute',
        fontSize: 32,
        left: 8,
        top: 24,
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
    title: {
        fontSize: 50,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        width: "75%",
        height: 65,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: 'center',
        margin: 20,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
    variant1: {
        backgroundColor: '#222222',
    },
    variant2: {
        backgroundColor: '#4b45e7',
    },
    variant3: {
        backgroundColor: '#4b45e7',
        width: 140
    },
    input: {
        borderWidth: 2,
        borderRadius: 16,
        width: "75%",
        height: 45,
        margin: 10,
        paddingLeft: 10
    },
    error: {
        color: 'red',
    },
    mail: {
        position: 'absolute',
        top: 28,
        textAlign: 'center'
    },
    map: {
        width: (Dimensions.get('window').width / 100) * 80,
        height: 200,
        margin: 10
    },
    mapVariant: {
        backgroundColor: '#4b45e7',
        alignItems: 'center',
        justifyContent: 'center',
        width: (Dimensions.get('window').width / 100) * 80,
        height: (Dimensions.get('window').height / 100) * 30,
        margin: 10,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    // Ride List
    header: {
        width: "100%",
        zIndex: 3,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        position: 'absolute',
        top: Constants.statusBarHeight
    },
    list: {
        display: "flex",
        textAlign: 'center',
        alignContent: "center",
        marginRight: "auto",
        marginLeft: "auto",
        padding: 16,
        width: "80%",
        marginTop: 40,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#4b45e7',
        zIndex: 2,
    },

    viewlist: {
        marginTop: 200,
        width: "100%",

        marginBottom: 25,
    },
    phone: {
        fontSize: 20,
        textAlign: "left",
        marginBottom: 15
    },

    heure: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 15
    },
    adress: {
        fontSize: 20,
        textAlign: "left",
        marginBottom: 20,
    },
    hr: {
        borderBottomColor: 'black',
        borderWidth: 0.5,
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20

    },
    empty: {
        height: 25
    },
});

export default styles;