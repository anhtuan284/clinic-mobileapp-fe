import { useState } from "react";
import { View, Text, TextInput, ActivityIndicator, Image, Alert, ImageBackground, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import MyStyles from "../../styles/MyStyles";
import Style from "./Style";
import * as ImagePicker from 'expo-image-picker';
import API, { endpoints } from "../../configs/API";
import { SingleInput } from "../Inputs/Input";
import InputField from "../Inputs/InputField";
import { signUpSchema } from "../../utils/validationSchemas";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Register = ({navigation}) => {
    const [hidden, setHidden] = useState(false)
    const [uploadImg, setuploadImg] = useState(false)
    const [user, setUser] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
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
            console.log(res.statusCode, res.statusMessage)
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
            setuploadImg(true)
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

    const handleForm = (value) => {
        setUser({...value})
        register()
    }
    return (
        <Formik
            initialValues={{
                "first_name": "",
                "last_name": "",
                "email": "",
                "username": "",
                "password": "",
            }}
            onSubmit={handleForm}
            validateOnMount={true}
            validationSchema={signUpSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, touched, values, errors, isValid }) => (
                <KeyboardAwareScrollView contentContainerStyle={MyStyles.container}>
                    <View style={{paddingTop: 80}}></View>
                    <Text style={MyStyles.subject}>Register</Text>
                    <InputField onBlur={handleBlur('first_name')} label="First Name" style={[{width: 300}]} value={values.first_name} placeholder="" icon="user" onChangeText={handleChange('first_name')}/>
                    {(errors.first_name && touched.first_name) && 
                        <Text style={MyStyles.error}>{errors.first_name}</Text>}
    
                    <InputField onBlur={handleBlur('last_name')} label="Last Name" style={[{width: 300}]} value={values.last_name} placeholder="" icon="user" onChangeText={handleChange('last_name')}/>
                    {(errors.last_name && touched.last_name) &&
                        <Text style={MyStyles.error}>{errors.last_name}</Text>}
    
                    <InputField onBlur={handleBlur('email')} label="Email" style={[{width: 300}]} value={values.email} placeholder="" icon="mail" onChangeText={handleChange('email')}/>
                    {(errors.email && touched.email) &&
                        <Text style={MyStyles.error}>{errors.email}</Text>}
    
                    <InputField onBlur={handleBlur('username')} label="Username" style={[{width: 300}]} value={values.username} placeholder="" icon="user" onChangeText={handleChange('username')}/>
                    {(errors.username && touched.username) &&
                        <Text style={MyStyles.error}>{errors.username}</Text>}
    
                    <InputField onBlur={handleBlur('password')} label="Password" style={[{width: 300}]} value={values.password} placeholder="" icon="eye" onChangeText={handleChange('password')} OnPressIncon={() => setHidden(!hidden)} secureEntry={hidden}/>
                    {(errors.password && touched.password) &&
                        <Text style={MyStyles.error}>{errors.password}</Text>}
    
                    <InputField onBlur={handleBlur('confirm_password')} label="Confirm password" style={[{width: 300}]} value={values.confirm_password} placeholder="" icon="eye" secureEntry={hidden} onChangeText={handleChange('confirm_password')} OnPressIncon={() => setHidden(!hidden)}/>
                    {(errors.confirm_password && touched.confirm_password) &&
                        <Text style={MyStyles.error}>{errors.confirm_password}</Text>}
        
                    <TouchableOpacity style={MyStyles.uploadField} onPress={picker}>
                        <Text style={{color: "white", fontWeight: "bold"}}>Upload avatar...</Text>
                    </TouchableOpacity>
                    
                    {user.avatar?<Image style={Style.avatar} source={{uri: user.avatar.uri}} />:""}
                    {loading===true?<ActivityIndicator />:<>
                        <TouchableOpacity style={uploadImg===true?[MyStyles.button]:[MyStyles.disableButton]} disabled={!uploadImg} onPress={handleSubmit}>
                            <Text style={MyStyles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </>}
        
                    <TouchableOpacity onPress={handleLogin} >
                        <Text style={{fontSize: 15, color: "blue", paddingBottom: 100}}>If you have an account, login here.</Text>
                    </TouchableOpacity>
                    </KeyboardAwareScrollView>
                    )}
        </Formik>

    );
}

export default Register;