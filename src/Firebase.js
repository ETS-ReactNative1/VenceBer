import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAl9tlxsUe8CAjiZKv7HKFA926suA-Kow0",
    authDomain: "vence-ber-nsi.firebaseapp.com",
    databaseURL: "https://vence-ber-nsi-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "vence-ber-nsi",
    storageBucket: "vence-ber-nsi.appspot.com",
    messagingSenderId: "742104287406",
    appId: "1:742104287406:web:0a86348dc43564bede053f"
  };

const app = initializeApp(firebaseConfig) // connection à l'API

// Firebase dispose de plein de service. En se connectant à l'API, nous pouvons y avoir accès
// mais il faut préciser un objet représentant le service que nous allons utiliser

// récupération de l'objet authentifiant (permet de se connecter, s'inscrire, etc)
export const auth = getAuth(app)

// récupération de l'objet base de données temps réel (permet d'accéder à la base de données)
export const db = getDatabase(app);

export default app;