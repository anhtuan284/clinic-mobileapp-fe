import { useState } from "react";
import { View, Text, TextInput, ActivityIndicator, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import MyStyles from "../../styles/MyStyles";
import Style from "./Style";
import * as ImagePicker from 'expo-image-picker';
import API, { endpoints } from "../../configs/API";
import { SingleInput } from "../Inputs/Input";
import InputField from "../Inputs/InputField";

const Register = ({navigation}) => {
    const [hidden, setHidden] = useState(false)
    const [user, setUser] = useState({
        "first_name": "",
        "last_name": "",
        "username": "",
        "password": "",
        "avatar": ""
    });
    
    const [loading, setLoading] = useState(false);
   
    const handleLogin = () => {
        navigation.navigate('Login');
    };

    const register = async () => {
        setLoading(true);

        const form = new FormData();
        for (let key in user)
            if (key === 'avatar') {
                form.append(key, {
                    uri: user[key].uri,
                    name: user[key].fileName,
                    type: user[key].type
                })
            } else
                form.append(key, user[key]);

       

        try {
            let res = await API.post(endpoints['register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.info(res.data);
            Alert.alert("Register Successfully !!\nPlease log in ")
            navigation.navigate("Login");
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    const picker = async () => {
        let {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permission Denied!");
        } else {
            let res = await ImagePicker.launchImageLibraryAsync();
            if (!res.canceled) {
                change("avatar", res.assets[0])
            }
        }
    }

    const change = (field, value) => {
        setUser(current => {
            return {...current, [field]: value}
        })
    }

    
    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>Register</Text>
            <InputField label="First Name" style={[{width: 300}]} value={user.first_name} placeholder="" icon="user" onChangeText={t => change("first_name", t)}/>
            <InputField label="Last Name" style={[{width: 300}]} value={user.last_name} placeholder="" icon="user" onChangeText={t => change("last_name", t)}/>
            <InputField label="Username" style={[{width: 300}]} value={user.username} placeholder="" icon="user" onChangeText={t => change("username", t)}/>
            <InputField label="Password" style={[{width: 300}]} value={user.password} placeholder="" icon="eye" onChangeText={t => change("password", t)} OnPressIncon={() => setHidden(!hidden)} secureEntry={hidden}/>
            <InputField label="Confirm password" style={[{width: 300}]} placeholder="" icon="eye" secureEntry={hidden} OnPressIncon={() => setHidden(!hidden)}/>

            <TouchableOpacity style={MyStyles.uploadField} onPress={picker}>
                <Text style={{color: "white", fontWeight: "bold"}}>Upload avatar...</Text>
            </TouchableOpacity>
            
            {user.avatar?<Image style={Style.avatar} source={{uri: user.avatar.uri}} />:""}
            {loading===true?<ActivityIndicator />:<>
                <TouchableOpacity style={[MyStyles.button]}  onPress={register}>
                    <Text style={MyStyles.buttonText}>Đăng ký</Text>
                </TouchableOpacity>
            </>}

            <TouchableOpacity onPress={handleLogin}>
                <Text style={{fontSize: "15", color: "blue"}}>If you have an account, login here.</Text>
            </TouchableOpacity>
            
        </View>
    );
}

export default Register;