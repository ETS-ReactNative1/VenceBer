import { Image } from 'react-native';
import styles from '../Stylesheet';

//========================================================================Logo
export default function Logo() {
    return <Image style={styles.logo} source={require("../../assets/logo1024.png")} />;
}