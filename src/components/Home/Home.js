import ButtonSet, { SingleButton } from "../Inputs/ButtonSet"
import React from 'react';
import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import MyContext from "../../configs/MyContext";
import MyStyles from "../../styles/MyStyles";
import API, { authApi, endpoints } from "../../configs/API";
import DoctorList from "../Doctor/DoctorList";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default Home = () => {
  const [doctor, setDoctor] = React.useState(null);

    React.useEffect(() => {
        const loadDoctor = async () => {
            try {
              let token = await AsyncStorage.getItem("access-token")
              let res = await authApi(token).get(endpoints['doctors']);
              setDoctor(res.data.results)
            } catch (ex) {
              setDoctor([])
              console.error(ex);
            }
        }
        loadDoctor();
    }, []);

  return (
    <DoctorList doctors={doctor} />
  );
};
