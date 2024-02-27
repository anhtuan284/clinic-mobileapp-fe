import { Text, View } from "react-native"
import MyStyles from "../styles/MyStyles"
import InputField from "../components/Inputs/InputField"
import Logout from "../components/User/Logout"
import React from "react"
import { authApi, endpoints } from "../configs/API"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Prescription from "../components/Prescription/Prescription"
import MyContext from "../configs/MyContext"
import NursePrescription from "../components/Appointment/NurseAppointment"

export default ProfileScreen = ({route, navigation}) => {
  const [user,] = React.useContext(MyContext)

    const renderRoleBasedContent = () => {
      switch (user.role) {
        case "DOCTOR":
          return <View>Đây là giao diện cho bác sĩ</View>;
        case "PATIENT":
          return <Prescription />;
        case "NURSE":
          return <NursePrescription />;
        default:
          return null;
      }
    };
    
    return (
      <>
        {renderRoleBasedContent()}
      </>
    );
}

