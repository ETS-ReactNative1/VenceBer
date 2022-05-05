import { useState } from 'react';

import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../Stylesheet';
import Logo from './Logo';

import { useAuth } from '../contexts/AuthContext';
import { useDb } from '../contexts/DbContext';

//===================================================================Connexion
export default function Login({ navigation }) {
    //définition de variable d'état (cf. useState React Hook)
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    // appel de la fonction login depuis le contexte de firebase(voir AuthContext.js)
    const { login } = useAuth();

    // prise en charge de la validation de connexion
    function handleSubmit(e) {
        e.preventDefault();
        setError('');

        // prise en charge des erreurs
        if (id === "") {
            return setError("Veuillez entrez une adresse mail");
        }
        if (pwd === "") {
            return setError("Veuillez entrez un mot de passe");
        }

        setLoading(true);
        login(id, pwd)
            // prise en charge des erreurs venant de Firebase
            .catch(error => {
                if (error.code === "auth/wrong-password") {
                    setError("Mot de passe incorrect !");
                }
                else if (error.code === "auth/invalid-email") {
                    setError("Adresse mail invalide");
                }
                else if (error.code === "auth/user-not-found") {
                    setError("Utilisateur inconnu");
                }
                else {
                    setError("Erreur non prise en charge :\n" + error.code);
                }
            })

        setLoading(false)
    }

    return (
        <View style={{ backgroundColor: '#eee', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <AntDesign
                style={styles.icon}
                name="leftcircle"
                size={32}
                color='#222222'
                onPress={() => navigation.goBack()}
            />

            <Logo />

            <Text style={styles.title}>Se connecter</Text>

            <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={setId}
                placeholder="Entrez une adresse mail valide"
                value={id} //debug
            />

            <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry={true}
                onChangeText={setPwd}
                placeholder="Entrez un mot de passe"
                value={pwd} //debug
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