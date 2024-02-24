import { StyleSheet } from "react-native";
import { COLOR } from "../constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    }, 
    row: {
        flexDirection: "row"
    }, 
    subject: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
        color: COLOR.PRIMARY,
    }, 
    m_10: {
        margin: 3,
        maxWidth:270,
        
    }, 
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold", 
        color: "blue"
    }, 
    fullScreenBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    modalView: {
        margin: 20,
        borderRadius: 50,
        backgroundColor: "white",
        width: '90%',
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    confirmText: {
        color: "blue",
        fontSize: 20,
        fontWeight: "normal",
    },
    uploadField: {
        backgroundColor: COLOR.secondary,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        padding: 10,
        width: '40%',
        color: 'white',
    },
    button: {
        width: "30%",
        alignItems:"center",
        textAlign: "center",
        backgroundColor: COLOR.PRIMARY,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: 'white',
        marginVertical: 16,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});