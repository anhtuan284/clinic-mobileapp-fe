import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import DatePicker from "react-native-modern-datepicker";
import axios from 'axios'; // Import axios để gửi yêu cầu HTTP
import { authApi, endpoints } from "../configs/API";
import { getFormatedDate } from "react-native-modern-datepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from '../configs/MyContext';
import MyStyles from '../styles/MyStyles';
import UserAppointment from '../components/Appointment/UserAppointment';
import NurseAppointment from '../components/Appointment/NurseAppointment';

 
export default ScheduledScreen = () => {
  const [user,] = React.useContext(MyContext)

    const renderRoleBasedContent = () => {
      switch (user.role) {
        case "DOCTOR":
          return <View>Đây là giao diện cho bác sĩ</View>;
        case "PATIENT":
          return <UserAppointment />;
        case "NURSE":
          return <NurseAppointment />;
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