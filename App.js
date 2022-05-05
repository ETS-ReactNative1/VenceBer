
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { DbProvider } from './src/contexts/DbContext'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './src/components/Welcome';
import Signup from './src/components/Signup';
import Login from './src/components/Login';
import Home from './src/components/Home';
import Rideform from './src/components/RideForm';
import Rideslist from './src/components/RidesList';
import Maps from './src/components/Maps';

//==================================================================Navigation
// création de l'objet de navigation
const Stack = createNativeStackNavigator();

function Navigation() {
    // appel de la variable utilisateur courant depuis le contexte de firebase (voir AuthContext.js)
    const { currentUser } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    currentUser ? (
                        <>
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Rides List" component={Rideslist} />
                            <Stack.Screen name="Ride Form" component={Rideform} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Welcome" component={Welcome} />
                            <Stack.Screen name="Sign Up" component={Signup} />
                            <Stack.Screen name="Log In" component={Login} />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );

}

//=================================================================Application
export default function App() {
    return (
        <AuthProvider>
            <DbProvider>
                <Navigation />
            </DbProvider>
        </AuthProvider>
    );
}