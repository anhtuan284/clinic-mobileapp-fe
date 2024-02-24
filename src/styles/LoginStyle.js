import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const LoginStyles = StyleSheet.create({
    mainContainer:{
        backgroundColor: COLORS.darkBlue,
        height:Dimensions.get('window').height,
        padding: 40,
    },
    input: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#FFFFFF",
        fontSize: 24,
    },
    titleText: {
        color: '#eee',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16
    },
    noticeText: {
        color: '#eee',
        fontSize: 16,
        fontStyle: `italic`,
        marginBottom: 16
    },
    nameHeader: {color: '#eee', fontSize: 18, marginBottom: 4}
});

export default LoginStyles;
