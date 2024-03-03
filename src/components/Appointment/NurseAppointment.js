import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert, ScrollView, ActivityIndicator } from 'react-native';
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from '../../configs/API';
import MyContext from '../../configs/MyContext';
import MyStyles from '../../styles/MyStyles';

 
const NurseAppointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [user,] = React.useContext(MyContext)   
  const [sort, setSort] = useState({
    "selected_date": "",
    "status": ""
  });


  useEffect(() => {
    const fetchAppointment = async () => {
      try {
          console.log(form);
          const token = await AsyncStorage.getItem('access-token')
          const response = await authApi(token).get(endpoints['get-list-pending']);
          console.log(response.data);
        if (response.data) {
          setAppointment(response.data);    
          console.log(appointment)
        } else {
          console.log("Không có cuộc hẹn nào đang chờ xác nhận.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu cuộc hẹn: ", error);
      }
    };
    fetchAppointment();
  }, []);



  const handleCancelAppointment = async () => {

  }

  const handelStatusChange = async (id) => {
    try {
        const token = await AsyncStorage.getItem('access-token')
        let form = new FormData()
        form.append('status', 'approved')
        const response = await authApi(token).patch(endpoints['status-change'](id), form, {headers: {'Content-Type': 'multipart/form-data'}});
        if (response.status === 200) {
          Alert.alert("You just approved this the appoinment !")
        } else {
          console.log("Không có cuộc hẹn nào.");
          setAppointment([])
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu cuộc hẹn: ", error);
      }
  };

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')


  return (
    <View style={MyStyles.container}>
      <ScrollView>
        <Text style={[MyStyles.title]}>Pending Requested Appointment</Text>
        {appointment === null ? <ActivityIndicator /> : <>
          {
            appointment.map(a => (
              <View style={styles.appointment} key={a.id}>
                {a.order_number && <Text style={[MyStyles.orderNum]}>0{a.order_number}</Text>}
                <Text style={{fontWeight: 'bold'}}>Patient: {a.patient.first_name} {a.patient.last_name}</Text>
                <Text>Created date: {a.created_date}</Text>
                <Text>Scheduled date: {a.scheduled_date}</Text>
                <Text style={{fontWeight: 'bold'}}>Status: {a.status}</Text>
                <View styles={[MyStyles.row]}>
                  <TouchableOpacity onPress={() => handelStatusChange(a.id)} style={styles.cancelButton}>
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  {a.order_numer &&
                    <TouchableOpacity  style={styles.cancelButton}>
                      <Text style={styles.buttonText}>Cancel Appointment</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            ))
            }
          </>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    appointment: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 10,
    },
    createButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    confirmButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});

export default NurseAppointment;