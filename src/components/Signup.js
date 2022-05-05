import { useState } from 'react';

import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../Stylesheet';
import Logo from './Logo';

import { useAuth } from '../contexts/AuthContext';
import { useDb } from '../contexts/DbContext';

//=================================================================Inscription
export default function Signup({ navigation }) {
    //définition de variable d'état (cf. useState React Hook)
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const { writeUserData, setPhonenumber } = useDb();
    const { signup } = useAuth();

    // prise en charge de la validation d'inscription/création de compte
    function handleSubmit(e) {
        e.preventDefault();
        setError('');

        // prise en charge des erreurs
        if (mail === "") {
            return setError("Veuillez entrez une adresse mail")
        }
        if (phoneNumber === "") {
            return setError("Veuillez entrez un numéro")
        }
        if (password === "") {
            return setError("Veuillez entrez un mot de passe")
        }

        signup(mail, password)
            .then((userCredential) => {
                const user = userCredential.user;
                writeUserData(user.uid, mail, phoneNumber);
              })
            // prise en charge des erreurs venant de Firebase
            .catch(error => {
                if (error.code === "auth/invalid-email") {
                    setError("Adresse mail invalide !");
                }
                else if (error.code === "auth/email-already-in-use") {
                    setError("Compte déjà existant");
                }
                else if (error.code === "auth/weak-password") {
                    setError("Mot de passe trop faible ! (6 caractère minimum)");
                }
                else {
                    setError("Erreur non prise en charge :\n" + error.code);
                }
            })

        setLoading(false)
    }

    return (
        <View style={styles.view}>
            <AntDesign
                style={styles.icon}
                name="leftcircle"
                size={32}
                color='#222222'
                onPress={() => navigation.goBack()}
            />

            <Logo />

            <Text style={styles.title}>S'inscrire</Text>

            <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={setMail}
                placeholder="Adresse mail"
                value={mail}
            />

            <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={setPhoneNumber}
                placeholder="Numéro de téléphone"
                value={phoneNumber}
            />

            <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry={true}
                onChangeText={setPassword}
                placeholder="Mot de passe (6 caractères minimum)"
                value={password}
            />

            <Text style={styles.error}>{error}</Text>

            <TouchableOpacity
                style={[styles.button, styles.variant2]}
                onPress={handleSubmit}
                disabled={loading}
            >
                <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
        </View>
    )
}