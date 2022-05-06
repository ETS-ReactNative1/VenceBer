import { Text, View, TouchableOpacity, Linking } from 'react-native';
import styles from '../Stylesheet';
import Logo from './Logo';


//===================================================================Bienvenue
export default function Welcome({ navigation }) {
    return (
        <View style={styles.view}>
            <Logo />

            <Text style={styles.title}>Bonjour !</Text>

            <TouchableOpacity style={[styles.button, styles.variant1]} onPress={() => navigation.navigate("Log In")}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.variant2]} onPress={() => navigation.navigate("Sign Up")}>
                <Text style={styles.buttonText}>S'inscrire</Text>

            </TouchableOpacity>

            <Text style={{ color: 'black', paddingTop: 20, color: "orange" }}
                onPress={() => Linking.openURL('https://discord.gg/v2n7JgdBUV')}>
                Nous contacter
            </Text>

        </View>
    );
}